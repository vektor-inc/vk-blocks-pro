import { vkbBlockEditor } from '@vkblocks/utils/depModules';
import classNames from "classnames";

const { InnerBlocks } = vkbBlockEditor;

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
