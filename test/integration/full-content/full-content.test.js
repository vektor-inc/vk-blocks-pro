/**
 * External dependencies
 */
import { format } from 'util';

/**
 * WordPress dependencies
 */
import {
	getBlockTypes,
	getCategories,
	setCategories,
	parse,
	serialize,
} from '@wordpress/blocks';
import { parse as grammarParse } from '@wordpress/block-serialization-default-parser';

//eslint-disable-next-line no-restricted-syntax
import {
	blockNameToFixtureBasename,
	getAvailableBlockFixturesBasenames,
	getBlockFixtureHTML,
	getBlockFixtureJSON,
	getBlockFixtureParsedJSON,
	getBlockFixtureSerializedHTML,
	writeBlockFixtureParsedJSON,
	writeBlockFixtureJSON,
	writeBlockFixtureSerializedHTML,
	/**
	 * NOTE: node moudle内から、utils.jsをコピーしてパスを書き換え。
	 * 元は、'@wordpress/e2e-tests/fixtures' を参照。
	 */
} from '../../e2e-tests/fixtures/utils';

const blockBasenames = getAvailableBlockFixturesBasenames();
// 段落ブロックが必要なので読み込み
import '@wordpress/block-library/build-module/paragraph/init';

// VK Blocks を読み込み
import { registerVKBlocks } from '@vkblocks/blocks/bundle'

/**
 * Returns only the properties of the block that
 * we care about comparing with the fixture data.
 *
 * @param {WPBlock[]} blocks loaded blocks to normalize.
 */
const normalizeParsedBlocks = ( blocks ) =>
	blocks.map( ( block ) => ( {
		name: block.name,
		isValid: block.isValid,
		attributes: JSON.parse( JSON.stringify( block.attributes ) ),
		innerBlocks: normalizeParsedBlocks( block.innerBlocks ),
	} ) );

