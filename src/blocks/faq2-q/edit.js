import { InnerBlocks } from '@wordpress/block-editor';
import classNames from "classnames";

export default function edit( { className } ) {
	return (
		<dt className={ classNames( className,`vk_faq_title` ) }>
			<InnerBlocks
				templateLock={ false }
				template={ [
					[ 'core/paragraph' ],
				] }
			/>
		</dt>
	);
}
