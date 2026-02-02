# Pratibimba Documentation

Enterprise-grade documentation for the Pratibimba synthetic credit data platform.

## Quick Start

### Local Development

```bash
npm install
npm start
```

This starts a local development server at `http://localhost:3000`.

### Build

```bash
npm run build
```

This generates static content in the `build` directory.

### Deployment

Deployment is automated via GitHub Actions. Push to `main` branch and the docs will be deployed to GitHub Pages.

**Live Site:** https://pratibimba-ai.github.io/

## Structure

```
.
├── docs/                    # Content files
│   └── fintech/            # Fintech module documentation
├── static/                  # Static assets (logo, favicon)
├── src/                     # Custom components and CSS
├── docusaurus.config.js    # Docusaurus config
├── sidebars.js             # Navigation structure
└── package.json
```

## Custom Domain Setup

When you purchase `pratibimba.ai`, update these files:

1. **docusaurus.config.js:**
   ```js
   url: 'https://docs.pratibimba.ai',
   baseUrl: '/',
   ```

2. **DNS (at your registrar):**
   - Add CNAME record: `docs` → `pratibimba-ai.github.io`

3. **GitHub Pages Settings:**
   - Set custom domain to `docs.pratibimba.ai`
   - Enable HTTPS
