import { vkbBlockEditor } from "./../../utils/depModules";
const { RichText, InnerBlocks } = vkbBlockEditor;

export const deprecated = [
	{
		attributes:{
			heading: {
			  type: "string",
			  source: "html",
			  selector: "dt"
			},
			content: {
			  type: "string",
			  source: "html",
			  selector: "dd"
			}
		},
		save({ attributes, className }) {
			const { heading, content } = attributes;

			return (
				<dl className={ `${className} vk_faq` }>
					<RichText.Content
						tagName="dt"
						className={ "vk_faq_title" }
						value={ heading }
				/>
					<RichText.Content
						tagName="dd"
						className={ "vk_faq_content" }
						value={ content }
				/>
				</dl>
			);
		  }
	},
    {
        attributes: {
            heading: {
                type: 'string',
                source: 'html',
                selector: 'dt',
            },
            content: {
                type: 'string',
                source: 'html',
                selector: 'dd',
            }
        },

        save({ attributes }) {
            const {
                heading,
                content
            } = attributes;

            return (
	<dl className={ 'vk_faq' }>
		<RichText.Content
			tagName="dt"
			className={ 'vk_faq_title' }
			value={ heading }
                    />
		<RichText.Content
			tagName="dd"
			className={ 'vk_faq_content' }
			value={ content }
                    />
	</dl>
            );
        },
	},
	{
		attributes: {
			heading: {
				type: "string",
				source: "html",
				selector: "dt"
			},
			content:{
				type: "string"
			}
		},
		save({ attributes }) {
			const { heading} = attributes;
			return (
				<dl className={ `vk_faq` }>
					<RichText.Content
						tagName="dt"
						className={ "vk_faq_title" }
						value={ heading }
				/>
					<dd className={ `vk_faq_content` }>
						<InnerBlocks.Content />
					</dd>
				</dl>
			);
		},
	}
];
