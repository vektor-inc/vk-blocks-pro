const fs = require('fs');
const path = require('path');

// ブロックディレクトリのパス
const blockDirs = [
	path.join(__dirname, 'src/blocks'),
	path.join(__dirname, 'src/blocks/_pro'),
];

// block.jsonからブロック情報を取得する関数
function getBlockInfo(dirPath) {
	try {
		const blockJsonPath = path.join(dirPath, 'block.json');
		if (fs.existsSync(blockJsonPath)) {
			const blockJson = JSON.parse(
				fs.readFileSync(blockJsonPath, 'utf8')
			);
			return {
				name: blockJson.name,
				title: blockJson.title,
				description: blockJson.description,
			};
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(`Error reading block.json in ${dirPath}:`, error);
	}
	return null;
}

// ディレクトリ内のブロックを解析する関数
function analyzeBlocks(baseDir) {
	const blocks = [];

	if (!fs.existsSync(baseDir)) {
		return blocks;
	}

	const entries = fs.readdirSync(baseDir, { withFileTypes: true });

	for (const entry of entries) {
		if (entry.isDirectory() && !entry.name.startsWith('.')) {
			const fullPath = path.join(baseDir, entry.name);
			const blockInfo = getBlockInfo(fullPath);
			if (blockInfo) {
				blocks.push({
					directory: entry.name,
					...blockInfo,
				});
			}
		}
	}

	return blocks;
}

// メイン処理
function generateDocs() {
	// eslint-disable-next-line no-console
	console.log('# VK Blocks Directory Documentation\n');

	blockDirs.forEach((dir) => {
		const relativePath = path.relative(__dirname, dir);
		const isProDir = relativePath.includes('_pro');

		if (isProDir) {
			// eslint-disable-next-line no-console
			console.log('- **`_pro`**:');
			const blocks = analyzeBlocks(dir);

			if (blocks.length === 0) {
				// eslint-disable-next-line no-console
				console.log('  No blocks found in this directory.\n');
				return;
			}

			blocks.forEach((block) => {
				// eslint-disable-next-line no-console
				console.log(`  - **\`${block.directory}\`**: ${block.description}`);
			});
		} else {
			// eslint-disable-next-line no-console
			console.log(`## ${relativePath}\n`);
			const blocks = analyzeBlocks(dir);

			if (blocks.length === 0) {
				// eslint-disable-next-line no-console
				console.log('No blocks found in this directory.\n');
				return;
			}

			blocks.forEach((block) => {
				// eslint-disable-next-line no-console
				console.log(`- **\`${block.directory}/\`**: ${block.description}`);
			});
			// eslint-disable-next-line no-console
			console.log('');
		}
	});
}

// 実行
generateDocs();
