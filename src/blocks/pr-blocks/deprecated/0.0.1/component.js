import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

export class ComponentBlock extends Component {
	render() {
		const setAttributes = this.props.setAttributes;
		const {
			heading1,
			heading2,
			heading3,
			content1,
			content2,
			content3,
			url1,
			url2,
			url3,
			urlOpenType1,
			urlOpenType2,
			urlOpenType3,
			icon1,
			icon2,
			icon3,
			color1,
			color2,
			color3,
			bgType1,
			bgType2,
			bgType3,
			insertImage1,
			insertImage2,
			insertImage3,
		} = this.props.attributes;
		const for_ = this.props.for_;
		const blockNum = this.props.blockNum;
		const blockNumArrIndex = this.props.blockNum - 1;

		const heading = [heading1, heading2, heading3];
		const content = [content1, content2, content3];
		const url = [url1, url2, url3];
		const urlOpenType = [urlOpenType1, urlOpenType2, urlOpenType3];
		const icon = [icon1, icon2, icon3];
		const color = [color1, color2, color3];
		const bgType = [bgType1, bgType2, bgType3];
		const insertImage = [insertImage1, insertImage2, insertImage3];

		let richTextH1Save = '';
		let richTextPSave = '';

		const drawElement = (() => {
			if (insertImage[blockNumArrIndex]) {
				return (
					<div
						className="vk_prBlocks_item_image"
						style={{
							backgroundImage: `url(${insertImage[blockNumArrIndex]})`,
							backgroundRepeat: 'no-repeat 50% center',
							backgroundSize: 'cover',
						}}
					>
						<img src={insertImage[blockNumArrIndex]} alt="" />
					</div>
				);
			}

			if (!color[blockNumArrIndex]) {
				color[blockNumArrIndex] = '#0693e3';
			}
			if (bgType[blockNumArrIndex] === '0') {
				return (
					<div
						className="vk_prBlocks_item_icon_outer"
						style={{
							backgroundColor: color[blockNumArrIndex],
							border: `1px solid ${color[blockNumArrIndex]}`,
						}}
					>
						<i
							className={`${icon[blockNumArrIndex]} vk_prBlocks_item_icon`}
							style={{ color: '#fff' }}
						></i>
					</div>
				);
			}
			return (
				<div
					className="vk_prBlocks_item_icon_outer"
					style={{
						backgroundColor: 'transparent',
						border: '1px solid ' + color[blockNumArrIndex],
					}}
				>
					<i
						className={`${icon[blockNumArrIndex]} vk_prBlocks_item_icon`}
						style={{ color: color[blockNumArrIndex] }}
					></i>
				</div>
			);
		})();

		//編集画面とフロント側の切り替え
		if (for_ === 'edit') {
			if (blockNum === 1) {
				richTextH1Save = (
					<RichText
						className="vk_prBlocks_item_title vk_prBlocks_item_title-1"
						tagName={'h1'}
						onChange={(value) => setAttributes({ heading1: value })}
						value={heading1}
						placeholder={__('Input Title', 'vk-blocks-pro')}
					/>
				);
				richTextPSave = (
					<RichText
						className="vk_prBlocks_item_summary vk_prBlocks_item_summary-1"
						tagName={'p'}
						onChange={(value) => setAttributes({ content1: value })}
						value={content1}
						placeholder={__('Input Content', 'vk-blocks-pro')}
					/>
				);
			} else if (blockNum === 2) {
				richTextH1Save = (
					<RichText
						className="vk_prBlocks_item_title vk_prBlocks_item_title-2"
						tagName={'h1'}
						onChange={(value) => setAttributes({ heading2: value })}
						value={heading2}
						placeholder={__('Input Title', 'vk-blocks-pro')}
					/>
				);
				richTextPSave = (
					<RichText
						className="vk_prBlocks_item_summary vk_prBlocks_item_summary-2"
						tagName={'p'}
						onChange={(value) => setAttributes({ content2: value })}
						value={content2}
						placeholder={__('Input Content', 'vk-blocks-pro')}
					/>
				);
			} else if (blockNum === 3) {
				richTextH1Save = (
					<RichText
						className="vk_prBlocks_item_title vk_prBlocks_item_title-3"
						tagName={'h1'}
						onChange={(value) => setAttributes({ heading3: value })}
						value={heading3}
						placeholder={__('Input Title', 'vk-blocks-pro')}
					/>
				);
				richTextPSave = (
					<RichText
						className="vk_prBlocks_item_summary vk_prBlocks_item_summary-3"
						tagName={'p'}
						onChange={(value) => setAttributes({ content3: value })}
						value={content3}
						placeholder={__('Input Content', 'vk-blocks-pro')}
					/>
				);
			}
		} else if (for_ === 'save') {
			richTextH1Save = (
				<RichText.Content
					className={`vk_prBlocks_item_title vk_prBlocks_item_title-${blockNum}`}
					tagName={'h1'}
					value={heading[blockNumArrIndex]}
				/>
			);
			richTextPSave = (
				<RichText.Content
					className={`vk_prBlocks_item_summary vk_prBlocks_item_summary-${blockNum}`}
					tagName={'p'}
					value={content[blockNumArrIndex]}
				/>
			);
		}

		return (
			<div className="vk_prBlocks_item col-sm-4">
				<a
					href={url[blockNumArrIndex]}
					target={urlOpenType[blockNumArrIndex] ? '_blank' : '_self'}
					className="vk_prBlocks_item_link"
					rel="noopener noreferrer"
				>
					{drawElement}
					{richTextH1Save}
					{richTextPSave}
				</a>
			</div>
		);
	}
}
