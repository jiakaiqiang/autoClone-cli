let inquirer =  require('inquirer')
const log = content => console.log(chalk.pink(content));
function questions(){
    return new Promise((resolve,reject)=>{
        inquirer.prompt([{
            name:"remoteUrl",
            type: "input",
           message: '请输入git地址',
          }
          
          ,{
            name:"filepath",
            type: "input",
             message: '请输入依赖相对路径',
          },{
            name:"isProd",
           message:"是否是产品?",
           type:"confirm",
           choices:['yes','no']
            
          }
         ]).then(res=>{
         resolve(res)
         }).catch(err=>{
             reject(err)
         })
    })
}
function branchQuestion(choices){
    return new Promise((resolve,reject)=>{
        inquirer.prompt([{
            name:"branchName",
            type: "list",
             message: '请输入分支名称',
             choices:choices
          }
          
         ]).then(res=>{
         resolve(res)
         }).catch(err=>{
             reject(err)
         })
   
    })
}
module.exports={
    questions,
    branchQuestion
}