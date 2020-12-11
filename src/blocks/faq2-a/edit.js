import { InnerBlocks } from '@wordpress/block-editor';
import classNames from "classnames";

export default function edit( { className } ) {
	return (
		<dd className={ classNames(className,`vk_faq_content`) }>
			<InnerBlocks
				templateLock={ false }
				template={ [
					[ 'core/paragraph' ],
				] }
			/>
		</dd>
	);
}
