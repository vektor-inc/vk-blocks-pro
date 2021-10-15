import fs from 'fs';
import { exec, execSync } from 'child_process';

// ./src/blocks/以下のdir名をリスト化（全部リファクタリングが終わったらこっち）
// const allDirents = fs.readdirSync('./src/blocks/', { withFileTypes: true })
// const dirNames = allDirents.filter(dirent => dirent.isDirectory()).map(({ name }) => name)

// リファクタリングが終わるまでは手書きでリストにしていく proブロックは1を渡す
const dirNames = [
    { name: 'alert', isPro: 0 },
    { name: 'balloon', isPro: 0 },
    { name: 'button', isPro: 0 },
    { name: 'border-box', isPro: 0 },
    { name: 'faq', isPro: 0 },
    { name: 'faq2', isPro: 0 },
    { name: 'faq2-a', isPro: 0 },
    { name: 'faq2-q', isPro: 0 },
    { name: 'flow', isPro: 0 },
    { name: 'heading', isPro: 0 },
    { name: 'page-content', isPro: 0 },
    { name: 'pr-blocks', isPro: 0 },
    { name: 'pr-content', isPro: 0 },
    { name: 'spacer', isPro: 0 },
    { name: 'staff', isPro: 0 },
    { name: 'accordion', isPro: 1 },
	{ name: 'animation', isPro: 1 },
    { name: 'child-page', isPro: 1 },
    { name: 'grid-column', isPro: 1 },
    { name: 'grid-column-item', isPro: 1 },
    { name: 'outer', isPro: 1 },
    { name: 'post-list', isPro: 1 },
    { name: "select-post-list", isPro: 1 },
    { name: "select-post-list-item", isPro: 1 },
    { name: 'step', isPro: 1 },
    { name: 'step-item', isPro: 1 },
    { name: 'table-of-contents-new', isPro: 1 },
]

// mode が dev かどうか受け取る
const isDev = process.argv[2]
let devText
if (isDev) {
    devText = ":dev"
}

function buildBlocks(dirNames, devText = "") {
    dirNames.map(dirObj => {
        console.log(dirObj.name)
        let proText = ""
        if(dirObj.isPro === 1) {
            proText = 'pro'
        }
        if (dirObj.name !== '_pro') {
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
export default buildBlocks(dirNames,devText);