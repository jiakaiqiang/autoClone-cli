function  handleBranch(branch){
    let branchList=[]
   new Promise((resolve,reject)=>{
       
            //处理分支
    branch.forEach(item=>{
        let name = item.split('/')[1]
        if(name){
            let obj = {
                name:name,
                value:item
            }
            branchList.push(obj)
        }
    })
    })
    console.log(branchList)
}