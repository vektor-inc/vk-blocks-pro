import fs from 'fs';
import { execSync } from 'child_process';

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
                js_cmd = 'npm run js:blockpro --block=' + block_name
            } else {
                js_cmd = 'npm run js:block --block=' + block_name
            }
            execSync(js_cmd);
            // style.scssがあるかチェック
            const hasStyleFile = fs.existsSync(block_name + '/style.scss')
            if (hasStyleFile) {
                let sass_cmd
                if (isPro) {
                    sass_cmd = 'npm run sass:block --block=' + block_name
                } else {
                    sass_cmd = 'npm run sass:blockpro --block=' + block_name
                }
                execSync(sass_cmd);
            }
        }
    })
}
buildBlocks(dirNames);
buildBlocks(dirNamesPro,true);