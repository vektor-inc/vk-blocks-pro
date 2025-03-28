const fs = require('fs');
const path = require('path');

// ブロックディレクトリのパス
const blockDirs = {
	blocks: path.join(__dirname, '../src/blocks'),
	proBlocks: path.join(__dirname, '../src/blocks/_pro'),
};

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
		} else {
			console.warn(`Skipping directory without block.json: ${dirPath}`);
		}
	} catch (error) {
		// JSON パースエラーを無視してログに出力
		console.error(`Error reading block.json in ${dirPath}:`, error.message);
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
	const outputLines = [];

	// src/blocks/ の内容を追加
	const blocks = analyzeBlocks(blockDirs.blocks);
	if (blocks.length > 0) {
		blocks.forEach((block) => {
			outputLines.push(`    - **\`${block.directory}\`**: ${block.description}`);
		});
	}

	// src/blocks/_pro/ の内容を追加（変更なし）
	const proBlocks = analyzeBlocks(blockDirs.proBlocks);
	if (proBlocks.length > 0) {
		outputLines.push('    - **`_pro/`**:');
		proBlocks.forEach((block) => {
			outputLines.push(`      - **\`${block.directory}\`**: ${block.description}`);
		});
	} else {
		outputLines.push('    - **`_pro/`**: No blocks found.');
	}

	// coding-rule.mdc の更新
	const codingRulePath = path.join(__dirname, 'rules/coding-rule.mdc');
	let codingRuleContent = fs.readFileSync(codingRulePath, 'utf8');

	// src/blocks/ 部分を置き換え
	const startMarker = '- **`src/`**: Gutenbergのカスタムブロック用のJSコードを原則ここに格納する\n  - **`blocks/`**:';
	const endMarker = '- **`test`**:';
	const startIndex = codingRuleContent.indexOf(startMarker);
	const endIndex = codingRuleContent.indexOf(endMarker);

	if (startIndex !== -1 && endIndex !== -1) {
		const before = codingRuleContent.slice(0, startIndex + startMarker.length);
		const after = codingRuleContent.slice(endIndex);

		const newContent = outputLines.join('\n');

		codingRuleContent = `${before}\n${newContent}\n${after}`;
		fs.writeFileSync(codingRulePath, codingRuleContent, 'utf8');
		console.log('coding-rule.mdc has been updated.');
	} else {
		console.error('Markers for updating coding-rule.mdc not found.');
		console.error(
			`Ensure the file contains the following markers:\nStart: "${startMarker}"\nEnd: "${endMarker}"`
		);
	}
}

// 実行
generateDocs();
