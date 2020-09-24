const { __ } = wp.i18n;
const {registerFormatType, toggleFormat,　insertObject, insert } = wp.richText;
const { RichTextToolbarButton, BlockControls } = wp.blockEditor;
const { Toolbar, ToolbarButton,DropdownMenu } = wp.components;

const breakPoints = ['xs', 'sm', 'md', 'lg', 'xl','xxl' ];
registerFormatType(
	`vk-blocks/responsive-br`, {
		title: __(`Responsive Br`, 'vk-blocks'),
		tagName: 'br',
		className: null,
		edit: ( props ) => {
			const { onChange, value} = props

			const insertBR = (value,breakPoint) => {
				onChange( insert(
					value,
					`[br-${breakPoint}]`,
					value.start,
					value.end
				) );
			}

			return (
				<BlockControls>
					<Toolbar label="Options">
					<DropdownMenu
						icon={ 'editor-break' }
						label="Select a direction"
						controls={
							breakPoints.map((breakPoint)=>{
								return {
									title: __(`Responsive BR ${breakPoint}`, 'vk-blocks'),
									icon: 'editor-break',
									onClick: ()=>{insertBR(value,breakPoint)},
								}
							})
						}
					/>
					</Toolbar>
				</BlockControls>
			);
		},
	}
);

