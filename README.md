# Journalism Jobs

A focused job feed aggregating journalism roles from multiple sources, with extra attention on Washington DC, Maryland, Virginia, and New York. Built by [Lucio Villa](https://www.luciovilla.com/).

**Live site:** [jobs.luciovilla.com](https://jobs.luciovilla.com/)

## Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [n8n](https://n8n.io/) for automated job fetching (self-hosted)

## How it works

Jobs are fetched from various company job boards once a day via an n8n workflow. The workflow stores results and exposes them through a webhook. This Next.js app proxies that webhook server-side so credentials are never exposed to the browser.

## Local setup

**Requirements:** [nvm](https://github.com/nvm-sh/nvm)

```bash
git clone https://github.com/luciovilla/journo-jobs.git
cd journo-jobs
nvm install && nvm use
pnpm install
cp .env.example .env.local
```

Edit `.env.local` with your values:

| Variable                | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `N8N_JOBS_ENDPOINT`     | Private n8n webhook URL                          |
| `N8N_AUTH_HEADER_NAME`  | Header name configured in n8n (e.g. `x-api-key`) |
| `N8N_AUTH_HEADER_VALUE` | Secret header value configured in n8n            |

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev    # start dev server
pnpm build  # production build
pnpm lint   # lint
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
