const {InnerBlocks} = wp.editor;
const {__} = wp.i18n; // Import __() from wp.i18n

export class Component extends React.Component {
    render() {
        const {attributes, className} = this.props.value;
        let {
            layout,
            col_xs,
            col_sm,
            col_md,
            col_lg,
            col_xl,
            display_image,
            display_excerpt,
            display_btn,
            btn_text,
            btn_align,
        } = attributes;

        const for_ = this.props.for_;

        let containerClass = " vk_card_item";
        let inner;

        //編集画面とサイト上の切り替え
        if (for_ === "edit") {
            inner = <InnerBlocks/>;
        } else if ("save"){
            inner = <InnerBlocks.Content/>;
        }

        let imgContainerClass;
        let imgClass;
        let vk_post_body;
        let vk_title;
        let vk_date;
        if (layout === 'card-horizontal') {

        } else if (layout === 'media') {
            imgContainerClass = 'vk_post_imgOuter media-img';
            imgClass = 'vk_post_imgOuter_img';
            vk_post_body = 'media-body';
            vk_title = ' media-title';
            vk_date = 'media-date';

        } else if (layout === 'card') {
            layout = layout + ' card-post';
            imgContainerClass = 'vk_post_imgOuter';
            imgClass = 'vk_post_imgOuter_img card-img-top';
            vk_post_body = 'card-body';
            vk_title = 'card-title';
            vk_date = 'card-date';
        }

        const renderImage = (display_image) => {
            if (display_image) {
                return <img src="http://vccw.test/wp-content/plugins/vk-blocks-pro/inc/vk-blocks/images/no-image.png" alt="" className="vk_post_imgOuter_img card-img-top"/>
            }
        };
        const renderExcerpt = (display_excerpt) => {
            if (display_excerpt) {
                return <p className="vk_post_excerpt card-text">Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>;
            }
        };
        const renderButton = (display_btn) => {
            if (display_btn) {
                return <a className="btn btn-primary vk_post_btn" href="http://vccw.test/archives/1">{btn_text}</a>
            }
        };

        return (
            <div className={`vk_post ${layout} card-post vk_PostList_card vk_post-col-xs-${col_xs} vk_post-col-sm-${col_sm} vk_post-col-md-${col_md} vk_post-col-lg-${col_lg} vk_post-col-xl-${col_xl} vk_post-btn-display`}>
            <div className={imgContainerClass}>
                <a href="http://vccw.test/archives/1">
                <div className="card-img-overlay">
                </div>
                    {renderImage(display_image)}
                </a>
            </div>
            <div className="vk_post_body card-body">
                <h5 className="vk_post_title card-title">
                    <a href="http://vccw.test/archives/1">Hello world!</a>
                </h5>
                {renderExcerpt(display_excerpt)}
                <div className={`vk_post_btnOuter ${btn_align}`}>
                    {renderButton(display_btn)}
                </div>
            </div>
            </div>);
    }
}
