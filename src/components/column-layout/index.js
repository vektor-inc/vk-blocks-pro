import { __ } from '@wordpress/i18n';
import { RangeControl, BaseControl } from '@wordpress/components';
import formatNumCol from '@vkblocks/utils/formatNumCol';

export const ColumnLayout = (props) => {
	const { setAttributes, attributes } = props;
	// eslint-disable-next-line camelcase
	const { col_xs, col_sm, col_md, col_lg, col_xl, col_xxl } = attributes;

	const defaultMinMax = {
		min: '1',
		max: '6',
	};

	const marks = [
		{
			value: 1,
		},
		{
			value: 2,
		},
		{
			value: 3,
		},
		{
			value: 4,
		},
		{
			value: 6,
		},
	];

	return (
		<>
			<BaseControl
				label={__(
					'Column ( Screen size : Extra small )',
					'vk-blocks-pro'
				)}
				id={'vk_columns-xs'}
			>
				<RangeControl
					// eslint-disable-next-line camelcase
					value={col_xs}
					onChange={(value) =>
						setAttributes({ col_xs: formatNumCol(value, col_xs) })
					}
					marks={marks}
					min={defaultMinMax.min}
					max={defaultMinMax.max}
					step={1}
				/>
			</BaseControl>
			<BaseControl
				label={__('Column ( Screen size : Small )', 'vk-blocks-pro')}
				id={'vk_columns-xs'}
			>
				<RangeControl
					// eslint-disable-next-line camelcase
					value={col_sm}
					onChange={(value) =>
						setAttributes({ col_sm: formatNumCol(value, col_sm) })
					}
					marks={marks}
					min={defaultMinMax.min}
					max={defaultMinMax.max}
					step={1}
				/>
			</BaseControl>
			<BaseControl
				label={__('Column ( Screen size : Medium )', 'vk-blocks-pro')}
				id={'vk_columns-xs'}
			>
				<RangeControl
					// eslint-disable-next-line camelcase
					value={col_md}
					onChange={(value) =>
						setAttributes({ col_md: formatNumCol(value, col_md) })
					}
					marks={marks}
					min={defaultMinMax.min}
					max={defaultMinMax.max}
					step={1}
				/>
			</BaseControl>
			<BaseControl
				label={__('Column ( Screen size : Large )', 'vk-blocks-pro')}
				id={'vk_columns-xs'}
			>
				<RangeControl
					// eslint-disable-next-line camelcase
					value={col_lg}
					onChange={(value) =>
						setAttributes({ col_lg: formatNumCol(value, col_lg) })
					}
					marks={marks}
					min={defaultMinMax.min}
					max={defaultMinMax.max}
					step={1}
				/>
			</BaseControl>
			<BaseControl
				label={__(
					'Column ( Screen size : Extra large )',
					'vk-blocks-pro'
				)}
				id={'vk_columns-xs'}
			>
				<RangeControl
					// eslint-disable-next-line camelcase
					value={col_xl}
					onChange={(value) =>
						setAttributes({ col_xl: formatNumCol(value, col_xl) })
					}
					marks={marks}
					min={defaultMinMax.min}
					max={defaultMinMax.max}
					step={1}
				/>
			</BaseControl>
			<BaseControl
				label={__('Column ( Screen size : XX large )', 'vk-blocks-pro')}
				id={'vk_columns-xs'}
			>
				<RangeControl
					// eslint-disable-next-line camelcase
					value={col_xxl}
					onChange={(value) =>
						setAttributes({ col_xxl: formatNumCol(value, col_xxl) })
					}
					marks={marks}
					min={defaultMinMax.min}
					max={defaultMinMax.max}
					step={1}
				/>
			</BaseControl>
		</>
	);
};
