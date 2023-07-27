/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { plusCircle } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { fallback } from '../../blog-card/utils';
import URLPlaceholder from './url-placeholder';

export default function BlogCardPlaceholder({
	setAttributes,
	onFocus,
	isEditingURL,
	setIsEditingURL,
	cannotEmbed,
	url,
	setURL,
	preview,
	onClickClearCache,
	onReplace,
}) {
	const blockProps = useBlockProps();

	const showEmbedPlaceholder = !preview || cannotEmbed || isEditingURL;
	if (showEmbedPlaceholder) {
		return (
			<div {...blockProps}>
				<URLPlaceholder
					icon={plusCircle}
					label={'label'}
					onFocus={onFocus}
					onSubmit={(event) => {
						if (event) {
							event.preventDefault();
						}
						if (!!url) {
							setIsEditingURL(false);
							setAttributes({ url });
							// setIsStartingBlank(true);
						}
					}}
					value={url}
					cannotEmbed={cannotEmbed}
					onChange={(event) => {
						setURL(event.target.value);
					}}
					fallback={() => fallback(url, onReplace)}
					tryAgain={onClickClearCache}
				/>
			</div>
		);
	}
}
