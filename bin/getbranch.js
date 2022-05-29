
//引入子线程模块
const  childProcess= require('node:child_process');

//获取远端分子list
function getBranch(name) {

  return new Promise((resolve,reject)=>{

  //创建子进程
  

  const child = childProcess.spawn('git', ['branch','-r'], { cwd: `./${name}`, stdio: 'inherit' });
//子进程结束
child.on('close', code => {
    if (code !== 0) {
       reject(new Error('Download failed'))
    }
    resolve( child.stdin)
    console.log('获取分支结束')   
});
child.on('data', data=>{
   console.log('开始获取分支')
   child.stdin.write(data);
})  

})
}
module.exports = getBranch;