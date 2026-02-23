# INTCONVERGE COMMUNICATION Website

Production-ready ISP website built with Next.js 14, Tailwind CSS, Prisma, SQLite, and Nodemailer. Includes public pages, lead capture forms, and an admin console for managing plans, coverage areas, and advisories.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- SQLite + Prisma (switchable to Postgres)
- Nodemailer (SMTP notifications)

## Setup
```bash
npm install
```

### Environment
Copy `.env.example` to `.env` and update values:
```bash
cp .env.example .env
```

Required values:
- `DATABASE_URL` (default: file:./dev.db)
- `AUTH_SECRET` (long random string)
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`
- SMTP settings for lead notifications

### Database & Seed
```bash
npx prisma migrate dev --name init
npm run seed
```

### Run
```bash
npm run dev
```

## Admin Console
- Login: `/admin/login`
- Manage leads, plans, coverage, and announcements.
- Update business info in `src/config/site.ts` (read-only in admin settings page).

## Updating Content
- **Plans**: Admin > Plans
- **Coverage Areas**: Admin > Coverage
- **Advisories/Promos**: Admin > Announcements

## Deployment
### VPS (SQLite)
- Keep `DATABASE_PROVIDER=sqlite` and `DATABASE_URL=file:./dev.db`.
- Persist the database file and `data/uploads` directory.

### Cloud (Postgres)
- Update `provider` in `prisma/schema.prisma` to `postgresql`.
- Set `DATABASE_URL` to your Postgres connection string.
- Run `npx prisma migrate deploy` on release.

### Offline builds (optional)
If the build environment cannot access Google Fonts, run:
```bash
NEXT_DISABLE_FONT_DOWNLOAD=1 npm run build
```

## Backups
- Back up the SQLite database file (`dev.db`) or Postgres snapshots.
- Back up `/data/uploads` for stored proof-of-address images.

## Notes
- Forms include honeypot and basic rate limiting.
- Uploaded images are stored in `/data/uploads` and referenced in the database.

