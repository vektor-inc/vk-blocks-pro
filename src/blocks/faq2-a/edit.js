import { vkbBlockEditor } from '@vkblocks/utils/depModules';
import classNames from "classnames";

const { InnerBlocks } = vkbBlockEditor;

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
