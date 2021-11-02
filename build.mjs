import fs from 'fs';
import { exec, execSync } from 'child_process';

// ./src/blocks/以下のdir名をリスト化
const allDirents = fs.readdirSync('./src/blocks/', { withFileTypes: true })
const dirFreeNames = allDirents.filter(dirent => dirent.isDirectory()).map(({ name }) => name)
// _pro以下のdir名をリスト化
const allProDirents = fs.readdirSync('./src/blocks/_pro', { withFileTypes: true })
const dirProNames = allProDirents.filter(dirent => dirent.isDirectory()).map(({ name }) => name)

// dirNamesにリスト化する。proブロックは1を渡す
// const dirNames = [
//     { name: 'alert', isPro: 0 },
//     { name: 'accordion', isPro: 1 },
// ]
const dirNames = [];
dirFreeNames.map(dirFreeName => {
    if (dirFreeName !== '_pro') {
        dirNames.push({ name: dirFreeName, isPro: 0 });
    }
})
dirProNames.map(dirProName => {
    dirNames.push({ name: dirProName, isPro: 1 });
})

// コマンドライン引数を受け取る
const args = process.argv[2]
let devText
let freeText
if (args === 'dev') {
    devText = ":dev"
} else if (args === 'free') {
    freeText = ":free"
}

function buildBlocks(dirNames, devText = "", freeText = "") {
    dirNames.map(dirObj => {
        console.log(dirObj.name)
        let proText = ""
        if(dirObj.isPro === 1) {
            proText = 'pro'
        }
        // 無料版ブロックを全てビルド
        if (proText !== 'pro' && freeText === ':free') {
            const js_cmd = 'npm run build:js --block=' + dirObj.name
            console.log(js_cmd);
            execSync(js_cmd);
            // style.scssがあるかチェック
            let hasStyleFile
            hasStyleFile = fs.existsSync('./src/blocks/' + dirObj.name + '/style.scss')
            if (hasStyleFile) {
                const sass_cmd = 'npm run build:css' + proText + ' --block=' + dirObj.name
                console.log(sass_cmd);
                execSync(sass_cmd);
            }
        // 全てのブロックビルド
        } else if (freeText !== ':free') {
            const js_cmd = 'npm run build:js' + proText + devText + ' --block=' + dirObj.name
            console.log(js_cmd);
            execSync(js_cmd);
            // style.scssがあるかチェック
            let hasStyleFile
            if (dirObj.isPro) {
                hasStyleFile = fs.existsSync('./src/blocks/_pro/' + dirObj.name + '/style.scss')
            } else {
                hasStyleFile = fs.existsSync('./src/blocks/' + dirObj.name + '/style.scss')
            }
            if (hasStyleFile) {
                const sass_cmd = 'npm run build:css' + proText + ' --block=' + dirObj.name
                console.log(sass_cmd);
                execSync(sass_cmd);
            }
        }
    })
}
export default buildBlocks(dirNames,devText,freeText);