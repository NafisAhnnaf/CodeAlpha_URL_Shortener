import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import encoder from "base62-ts";
dotenv.config();
import pool from "./config/db.ts";
const PORT = process.env.PORT || 8000;
const BASE62_OFFSET = 56800236;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", express.static(path.join(import.meta.dirname, "public")));

app.post("/shorten", async (req: Request, res: Response) => {
  // console.log(req.body);
  const { url, expires_at } = req.body;
  try {
    if (
      typeof url != "string" ||
      expires_at == null ||
      expires_at > 400 ||
      expires_at < 1
    ) {
      return res.status(400).json({ message: "Invalid Request" });
    }
    const db_res = await pool.query("SELECT * FROM insert_url($1, $2)", [
      url,
      expires_at,
    ]);
    // console.log(db_res);
    if (db_res.rows[0] && db_res.rows[0].id) {
      const id = db_res.rows[0].id;
      const code = encoder.encode(id + BASE62_OFFSET);
      return res.status(201).json({
        message: "Successfully created unique url",
        payload: { code },
      });
    }
    res.status(500).json({ message: "Failed to generate URL reference" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

app.get("/sh/:code", async (req: Request, res: Response) => {
  const { code } = req.params;
  // console.log(code);
  try {
    if (code != null && typeof code == "string") {
      const sum = encoder.decode(code);
      const id = sum - BASE62_OFFSET;
      const db_res = await pool.query("SELECT url FROM urls WHERE id = $1", [
        id,
      ]);
      const url_row = db_res.rows[0];
      if (url_row && url_row.url) {
        const found = url_row.url;
        // return res
        //   .status(200)
        //   .json({ message: "Found URL", payload: { url: found } });
        return res.status(304).redirect(found);
      }
    }
    res.status(404).json({ message: "Could not find a url" });
  } catch (error) {
    res.status(500).json({ message: "A valid URL does not exist" });
  }
});

app.listen(PORT, () => {
  console.log(`CodeAlphaBackend process running at http://localhost:${PORT}`);
});
