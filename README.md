# pnpm workspace acceptance fixture

Completed the real alpha → main → alpha cycle with registry-published semantic-release-workspace@1.0.0-alpha.10, actual promotion/backmerge merge commits, and bounded OIDC publication. Both permanent branches now run native checks only, with contents-read permission and no OIDC grant or publication step. The retained live-release.yml filename and publisher configuration support future explicitly authorized tests.

The cycle added exactly five versions: app 2.0.0-alpha.1; stable core 1.4.0 and app 2.0.0; core 1.5.0-alpha.1 and 1.5.0-alpha.2. Six earlier independent-release acceptance versions remain preserved. App explicitly depends on core 1.4.0-alpha.2. Alpha contains the new formatting feature/fix; main retains the tested stable source.

Stable changelogs intentionally omit prerelease sections. The subsequent alpha changelog builds on stable history, while earlier prerelease history remains in its package tags, prepared refs, notes, and artifacts. Source manifests remain restored. Preserve all published packages, release journals, retained artifacts, and tags.
