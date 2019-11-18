/**
 * table-of-contents block type
 *
 */
import {schema} from './schema';
import TableOfContents from './TableOfContents';

const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {ServerSideRender, PanelBody, SelectControl, BaseControl} = wp.components;
const {Fragment} = wp.element;
const {subscribe, select} = wp.data;
const {InspectorControls} = wp.blockEditor;
const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="576" height="512" viewBox="0 0 576 512">
	<g>
		<g>
			<path d="M199.4,402.1l266.4,0c7.1,0,12.8-5.9,12.8-12.8l0-25.6c0-7.1-5.9-12.8-12.8-12.8l-266.4,0c-7.1,0-12.8,5.9-12.8,12.8
				l0,25.6C186.6,396.3,192.5,402.1,199.4,402.1z"/>
			<path d="M199.4,323l266.4,0c7.1,0,12.8-5.9,12.8-12.8v-25.6c0-7.1-5.9-12.8-12.8-12.8l-266.4,0c-7.1,0-12.8,5.9-12.8,12.8l0,25.6
				C186.6,317.3,192.5,323,199.4,323z"/>
			<path d="M199.4,243.8l266.4,0c7.1,0,12.8-5.9,12.8-12.8v-25.6c0-7.1-5.9-12.8-12.8-12.8l-266.4,0c-7.1,0-12.8,5.9-12.8,12.8
				l0,25.6C186.6,238.1,192.5,243.8,199.4,243.8z"/>
			<path d="M110.2,402.1l30.8,0c7.1,0,12.8-5.9,12.8-12.8l0-25.6c0-7.1-5.9-12.8-12.8-12.8h-30.8c-7.1,0-12.8,5.9-12.8,12.8l0,25.6
				C97.4,396.3,103.3,402.1,110.2,402.1z"/>
			<path d="M110.2,323h30.8c7.1,0,12.8-5.9,12.8-12.8v-25.6c0-7.1-5.9-12.8-12.8-12.8h-30.8c-7.1,0-12.8,5.9-12.8,12.8l0,25.6
				C97.4,317.3,103.3,323,110.2,323z"/>
			<path d="M110.2,243.8l30.8,0c7.1,0,12.8-5.9,12.8-12.8l0-25.6c0-7.1-5.9-12.8-12.8-12.8l-30.8,0c-7.1,0-12.8,5.9-12.8,12.8l0,25.6
				C97.4,238.1,103.3,243.8,110.2,243.8z"/>
		</g>
		<path d="M159.7,158.5l256.7,0c5.3,0,9.9-4.6,9.9-9.9l0-28.8c0-5.3-4.6-9.9-9.9-9.9l-256.7,0c-5.3,0-9.9,4.6-9.9,9.9l0,28.8
			C149.8,154.2,154.3,158.5,159.7,158.5z"/>
	</g>
	<path d="M528,32H48C21.5,32,0,53.5,0,80v352c0,26.5,21.5,48,48,48h480c26.5,0,48-21.5,48-48V80C576,53.5,554.5,32,528,32z M528,432
		H48V80h480V432z"/>
	</svg>
);

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('vk-blocks/table-of-contents', {
    title: __('Table of Contents', 'vk-blocks'),
    icon: BlockIcon,
    category: 'vk-blocks-cat',
    attributes: schema,

    edit({attributes, setAttributes, className, clientId}) {
        const {
            style,
        } = attributes;

        const toc = new TableOfContents();
        const render = () =>{
            let source = toc.getHtagsInEditor();
            let html = toc.returnHtml(source, style, className);
            setAttributes({renderHtml: html});
        };

        let oldSelectedId;
        let newSelectedId;
        subscribe(() => {
            const selectedBlock = select("core/block-editor").getSelectedBlock();

            if(selectedBlock === null){
                return;
            }

            newSelectedId = selectedBlock.clientId;
            if (newSelectedId !== oldSelectedId) {
                oldSelectedId = newSelectedId;

                let regex = /heading/g;
                if (selectedBlock.name.match(regex)) {
                    render();
                }
            }
        });

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody>
                        <BaseControl
                            label={__('Style', 'vk-blocks')}
                            help={``}
                        >
                            <SelectControl
                                value={style}
                                onChange={(value) => setAttributes({style: value})}
                                options={[
                                    {
                                        value: 'default',
                                        label: __('Default', 'vk-blocks'),
                                    },
                                    {
                                        value: '',
                                        label: __('No frame', 'vk-blocks'),
                                    }
                                ]}
                            />
                        </BaseControl>
                    </PanelBody>
                </InspectorControls>
                {
                    vk_blocks_check.is_pro
                        ?
                        <ServerSideRender
                            block='vk-blocks/table-of-contents'
                            attributes={attributes}
                        />
                        :
                        <div>{__('This block is only for users who bought Lightning Pro.', 'vk-blocks')}</div>
                }
            </Fragment>
        );
    },

    /**
     * The save function defin className }> which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    save() {
        return null;
    },

});
