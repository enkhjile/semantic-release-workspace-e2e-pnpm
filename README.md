# pnpm workspace acceptance fixture

The alpha.10 acceptance cycle completed six bounded prerelease uploads using the registry-published semantic-release-workspace@1.0.0-alpha.10. The alpha branch now runs native checks only, with contents-read permission and no OIDC grant or publication step. The retained live-release.yml filename and publisher configuration support future explicitly authorized tests.

The scenarios covered independent core releases, a manual app dependency upgrade, independent app changes retaining that pin, one root changelog with preserved history, aggregate GitHub prereleases, and a deliberate postpublish failure followed by a fresh-checkout retry with zero duplicate uploads.

Released core versions are 1.4.0-alpha.1 through 1.4.0-alpha.3; app versions are 1.1.0-alpha.1 through 1.1.0-alpha.3. App explicitly depends on core 1.4.0-alpha.2. Source versions remain restored; release manifests and changelog history are retained in package tags and prepared refs. Do not delete release journals, retained artifacts, or package tags.
