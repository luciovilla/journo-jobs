# Contributing

Thanks for helping out. Here's what you need to know.

## Ways to contribute

- **Add a job board** — suggest a new source to track
- **Bug fixes** — something broken or displaying wrong
- **UI improvements** — layout, accessibility, performance
- **Data normalization** — better location/company name parsing in `app/lib/jobs.ts`

## Getting started

1. Fork the repo and clone it locally
2. Run `nvm install && nvm use` to switch to the correct Node version
3. Follow the [local setup](README.md#local-setup) steps — env vars are optional; mock job data loads automatically when they're not set
4. Create a branch: `git checkout -b your-feature`
5. Make your changes
6. Run `pnpm lint` and `pnpm build` to verify nothing is broken
7. Open a pull request

## Adding a job board

To suggest a new company/job board to track:

1. Open an issue with the company name and a link to their job board
2. If you want to add it yourself, add an entry to the `JOB_BOARDS` list in `app/job-boards/page.tsx`

New data sources require changes to the n8n workflow (not open-source), so open an issue and Lucio can wire it up on the backend.

## Questions

Open an issue or reach out at [me@luciovilla.com](mailto:me@luciovilla.com).
