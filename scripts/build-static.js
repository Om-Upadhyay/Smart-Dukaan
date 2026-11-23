const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const output=path.join(root,'dist');
const files=['index.html','styles.css','calc-core.js','app.js','sw.js','manifest.webmanifest','icon.svg'];
fs.rmSync(output,{recursive:true,force:true});
fs.mkdirSync(output,{recursive:true});
for(const file of files){const source=path.join(root,file);if(!fs.existsSync(source)||!fs.statSync(source).isFile())throw new Error(`Missing static app file: ${file}`);fs.copyFileSync(source,path.join(output,file));}
console.log(`Prepared ${files.length} static app files in dist/.`);
