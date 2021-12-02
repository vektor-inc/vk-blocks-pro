import fs from 'fs';
import { exec, execSync } from 'child_process';

// buildディレクトリをクリーンアップ
execSync('npx rimraf ./build/*');

// コマンドライン引数を受け取る
const args = process.argv[2]
let devText
let freeText
if (args === 'dev') {
    devText = ":dev"
} else if (args === 'free') {
    freeText = ":free"
}

// ./src/blocks/以下のdir名をリスト化
const allDirents = fs.readdirSync('./src/blocks/', { withFileTypes: true })
const dirFreeNames = allDirents.filter(dirent => dirent.isDirectory()).map(({ name }) => name)
// _pro以下のdir名をリスト化 無料版ビルドの場合は空を返す
let dirProNames;
if ( freeText == ':free' ) {
    dirProNames = [];
} else {
    const allProDirents = fs.readdirSync('./src/blocks/_pro', { withFileTypes: true })
    dirProNames = allProDirents.filter(dirent => dirent.isDirectory()).map(({ name }) => name)
}

// dirNamesに整形する。proブロックは1を渡す
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
// 無料ブロックビルドの場合はproブロックを含めない
if (freeText !== ':free') {
    dirProNames.map(dirProName => {
        dirNames.push({ name: dirProName, isPro: 1 });
    })
}

function buildBlocks(dirNames, devText = "") {
    dirNames.map(dirObj => {
        console.log(dirObj.name)
        let proText = ""
        if (dirObj.isPro === 1) {
            proText = 'pro'
        }
        // style.scssがあるかチェック
        let hasStyleFile
        if (dirObj.isPro) {
            hasStyleFile = fs.existsSync('./src/blocks/_pro/' + dirObj.name + '/style.scss')
        } else {
            hasStyleFile = fs.existsSync('./src/blocks/' + dirObj.name + '/style.scss')
        }
        if (hasStyleFile) {
            const block_cmd = 'npm run build:block' + proText + ' --block=' + dirObj.name
            console.log(block_cmd);
            exec(block_cmd);
            // const css_cmd = 'npm run build:css' + proText + devText + ' --block=' + dirObj.name
            // console.log(css_cmd);
            // exec(css_cmd);
        } else {
            const js_cmd = 'npm run build:js' + proText + devText + ' --block=' + dirObj.name
            console.log(js_cmd);
            exec(js_cmd);
        }
    })
}
export default buildBlocks(dirNames, devText);