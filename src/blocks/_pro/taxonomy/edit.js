import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

export default function TaxonomyEdit(props) {
	const { attributes, setAttributes } = props;

	const {
		isSelectedTaxonomy,
		displayAsDropdown,
		showHierarchy,
		showPostCounts,
		showOnlyTopLevel,
		hideIfEmpty,
	} = attributes;

	let editContent;
	const condition = (taxonomy) => taxonomy.value === isSelectedTaxonomy;

	// eslint-disable-next-line camelcase,no-undef
	const taxonomyOption = vkTaxonomy.taxonomyOption;

	const selected = taxonomyOption.find(condition);

	if (
		taxonomyOption.some(condition) &&
		isSelectedTaxonomy !== '' &&
		isSelectedTaxonomy !== null &&
		isSelectedTaxonomy !== undefined
	) {
		editContent = (
			<ServerSideRender
				block="vk-blocks/taxonomy"
				attributes={attributes}
			/>
		);
	} else if (
		! taxonomyOption.some(condition) &&
		isSelectedTaxonomy !== '' &&
		isSelectedTaxonomy !== null &&
		isSelectedTaxonomy !== undefined
	) {
		editContent = (
			<div>
				<div className="vk_taxonomy-warning">
					<div className="vk_taxonomy-label-name">
						{__('Taxonomy', 'vk-blocks-pro')}
					</div>
					<div className="vk_taxonomy-warning_text">
						{__(
							'The selected taxonomy dose not exist. Please select another taxonomy.',
							'vk-blocks-pro'
						)}
					</div>
				</div>
			</div>
		);
	} else if (
		isSelectedTaxonomy === '' ||
		isSelectedTaxonomy === null ||
		isSelectedTaxonomy === undefined
	) {
		editContent = (
			<div>
				<div className="vk_taxonomy-warning">
					<div className="vk_taxonomy-label-name">
						{__('Taxonomy', 'vk-blocks-pro')}
					</div>
					<div className="vk_taxonomy-warning_text">
						{__(
							'This block will not be displayed because no taxonomy is selected.',
							'vk-blocks-pro'
						)}
					</div>
				</div>
			</div>
		);
	} else {
		editContent = (
			<div className="vk_taxonomy-warning">
				<div className="vk_taxonomy-label-name">{selected.label}</div>
				<div className="vk_taxonomy-warning-text">
					{__(
						'This block will not be displayed because this taxonomy has no term.',
						'vk-blocks-pro'
					)}
				</div>
			</div>
		);
	}

	const blockProps = useBlockProps({
		className: `vk_taxonomy vk_taxonomy-edit-wrap`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Taxonomy Block Option', 'vk-blocks-pro')}
					initialOpen={true}
				>
					<SelectControl
						label={__('Taxonomy', 'vk-blocks-pro')}
						value={isSelectedTaxonomy}
						options={taxonomyOption}
						onChange={(value) =>
							setAttributes({
								isSelectedTaxonomy: value,
							})
						}
					/>
					<ToggleControl
						label={__('Display as dropdown', 'vk-blocks-pro')}
						checked={displayAsDropdown}
						onChange={(value) =>
							setAttributes({ displayAsDropdown: value })
						}
					/>
					<ToggleControl
						label={__('Show post counts', 'vk-blocks-pro')}
						checked={showPostCounts}
						onChange={(value) =>
							setAttributes({ showPostCounts: value })
						}
					/>
					<ToggleControl
						label={__(
							'Show only top level categories',
							'vk-blocks-pro'
						)}
						checked={showOnlyTopLevel}
						onChange={(value) =>
							setAttributes({ showOnlyTopLevel: value })
						}
					/>
					<ToggleControl
						label={__('Hide if term has no posts', 'vk-blocks-pro')}
						checked={hideIfEmpty}
						onChange={(value) =>
							setAttributes({ hideIfEmpty: value })
						}
					/>
					{!showOnlyTopLevel && (
						<ToggleControl
							label={__('Show hierarchy', 'vk-blocks-pro')}
							checked={showHierarchy}
							onChange={(value) =>
								setAttributes({ showHierarchy: value })
							}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>{editContent}</div>
		</>
	);
}
