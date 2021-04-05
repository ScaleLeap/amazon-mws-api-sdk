module.exports = {
  extends: '@scaleleap/utils/semantic-release',
  plugins: [
    [
      '@semantic-release/exec',
      {
        successCmd: 'node_modules/.bin/ts-node -T utils/rename-package.ts && npm publish',
      },
    ],
  ],
}
