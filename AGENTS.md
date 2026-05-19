# Project Notes for Agents

## GitHub Repositories

There are two relevant GitHub repositories for this project:

1. Source v3 working repo:
   `melkizac/sb1-9neb9hqh`
   - Branch: `v3-monochrome-site`
   - Used for active v3 source work.

2. Netlify-connected live repo:
   `nexiuslabs/nexiuslabs-website1`
   - Branch: `main`
   - Netlify production is connected to this repo.
   - To make other agents see the latest live Git-backed state, sync the built `/v3` static output into `public/v3` here and push `main`.

## GitHub Account Switching

This machine has multiple GitHub accounts:

- `nexiuslabs`
- `melkizac`
- `nexiusdev`

If pushing to `melkizac/sb1-9neb9hqh` fails with permission denied, check the active GitHub account:

```bash
gh auth status
```

Switch to `melkizac` before pushing the v3 source repo:

```bash
gh auth switch --hostname github.com --user melkizac
git push origin v3-monochrome-site
```

For the Netlify-connected repo `nexiuslabs/nexiuslabs-website1`, use an account that has access to the `nexiuslabs` GitHub organization.

## Deploy Sync Workflow

After source changes in `melkizac/sb1-9neb9hqh`:

1. Build v3:

   ```bash
   npx vite build --base=/v3/ --outDir dist-v3
   ```

2. Sync `dist-v3` into the Netlify-connected repo:

   ```txt
   nexiuslabs/nexiuslabs-website1/public/v3
   ```

3. Commit to `nexiuslabs/nexiuslabs-website1/main`:

   ```bash
   git commit -m "Sync v3 site from <source-commit>"
   git push origin main
   ```

4. Netlify will deploy from Git and expose a real `commit_ref`.

## Important Context

Manual Netlify CLI deploys do not populate `commit_ref`. If another agent reports an old commit such as `9b5d079`, it is likely reading the last Git-triggered Netlify deploy instead of the current manual deploy or the v3 source branch.
