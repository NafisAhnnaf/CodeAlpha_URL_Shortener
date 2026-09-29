# Simple URL Shortener
### Strategy:
- Saves lengthy urls into a PostgreSQL database and generates unique serial for each url.
- Converts PostgreSQL Serial ID into a shrt (5-7 character) Base62 code.
- The Base62 code then acts as the parameter for the short url.

### Example: 
- A Lengthy URL: `https://www.st.com/content/st_com/en/st-edge-ai-suite/edge-ai-explained/top-5-edge-ai-benefits.html?ecmp=tt49464_gl_enews_may2026&mkt_tok=ODU2LVBWUC03MTUAAAGkhcq2IdRRIjD2FL4Q9UBUqKLSccKccVoszFF1xPvaadUPq4l_iWMVuZF3TuOmbQtNsrHg26R1hg8subnf-6ApkgOp9AOLTfh_eLIe3NxAhN3XcpRuHGE`
- Output: `http://localhost:8000/sh/3Qkmf`

### Installation and Startup
To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

This project was created using `bun init` in bun v1.4.2. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
