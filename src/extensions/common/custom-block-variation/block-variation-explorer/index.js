/**
 * WordPress dependencies
 */
import { Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import PatternExplorerSidebar from './sidebar';
import PatternList from './patterns-list';

function VariationExplorerModal(props) {
	const { onModalClose } = props;
	const [selectedCategory, setSelectedCategory] = useState('create');
	const [hasUpdates, setHasUpdates] = useState(false);
	return (
		<Modal
			title={__('Variation settings', 'vk-blocks-pro')}
			onRequestClose={onModalClose}
			className="custom_block_variation_modal"
			isFullScreen
			shouldCloseOnClickOutside={false}
		>
			<div className="block-editor-block-patterns-explorer">
				<PatternExplorerSidebar
					selectedCategory={selectedCategory}
					onClickCategory={setSelectedCategory}
					hasUpdates={hasUpdates}
					setHasUpdates={setHasUpdates}
				/>
				<PatternList
					selectedCategory={selectedCategory}
					hasUpdates={hasUpdates}
					setHasUpdates={setHasUpdates}
					{...props}
				/>
			</div>
		</Modal>
	);
}
export default VariationExplorerModal;
