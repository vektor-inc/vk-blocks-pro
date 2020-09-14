/**
 * WordPress dependencies
 */
import { Path, SVG, TextControl, Popover, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { insertObject, registerFormatType, unregisterFormatType } from '@wordpress/rich-text';
import {
	MediaUpload,
	RichTextToolbarButton,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { LEFT, RIGHT, UP, DOWN, BACKSPACE, ENTER } from '@wordpress/keycodes';
import { keyboardReturn } from '@wordpress/icons';


console.log("hello----------------------------");
const ALLOWED_MEDIA_TYPES = [ 'image' ];

const name = 'vk-blocks/responsive-br-lg';
const title = __( 'VK TEST', 'vk-blocks' );

const stopKeyPropagation = ( event ) => event.stopPropagation();

function getRange() {
	const selection = window.getSelection();
	return selection.rangeCount ? selection.getRangeAt( 0 ) : null;
}

registerFormatType( name, {
	title,
	keywords: [ __( 'photo' ), __( 'media' ) ],
	object: true,
	tagName: 'img',
	className: null,
	attributes: {
		className: 'class',
		style: 'style',
		url: 'src',
		alt: 'alt',
	},
	edit: class ImageEdit extends Component {

		constructor() {
			super( ...arguments );
			this.onChange = this.onChange.bind( this );
			this.onKeyDown = this.onKeyDown.bind( this );
			this.openModal = this.openModal.bind( this );
			this.closeModal = this.closeModal.bind( this );
			this.anchorRef = null;
			this.state = {
				modal: false,
			};
		}

		static getDerivedStateFromProps( props, state ) {
			const {
				activeObjectAttributes: { style },
			} = props;

			if ( style === state.previousStyle ) {
				return null;
			}

			if ( ! style ) {
				return {
					width: undefined,
					previousStyle: style,
				};
			}

			return {
				width: style.replace( /\D/g, '' ),
				previousStyle: style,
			};
		}

		onChange( width ) {
			this.setState( { width } );
		}

		onKeyDown( event ) {
			if (
				[ LEFT, DOWN, RIGHT, UP, BACKSPACE, ENTER ].indexOf(
					event.keyCode
				) > -1
			) {
				// Stop the key event from propagating up to ObserveTyping.startTypingInTextField.
				event.stopPropagation();
			}
		}

		openModal() {
			this.setState( { modal: true } );
		}

		closeModal() {
			this.setState( { modal: false } );
		}

		componentDidMount() {
			this.anchorRef = getRange();
		}

		componentDidUpdate( prevProps ) {
			// When the popover is open or when the selected image changes,
			// update the anchorRef.
			if (
				( ! prevProps.isObjectActive && this.props.isObjectActive ) ||
				prevProps.activeObjectAttributes.url !==
					this.props.activeObjectAttributes.url
			) {
				this.anchorRef = getRange();
			}
		}

		render() {
			const {
				value,
				onChange,
				onFocus,
				isObjectActive,
				activeObjectAttributes,
			} = this.props;

			console.log("hey----------------------------");


			return (
				<MediaUploadCheck>
					<RichTextToolbarButton
						icon={
							<SVG
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<Path d="M4 18.5h16V17H4v1.5zM16 13v1.5h4V13h-4zM5.1 15h7.8c.6 0 1.1-.5 1.1-1.1V6.1c0-.6-.5-1.1-1.1-1.1H5.1C4.5 5 4 5.5 4 6.1v7.8c0 .6.5 1.1 1.1 1.1zm.4-8.5h7V10l-1-1c-.3-.3-.8-.3-1 0l-1.6 1.5-1.2-.7c-.3-.2-.6-.2-.9 0l-1.3 1V6.5zm0 6.1l1.8-1.3 1.3.8c.3.2.7.2.9-.1l1.5-1.4 1.5 1.4v1.5h-7v-.9z" />
							</SVG>
						}
						title={ title }
						onClick={ this.openModal }
						isActive={ isObjectActive }
					/>
					{ this.state.modal && (
						<MediaUpload
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							onSelect={ ( { id, url, alt, width } ) => {
								this.closeModal();
								onChange(
									insertObject( value, {
										type: name,
										attributes: {
											className: `wp-image-${ id }`,
											style: `width: ${ Math.min(
												width,
												150
											) }px;`,
											url,
											alt,
										},
									} )
								);
								onFocus();
							} }
							onClose={ this.closeModal }
							render={ ( { open } ) => {
								open();
								return null;
							} }
						/>
					) }
					{ isObjectActive && (
						<Popover
							position="bottom center"
							focusOnMount={ false }
							anchorRef={ this.anchorRef }
						>
							{
								// Disable reason: KeyPress must be suppressed so the block doesn't hide the toolbar
								/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
							 }
							<form
								className="block-editor-format-toolbar__image-container-content"
								onKeyPress={ stopKeyPropagation }
								onKeyDown={ this.onKeyDown }
								onSubmit={ ( event ) => {
									const newReplacements = value.replacements.slice();

									newReplacements[ value.start ] = {
										type: name,
										attributes: {
											...activeObjectAttributes,
											style: `width: ${ this.state.width }px;`,
										},
									};

									onChange( {
										...value,
										replacements: newReplacements,
									} );

									event.preventDefault();
								} }
							>
								<TextControl
									className="block-editor-format-toolbar__image-container-value"
									type="number"
									label={ __( 'Width' ) }
									value={ this.state.width }
									min={ 1 }
									onChange={ this.onChange }
								/>
								<Button
									icon={ keyboardReturn }
									label={ __( 'Apply' ) }
									type="submit"
								/>
							</form>
							{ /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */ }
						</Popover>
					) }
				</MediaUploadCheck>
			);
		}
	},
});





// const { __ } = wp.i18n;
// const {registerFormatType, toggleFormat, applyFormat, insertObject, insert, create } = wp.richText;
// const { RichTextToolbarButton, BlockFormatControls } = wp.blockEditor;
// const { Fragment } = wp.element;

// // registerFormatType( 'vk-blocks/responsive-br-lg', {

// // 	title: __( 'Ruby Character', 'wp-yomigana' ),

// // 	tagName: 'br',
// // 	className: 'hey',

// // 	edit( {isActive, value, onChange} ) {
// // 	  return <Fragment></Fragment>;
// // 	}
// //   } );

// // registerFormatType(
// //     'vk-blocks/responsive-br-md', {
// //         title: __('Inline', 'vk-blocks'),
// //         tagName: 'div',
// //         className: 'test',
// //         edit: (props) => {

// // 			let { onChange, value, isActive} = props;

// // 			return <RichTextToolbarButton
// // 				icon='star-filled'
// // 				title= { __('Inline', 'vk-blocks') }
// // 				onClick={ () => {
// // 					return onChange(toggleFormat(value, {
// // 						type: 'vk-blocks/responsive-br-lg',
// // 						value.start,
// // 						value.end
// // 					} ))
// // 					// value = insertObject(
// // 					// 	value,
// // 					// 	{ type: 'vk-blocks/responsive-br-lg' },
// // 					// 	value.start,
// // 					// 	value.end,
// // 					// )
// // 					// value = applyFormat( value, {type: 'vk-blocks/responsive-br-lg'}, value.start, value.end );
// // 					// return onChange(value);
// // 				} }
// // 				isActive={ isActive }
// // 			/>;
// // 		},
// //     }
// // );

// registerFormatType( 'vk-blocks/br', {

// 	title: __( 'Ruby Character', 'wp-yomigana' ),

// 	tagName: 'br',

// 	className: null,

// 	edit( {isActive, value, onChange} ) {
// 	  return <Fragment></Fragment>;
// 	}
//   } );


// const MyCustomButton = ( props ) => {
//     return <RichTextToolbarButton
//         icon='editor-code'
//         title='Sample output'
//         onClick={ () => {
// 			console.log("-----------onClick-----------");
// 			console.log(props)
// 			console.log("-----------created-----------");
// 			let inserted = document.createElement("br");
// 			inserted.classList.add("anotherclass");
// 			inserted.textContent = 'This text is different!';

// 			let result = insert(props.value,create({html:"<br class='hello'>hey</br>"}),props.value.start,props.value.start)
// 			console.log("-----------created-----------");
// 			console.log(result)

//             return props.onChange(
// 				result
// 				// applyFormat(
//                 // props.value,
// 				// { type: 'my-custom-format/sample-output' },
// 				// props.value.start,
// 				// props.value.start+1,
// 				// )

// 				// ( props )=>{
// 				// 	return props.value
// 				// 	// let element = document.createElement("br");
// 				// 	// element.classList.add("anotherclass");
// 				// 	// element.textContent = 'This text is different!';
// 				// 	// let created = create({element:element});
// 				// 	// console.log("-----------created-----------");
// 				// 	// console.log(created);

// 				// 	// return insert(props.value,created,props.value.start,props.value.start)
// 				// }
// 			);
//         } }
//         isActive={ props.isActive }
//     />;
// };

// registerFormatType(
//     'my-custom-format/sample-output', {
//         title: 'Sample output',
//         tagName: 'samp',
//         className: null,
//         edit: MyCustomButton,
//     }
// );