describe('full post content fixture', () => {

	beforeAll(async () => {

		// VK Blocksが出力している wpVersion を定義
		Object.defineProperty(window, 'wpVersion', {
			value: '5.6',
			writable: false,
		});

		// Load all hooks that modify blocks
		require('./../../../src/blocks/slider');

		// ブロックカテゴリー取得
		const blockCategories = getCategories();

		// カスタムカテゴリー追加
		setCategories([
			...blockCategories,
			{ slug: 'vk-blocks-cat', title: 'VKBlocks' },
			{ slug: 'vk-blocks-cat-layout', title: 'VKBlocks Layout' },
		])

		//カスタムブロック登録
		registerVKBlocks();

	});

	blockBasenames.forEach((basename) => {

		it(basename, () => {

			// フィクスチャーの元データを取得
			const {
				filename: htmlFixtureFileName,
				file: htmlFixtureContent,
			} = getBlockFixtureHTML(basename);
			if (htmlFixtureContent === null) {
				throw new Error(
					`Missing fixture file: ${htmlFixtureFileName}`
				);
			}

			//JSON化したブロックを取得
			const {
				filename: parsedJSONFixtureFileName,
				file: parsedJSONFixtureContent,
			} = getBlockFixtureParsedJSON(basename);

			// パースしたブロックを取得
			const parserOutputActual = grammarParse(htmlFixtureContent);

			let parserOutputExpectedString;
			//JSON化したブロックがある場合、結果として返す
			if (parsedJSONFixtureContent) {
				parserOutputExpectedString = parsedJSONFixtureContent;

				// 環境変数を渡すと、フィクスチャー生成
			} else if (process.env.GENERATE_MISSING_FIXTURES) {

				parserOutputExpectedString =
					JSON.stringify(parserOutputActual, null, 4) + '\n';
				//.parsed.json 生成
				writeBlockFixtureParsedJSON(
					basename,
					parserOutputExpectedString
				);
			} else {
				throw new Error(
					`Missing fixture file: ${parsedJSONFixtureFileName}`
				);
			}

			const parserOutputExpected = JSON.parse(
				parserOutputExpectedString
			);
			try {
				expect(parserOutputActual).toEqual(parserOutputExpected);
			} catch (err) {
				throw new Error(
					format(
						"File '%s' does not match expected value:\n\n%s",
						parsedJSONFixtureFileName,
						err.message
					)
				);
			}

			const blocksActual = parse(htmlFixtureContent);

			// Block validation may log errors during deprecation migration,
			// unless explicitly handled from a valid block via isEligible.
			// Match on basename for deprecated blocks fixtures to allow.
			const isDeprecated = /__deprecated([-_]|$)/.test(basename);
			if (isDeprecated) {
				/* eslint-disable no-console */
				console.warn.mockReset();
				console.error.mockReset();
				console.info.mockReset();
				/* eslint-enable no-console */
			}

			const blocksActualNormalized = normalizeParsedBlocks(
				blocksActual
			);
			const {
				filename: jsonFixtureFileName,
				file: jsonFixtureContent,
			} = getBlockFixtureJSON(basename);

			let blocksExpectedString;

			if (jsonFixtureContent) {
				blocksExpectedString = jsonFixtureContent;

				// 環境変数を渡すと、フィクスチャー生成
			} else if (process.env.GENERATE_MISSING_FIXTURES) {

				blocksExpectedString =
					JSON.stringify(blocksActualNormalized, null, 4) + '\n';

				//.json 生成
				writeBlockFixtureJSON(basename, blocksExpectedString);

			} else {
				throw new Error(
					`Missing fixture file: ${jsonFixtureFileName}`
				);
			}

			const blocksExpected = JSON.parse(blocksExpectedString);
			try {
				expect(blocksActualNormalized).toEqual(blocksExpected);
			} catch (err) {
				throw new Error(
					format(
						"File '%s' does not match expected value:\n\n%s",
						jsonFixtureFileName,
						err.message
					)
				);
			}

			// `serialize` doesn't have a trailing newline, but the fixture
			// files should.
			const serializedActual = serialize(blocksActual) + '\n';
			const {
				filename: serializedHTMLFileName,
				file: serializedHTMLFixtureContent,
			} = getBlockFixtureSerializedHTML(basename);

			let serializedExpected;
			if (serializedHTMLFixtureContent) {
				serializedExpected = serializedHTMLFixtureContent;
			} else if (process.env.GENERATE_MISSING_FIXTURES) {
				serializedExpected = serializedActual;
				writeBlockFixtureSerializedHTML(basename, serializedExpected);
			} else {
				throw new Error(
					`Missing fixture file: ${serializedHTMLFileName}`
				);
			}

			try {
				expect(serializedActual).toEqual(serializedExpected);
			} catch (err) {
				throw new Error(
					format(
						"File '%s' does not match expected value:\n\n%s",
						serializedHTMLFileName,
						err.message
					)
				);
			}
		});
	});

	/**
	 * テスト実行
	 *
	*/
	it('should be present for each block', () => {
		const errors = [];

		getBlockTypes()
			.map((block) => block.name)

			// We don't want tests for each oembed provider, which all have the same
			// `save` functions and attributes.
			// The `core/template` is not worth testing here because it's never saved, it's covered better in e2e tests.
			.filter(
				(name) => !['core/paragraph', 'core/embed', 'core/template', 'vk-blocks/breadcrumb', 'vk-blocks/ancestor-page-list', 'vk-blocks/page-content', 'vk-blocks/post-list', 'vk-blocks/select-post-list-item', 'vk-blocks/child-page', 'vk-blocks/dynamic-text', 'vk-blocks/taxonomy', 'vk-blocks/archive-list', 'vk-blocks/card-item', 'vk-blocks/grid-column-item', 'vk-blocks/gridcolcard-item', 'vk-blocks/gridcolcard-item-body', 'vk-blocks/gridcolcard-item-footer', 'vk-blocks/gridcolcard-item-header', 'vk-blocks/step-item', 'vk-blocks/timeline-item', 'vk-blocks/grid-column-item', 'vk-blocks/icon-card-item', 'vk-blocks/faq2-a', 'vk-blocks/faq2-q', 'vk-blocks/slider-item', 'vk-blocks/tab-item', 'vk-blocks/accordion-trigger', 'vk-blocks/accordion-target','vk-blocks/blog-card-title','vk-blocks/blog-card-featured-image','vk-blocks/blog-card-excerpt','vk-blocks/blog-card-site-logo','vk-blocks/blog-card-site-title', 'vk-blocks/post-category-badge'].includes(name)
			)
			.forEach((name) => {
				const nameToFilename = blockNameToFixtureBasename(name);
				const foundFixtures = blockBasenames
					.filter(
						(basename) =>
							basename === nameToFilename ||
							basename.startsWith( nameToFilename + '__' )
					)
					.map((basename) => {
						const {
							filename: htmlFixtureFileName,
						} = getBlockFixtureHTML(basename);
						const {
							file: jsonFixtureContent,
						} = getBlockFixtureJSON(basename);
						// The parser output for this test.  For missing files,
						// JSON.parse( null ) === null.
						const parserOutput = JSON.parse(jsonFixtureContent);
						// The name of the first block that this fixture file
						// contains (if any).
						const firstBlock =
								parserOutput?.[ '0' ]?.name ?? null;
						return {
							filename: htmlFixtureFileName,
							parserOutput,
							firstBlock,
						};
					})
					.filter((fixture) => fixture.parserOutput !== null);

				if (!foundFixtures.length) {
					errors.push(
						format(
							"Expected a fixture file called '%s.html' or '%s__*.html'.",
							nameToFilename,
							nameToFilename
						)
					);
				}

				foundFixtures.forEach((fixture) => {
					if (name !== fixture.firstBlock) {
						errors.push(
							format(
								"Expected fixture file '%s' to test the '%s' block.",
								fixture.filename,
								name
							)
						);
					}
				});
			});

		if (errors.length) {
			throw new Error(
				'Problem(s) with fixture files:\n\n' + errors.join('\n')
			);
		}
	});
});
