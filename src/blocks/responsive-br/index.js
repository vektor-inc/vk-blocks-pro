const { __ } = wp.i18n;
const {registerFormatType, toggleFormat,　insertObject, insert } = wp.richText;
const { RichTextToolbarButton, BlockFormatControls } = wp.blockEditor;
import { capitalize } from "../_helper/capitalize"

const breakPoints = ['xs', 'sm', 'md', 'lg', 'xl','xxl' ];

breakPoints.forEach((breakPoint)=>{
	const breakPointCapitalized = capitalize(breakPoint);
	registerFormatType(
		`vk-blocks/responsive-br-${breakPoint}`, {
			title: __(`Responsive Br ${breakPoint}`, 'vk-blocks'),
			tagName: 'br',
			className: breakPoint,
			edit: ( props ) => {
				const { onChange, value, isActive, onFocus} = props
				return <RichTextToolbarButton
					icon='editor-break'
					title= { __(`Responsive BR ${breakPointCapitalized}`, 'vk-blocks') }
					onClick={ () => {
						onChange( insert(
							value,
							`[br-${breakPoint}]`,
							value.start,
							value.end
						) );
					} }
					isActive={ isActive }
				/>;
			},
		}
	);
})

