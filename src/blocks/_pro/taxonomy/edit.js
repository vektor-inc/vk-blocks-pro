import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	SelectControl,
	CheckboxControl,
	TextControl,
} from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

export default function TaxonomyEdit(props) {
	const { attributes, setAttributes } = props;

	const { blockLabel, isSelectedTaxonomy, hideIfEmpty } = attributes;

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
		isSelectedTaxonomy === '' ||
		isSelectedTaxonomy === null ||
		isSelectedTaxonomy === undefined
	) {
		editContent = (
			<div>
				<div className="vk_taxonomy-warning">
					<div className="vk_taxonomy-label-name">
						{__('Taxonomy', 'vk-blocks')}
					</div>
					<div className="vk_taxonomy-warning_text">
						{__(
							'This block will not be displayed because no taxonomy is selected.',
							'vk-blocks'
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
						'vk-blocks'
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
					title={__('Taxonomy Block Option', 'vk-blocks')}
					initialOpen={true}
				>
					<BaseControl id={'vk_Taxonomy-blockLabel'}>
						<TextControl
							label={__('Label of This Block', 'vk-blocks')}
							value={blockLabel}
							onChange={(value) =>
								setAttributes({ blockLabel: value })
							}
						/>
					</BaseControl>
					<BaseControl id={'vk_Taxonomy-Taxonomy'}>
						<SelectControl
							label={__('Taxonomy', 'vk-blocks')}
							value={isSelectedTaxonomy}
							options={taxonomyOption}
							onChange={(value) =>
								setAttributes({
									isSelectedTaxonomy: value,
								})
							}
						/>
					</BaseControl>
					<BaseControl id={'vk_Taxonomy-hideIfEmpty'}>
						<CheckboxControl
							label={__('Hide if term has no posts', 'vk-blocks')}
							checked={hideIfEmpty}
							onChange={(value) =>
								setAttributes({ hideIfEmpty: value })
							}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>{editContent}</div>
		</>
	);
}
