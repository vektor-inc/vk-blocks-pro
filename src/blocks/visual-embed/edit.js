import { __ } from '@wordpress/i18n';
import { PanelBody, TextareaControl } from '@wordpress/components';
import { InspectorControls, useBlockProps, BlockControls } from '@wordpress/block-editor';

export default function GoogleMapEdit({ attributes, setAttributes }) {
    const { iframeCode } = attributes;

    // ブロック全体に適用するプロパティを取得
    const blockProps = useBlockProps({
        className: 'vk-google-map',
    });

    return (
        <div {...blockProps}>
            <BlockControls>
                {/* AlignmentToolbarは削除することで、テキストの揃えオプションを非表示に */}
                {/* 必要であれば他のカスタムツールバーオプションを追加できます */}
            </BlockControls>
            <InspectorControls>
                <PanelBody title={__('Google Map Embed Code', 'vk-blocks-pro')}>
                    <TextareaControl
                        label={__('Embed Code', 'vk-blocks-pro')}
                        value={iframeCode}
                        onChange={(newCode) => setAttributes({ iframeCode: newCode })}
                        help={__('Googleマップの埋め込みコードをそのまま貼り付けてください。', 'vk-blocks-pro')}
                    />
                </PanelBody>
            </InspectorControls>
            <div style={{ position: 'relative' }}>
                {iframeCode && (
                    <div
                        className="vk-google-map-preview"
                        dangerouslySetInnerHTML={{ __html: iframeCode }}
                        style={{ pointerEvents: 'none' }}
                    />
                )}
            </div>
        </div>
    );
}
