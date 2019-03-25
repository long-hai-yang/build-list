#!/usr/bin/env node
const fs = require('fs');
const file = require(process.cwd()+'/package.json');
const localFile=require('./package.json');
const program = require('commander');
program
    .version(localFile.version)
    .allowUnknownOption()
    .description('循环依次打包（自用）')
    .option('-list, --list [list]', 'build name', '')
    program.parse(process.argv);
if(!program.list || program.list==''){
    console.log('=======================================请先输入要打包的列表=================================================');
    process.exit(1);
}
if(!file.scripts['build:all']){
    console.log('=======================================找不到build:all命令行=================================================');
    process.exit(1);
}
const listArr=program.list.split(",");
let buildParam='';
listArr.forEach((item,i)=>{
    const s=i==0?'npm run build:'+item+'whz':' && npm run build:'+item+'whz';
    console.log(item+'whz');
    buildParam+=s;
})
file.scripts['build:all']=buildParam;
const destString = JSON.stringify(file,null, 2);
fs.writeFile(process.cwd()+'/package.json', destString,function(rs){
    console.log('build:all success!!!');
    process.exit(0);
});

