/**
 * Title group block type
 *
 */
import Body from "./Body";
import { schema, example } from './schema';
import { FontAwesome } from "./font-awesome-new";
import { deprecated }  from "./deprecated"

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, BaseControl,SelectControl } = wp.components;
const { Fragment } = wp.element;
import { vkbBlockEditor } from "./../_helper/depModules";
const { InspectorControls } = vkbBlockEditor;

const BlockIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		x="0px"
		y="0px"
		viewBox="0 0 576 576"
	>
		<g>
			<path d="M121,142.6c0.1,1.4,1.2,2.5,2.7,2.5h10.7c1.4,0,2.6-1.1,2.7-2.5l1.6-30.1c0.1-1.5-1.1-2.8-2.7-2.8h-14
			c-1.5,0-2.7,1.3-2.7,2.8L121,142.6z" />
			<path d="M127.5,149.2c5.6-0.9,10.8,2.9,11.7,8.4c0.9,5.6-2.9,10.8-8.4,11.7s-10.8-2.9-11.7-8.4
			C118.1,155.4,121.9,150.1,127.5,149.2z" />
			<path d="M528,171.9H384.1V98.6c0-26.8-21.7-48.5-48.5-48.5H48.5C21.7,50.1,0,71.8,0,98.6v119.3h0.1c0,0.7-0.1,1.3-0.1,2v267
			c0,26.5,21.5,48,48,48h480c26.5,0,48-21.5,48-48v-267C576,193.4,554.5,171.9,528,171.9z M129.1,83.2c30.3,0,54.9,24.6,54.9,54.9
			c0,12.8-4.4,24.5-11.7,33.8c-10,12.8-25.6,21-43.2,21c-17.5,0-33.1-8.2-43.2-21c-7.3-9.3-11.7-21.1-11.7-33.8
			C74.2,107.8,98.8,83.2,129.1,83.2z M528,486.9H48v-267h480V486.9z" />
			<path className="st0" d="M442.4,308.7H133.6c-7.9,0-14.5-6.5-14.5-14.5c0-7.9,6.5-14.5,14.5-14.5h308.9c7.9,0,14.5,6.5,14.5,14.5
			C456.9,302.2,450.4,308.7,442.4,308.7z" />
			<path className="st0" d="M442.4,373.5H133.6c-7.9,0-14.5-6.5-14.5-14.5c0-7.9,6.5-14.5,14.5-14.5h308.9c7.9,0,14.5,6.5,14.5,14.5
			C456.9,367.1,450.4,373.5,442.4,373.5z" />
			<path className="st0" d="M442.4,438.3H133.6c-7.9,0-14.5-6.5-14.5-14.5c0-7.9,6.5-14.5,14.5-14.5h308.9c7.9,0,14.5,6.5,14.5,14.5
			C456.9,431.8,450.4,438.3,442.4,438.3z" />
		</g>
	</svg>
  );


registerBlockType('vk-blocks/border-box', {
	title: __('Border Box', 'vk-blocks'),
    icon: BlockIcon,
	category: 'vk-blocks-cat',
	attributes: schema,
	supports:{
		className:true
	},
	example:example,

	styles: [
		{
			name: 'vk_borderBox-style-solid-kado-tit-tab',
			label: __( 'Solid Angle Tab', 'vk-blocks' ),
			isDefault:true
		},
		{
			name: 'vk_borderBox-style-solid-round-tit-tab',
			label: __( 'Solid Round Tab', 'vk-blocks' )
		},
		{
			name: 'vk_borderBox-style-solid-kado-tit-banner',
			label: __( 'Solid Angle Banner', 'vk-blocks' ),
		},
		{
			name: 'vk_borderBox-style-solid-kado-tit-onborder',
			label: __( 'Solid Angle Onborder', 'vk-blocks' ),
		},
		{
			name: 'vk_borderBox-style-solid-kado-tit-inner',
			label: __( 'Solid Angle Inner', 'vk-blocks' ),
		},
		{
			name: 'vk_borderBox-style-solid-kado-iconFeature',
			label: __( 'Solid Angle iconFeature', 'vk-blocks' ),
		},
	],

	edit(props) {
		const { attributes, setAttributes } = props;
		const { color } = attributes;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __('Color', 'vk-blocks') }>
						<SelectControl
							value={ color }
							onChange={ value => setAttributes({ color: value }) }
							options={ [
								{
									value: "red",
									label: __("Red", "vk-blocks")
								},
								{
									value: "orange",
									label: __("Orange", "vk-blocks")
								},
								{
									value: "blue",
									label: __("Blue", "vk-blocks")
								},
								{
									value: "green",
									label: __("Green", "vk-blocks")
								},
								{
									value: "black",
									label: __("Black", "vk-blocks")
								}
							] }
						/>
					</PanelBody>
					<PanelBody title={ __('Icon', 'vk-blocks') }>
						<BaseControl
							id="dot-fa"
							label={ __('Icon ( Font Awesome )', 'vk-blocks') }
						>
							<FontAwesome
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<Body for_={ 'edit' } { ...props } />
			</Fragment>
		);
	},

	save(props) {
		return <Body for_={ 'save' }{ ...props } />;
	},
	deprecated
});
