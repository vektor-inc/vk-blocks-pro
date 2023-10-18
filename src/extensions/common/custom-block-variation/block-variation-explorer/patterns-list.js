/**
 * Internal dependencies
 */
import CreateVariation from '../create-variation';
import BlockVariationList from '../block-variation-list';

export default function PatternList(props) {
	const { selectedCategory } = props;
	return (
		<div
			className="block-editor-block-patterns-explorer__list"
			style={{
				paddingBottom: '0',
			}}
		>
			{selectedCategory === 'create' && <CreateVariation {...props} />}
			{selectedCategory === 'registered' && (
				<BlockVariationList {...props} />
			)}
		</div>
	);
}
