/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Button, Placeholder } from '@wordpress/components';
import { BlockIcon, URLInput } from '@wordpress/block-editor';

const URLPlaceholder = ({
	icon,
	label,
	value,
	onSubmit,
	onChange,
	cannotEmbed,
	fallback,
	tryAgain,
}) => {
	return (
		<Placeholder
			icon={<BlockIcon icon={icon} showColors />}
			label={label}
			className="wp-block-embed"
			instructions={__(
				'Paste a link to the content you want to display on your site.'
			)}
		>
			<form onSubmit={onSubmit}>
				<URLInput
					__nextHasNoMarginBottom
					value={value || ''}
					onChange={(newValue) => {
						onChange({ target: { value: newValue } });
					}}
					placeholder={__('Enter URL to embed here…')}
					className="components-placeholder__input"
					aria-label={label}
				/>
				<Button variant="primary" type="submit">
					{_x('Embed', 'button label')}
				</Button>
			</form>
			{cannotEmbed && (
				<div className="components-placeholder__error">
					<div className="components-placeholder__instructions">
						{__('Sorry, this content could not be embedded.')}
					</div>
					<Button variant="secondary" onClick={tryAgain}>
						{_x('Try again', 'button label')}
					</Button>{' '}
					<Button variant="secondary" onClick={fallback}>
						{_x('Convert to link', 'button label')}
					</Button>
				</div>
			)}
		</Placeholder>
	);
};

export default URLPlaceholder;
