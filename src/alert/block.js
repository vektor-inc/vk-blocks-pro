/**
 * Alert block type
 *
 */
import {deprecated} from './deprecated';

const {__} = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks;
const { RichText }          = wp.editor;

registerBlockType( 'vk-blocks/alert', {

  title: __('Alert', 'vk-blocks'),

  icon: 'info',

  category: 'vk-blocks-cat',

  attributes: {
    style: {
      type: 'string',
      default: 'info',
    },
    content: {
        type: 'string',
        source: 'html',
        selector: 'p',
    }
  },

  edit({attributes, setAttributes, className}) {
      const {
          style,
          content
      } = attributes;

    function onStyleChange(event){
      setAttributes({style: event.target.value});
    }

    function onChangeContent(newContent) {
      setAttributes({content: newContent});
    }

    return (
        <div className={`${className} alert alert-${style}`}>
        <select onChange={onStyleChange}>
            <option value={'success'} selected={style === 'success'}>Success</option>
            <option value={'info'} selected={style === 'info'}>Info</option>
            <option value={'warning'} selected={style === 'warning'}>Warning</option>
            <option value={'danger'} selected={style === 'danger'}>Danger</option>
        </select>
        <RichText
            tagName="p"
            onChange={onChangeContent}
            value={content}
        />
      </div>
    );
  },

  save({attributes,className}) {
      const {
          style,
          content
      } = attributes;
    return (
        <div className={`${className} alert alert-${style}`}>
        <RichText.Content
            tagName={'p'}
            value={content}/>
      </div>
    );
  },
    deprecated: deprecated,
} );
