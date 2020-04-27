const npmInstall = 'post-npm-install'

module.exports = {
  hooks: {
    'post-merge': npmInstall,
    'post-rebase': npmInstall
  }
}
