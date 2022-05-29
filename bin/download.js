const {promisify} = require('util')

module.exports.clone = async function(repo, desc) {
  const download = promisify(require('download-git-repo')) // download-git-repo: Download and extract a git repository (GitHub, GitLab, Bitbucket)
    const ora = require('ora')
    console.log(ora,'wewe')
//   const process = ora(`下载......${repo}`)
//   process.start() // 进度条开始
  await download(repo, desc)
  //  download-git-repo导出的download方法，第一个参数repo是仓库地址，格式有三种：
  // GitHub - github:owner/name or simply owner/name
  // GitLab - gitlab:owner/name
  // Bitbucket - bitbucket:owner/name
//   process.succeed()
}
