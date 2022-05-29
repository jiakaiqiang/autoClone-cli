#! /usr/bin/env node
console.log('auto-cli....')

const program = require('commander') //命令行工具
program.version(require('./package.json').version) // 或直接写 '1.0.1'

program
    .command('init <name>') // 定义init命令
    .description('init project')
    .action(require('./bin/init.js'))//action中的参数是一个回调函数 回调参数则是控制台输入的数据


    program.parse(process.argv)
    //刷新路由指令
    program
    .command('refresh') // 定义init命令
    .description('refresh routers')
    .action(require('./bin/refresh'))