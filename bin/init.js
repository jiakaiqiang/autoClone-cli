// //引入异步方法
// const {promisify} =require('util')
// //引入输出特殊文字的包   异步加载
// const figlet=promisify(require('figlet'))
// //清除控制台
// const clear =require('clear')
// const {clone} =require('./download')
// //修改输出颜色
// const chalk=require('chalk')
// const log=context=>console.log(chalk.green(context))
// module.exports=async name=>{
//     clear()
//     const data=await figlet('auto-router-template')
//     log(data)
//     log(`创建项目:${name}`)
//     await clone('git@github.com:jiakaiqiang/vuepress.git',name)
// }
const {promisify} = require('util') // util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心JavaScript 的功能 过于精简的不足
const figlet = promisify(require('figlet')) //  util.promisify() 这个方法,方便快捷的把原来的异步回调方法改成返回 Promise 实例的方法
const  handleBranch = require('./handleBranch')
const clear = require('clear')
const chalk = require('chalk')
const getBranch = require('./getbranch')
const log = content => console.log(chalk.green(content));
const download = require('./mydownload');
const open = require('open')
const {questions,branchQuestion} =  require('./questions')
const spawns = async (...args) => {
    //引入子进程模块
  const {spawn} = require('child_process')
  return new Promise(resolve => {
      //执行子进程
    const proc = spawn(...args) // 在node.js中执行shell一般用spawn，实现从主进程的输出流连通到子进程的输出流
    proc.stdout.pipe(process.stdout) // 子进程正常流搭到主进程的正常流
    proc.stderr.pipe(process.stderr) // 子进程错误流插到主进程的错误流
    //子进程结束
    proc.on('close', () => {
      resolve()
    })
  })
}

module.exports = async name => {
  // 获取 系统的参数
  const args = process.argv.slice(3)
  // 获取文件夹的名称
  // const folderName = args[0]
  // //获取远端地址
  // const remoteUrl = args[1]
  //分支名称
  // const branchName = args[2] || 'master'
  //文件地址
// const filepath =args[3]||'/'
// //是否是产品
// console.log(filepath)
// const isProd =  args[4] || true
  // 
log(args,'wewewe')

  // 打印欢迎界面
  clear()
  const data = await figlet('JKQ Welcom') // figlet是把文字变成大字
  log(data);

  // clone
  log(`创建项目: ${name}`);
   //开始进行问询
  const {isProd,remoteUrl,filepath} =  await questions()

   


  ///在github中下载项目

//  const aa =  await download(name,remoteUrl)
 
 console.log('项目更新完成')
//获取分支
const branch = await getBranch(name)
console.log(branch)
await handleBranch(branch)

 const branchQuestions = await branchQuestion(branch)
console.log(branchQuestions)
/// 修改项目名称

if(isProd){
  log('子进程的方式安装依赖')
  await spawns(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], { cwd: `./${name}${filepath}` })
  log('外层依赖安装完成')
  await spawns(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run','install:all'], { cwd: `./${name}${filepath}` })
  log(`所有依赖安装完成`)
  log(`开始运行`)
  await spawns(process.platform === 'win32' ?'npm.cmd' : 'npm',['run', 'start:all'],{cwd: `./${name}/${filepath}`})
}else{

  await spawns(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], { cwd: `./${name}${filepath}` })
  log(`所有依赖安装完成`)
  log(`开始运行`)
  await spawns(process.platform === 'win32' ?'npm.cmd' : 'npm',['run', 'dev'],{cwd: `./${name}/${filepath}`})

}


  
  // // 自动打开浏览器
  // open(`http://localhost:8080`)
  // 自动启动项目
 
}