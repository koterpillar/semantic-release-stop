# Semantic Release Stop

[Semantic Release](semantic-release.gitbook.io/) expects everything about the
release to happen inside a single process run. If you need to do some things on
one machine first (e.g. build for a different architecture) and then do the
release on another, you have to run `semantic-release` twice.

However, there is currently no option to _not_ push a Git tag as part of
`semantic-release`, and if the tag is pushed the second (actual release) run
will not find any changes, skipping the release.

This plugin stops the release process before the tag is pushed. To use it:

```javascript
// Is this the preparation run (build)?
const isBuild = process.env.GITHUB_JOB === "build";

export default {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    ...(isBuild
      ? [
          // Build
          [
            "@semantic-release/exec",
            {
              /* ... */
            },
          ],
          // Stop here!
          "semantic-release-stop",
        ]
      : [
          // Actual release
          "@semantic-release/release-notes-generator",
          "@semantic-release/npm", // e.g.
        ]),
  ],
};
```
