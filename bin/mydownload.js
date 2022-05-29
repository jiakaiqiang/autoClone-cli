
//引入子线程模块
const  childProcess= require('node:child_process');

//定义下载函数
function download(name,url,branch) {
    console.log(url)
  return new Promise((resolve,reject)=>{

  //创建子进程
  const child = childProcess.spawn('git', ['clone',url,name], {
    stdio: 'inherit'
});
//子进程结束
child.on('close', code => {
    if (code !== 0) {
       reject(new Error('Download failed'))
    }
    resolve( child.stdin)
    console.log('下载完成')   
});
child.on('data', data=>{
   console.log('开始下载')
   child.stdin.write(data);
})  

})
}
module.exports = download;