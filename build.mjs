import fs from 'fs';
import { exec, execSync } from 'child_process';

// ./src/blocks/以下のdir名をリスト化（全部リファクタリングが終わったらこっち）
// const allDirents = fs.readdirSync('./src/blocks/', { withFileTypes: true })
// const dirNames = allDirents.filter(dirent => dirent.isDirectory()).map(({ name }) => name)

const dirNames = [
    'alert',
    'balloon',
    'button',
    'border-box',
    'faq',
    'faq2',
    'faq2-a',
    'faq2-q',
    'flow',
    'heading',
    'page-content',
    'pr-blocks',
    'pr-content',
    'spacer',
    'staff',
]

const dirNamesPro = [
    'accordion',
    'child-page',
    'outer'
]

function buildBlocks(dirNames, isPro=false) {
    dirNames.map((block_name) => {
        console.log(block_name);
        if (block_name !== '_pro') {
            let js_cmd
            if (isPro) {
                js_cmd = 'npm run build:jspro --block=' + block_name
            } else {
                js_cmd = 'npm run build:js --block=' + block_name
            }
            console.log(js_cmd);
            execSync(js_cmd);
            // style.scssがあるかチェック
            let hasStyleFile
            if(isPro) {
                hasStyleFile = fs.existsSync('./src/blocks/_pro/' + block_name + '/style.scss')
            } else {
                hasStyleFile = fs.existsSync('./src/blocks/' + block_name + '/style.scss')
            }
            if (hasStyleFile) {
                let sass_cmd
                if (isPro) {
                    sass_cmd = 'npm run build:csspro --block=' + block_name
                } else {
                    sass_cmd = 'npm run build:css --block=' + block_name
                }
                console.log(sass_cmd);
                execSync(sass_cmd);
            }
        }
    })
}
export default buildBlocks(dirNames);
//buildBlocks(dirNamesPro,true);