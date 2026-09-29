# Simple URL Shortener
### Strategy:
- Saves lengthy urls into a PostgreSQL database and generates unique serial for each url.
- Converts PostgreSQL Serial ID into a Base62 code.
- The Base62 code then acts as the parameter for the short url.

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
