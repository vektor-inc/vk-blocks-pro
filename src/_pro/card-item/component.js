const {InnerBlocks} = wp.editor;
const {__} = wp.i18n; // Import __() from wp.i18n

export class Component extends React.Component {
    render() {
        const {attributes, className} = this.props.value;
        let {
            url,
            numberPosts,
            layout,
            col_xs,
            col_sm,
            col_md,
            col_lg,
            col_xl,
            display_image,
            display_image_overlay_term,
            display_excerpt,
            display_date,
            display_new,
            display_btn,
            new_date,
            new_text,
            btn_text,
            btn_align,
            isCheckedPostType,
            coreTerms,
            isCheckedTerms
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
        return (
            <div className={`vk_post ${layout} vk_PostList_card vk_post-col-xs-${col_xs} vk_post-col-sm-${col_sm} vk_post-col-md-${col_md} vk_post-col-lg-${col_lg} vk_post-col-xl-${col_xl}`}>
                <div className={imgContainerClass}>
                    <a href="http://vccw.test/archives/32">
                        <div className="card-img-overlay">
                            <span className="vk_post_imgOuter_singleTermLabel"
                                  style={{color: '#fff', backgroundColor: '#999999'}}>Uncategorized</span>
                        </div>
                        <img src="http://vccw.test/wp-content/plugins/vk-blocks-pro/inc/vk-blocks/images/no-image.png"
                             alt="" className={imgClass}/>
                    </a>
                </div>
                <div className={`vk_post_body ${vk_post_body}`}>
                    <h5 className={`vk_post_title ${vk_title}`}>
                        <a href="http://vccw.test/archives/32">
                            <span className="vk_post_title_new">New!!</span>
                        </a>
                    </h5>
                    <div className={`vk_post_date ${vk_date}`}>Dec 11th 2019</div>
                </div>
            </div>
        );

        // return (
        //     <div id="post-32"
        //          className="vk_post card card-post card-horizontal vk_PostList_card vk_post-col-xs-12 vk_post-col-sm-6 vk_post-col-md-4 vk_post-col-lg-4 vk_post-col-xl-4 post-32 post type-post status-publish format-standard hentry category-uncategorized">
        //         <div className="row no-gutters card-horizontal-inner-row">
        //             <div className="col-5 card-img-outer"
        //                  style="background-image:url(http://vccw.test/wp-content/plugins/vk-blocks-pro/inc/vk-blocks/images/no-image.png)">
        //                 <div className="vk_post_imgOuter"><a href="http://vccw.test/archives/32">
        //                     <div className="card-img-overlay"><span className="vk_post_imgOuter_singleTermLabel"
        //                                                             style="color:#fff;background-color:#999999">Uncategorized</span>
        //                     </div>
        //                     <img
        //                         src="http://vccw.test/wp-content/plugins/vk-blocks-pro/inc/vk-blocks/images/no-image.png"
        //                         alt="" className="vk_post_imgOuter_img card-img card-img-use-bg"/></a></div>
        //             </div>
        //             <div className="col-7">
        //                 <div className="vk_post_body card-body"><h5 className="vk_post_title card-title"><a
        //                     href="http://vccw.test/archives/32"><span className="vk_post_title_new">New!!</span></a>
        //                 </h5>
        //                     <div className="vk_post_date card-date published">Dec 11th 2019</div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // );

    }
}


// return (
//     <div className="vk_post media vk_PostList_card vk_post-col-xs-12 vk_post-col-sm-6 vk_post-col-md-4 vk_post-col-lg-4 vk_post-col-xl-4 post-32 post type-post status-publish format-standard hentry category-uncategorized">
//         <div className="vk_post_imgOuter media-img">
//             <a href="http://vccw.test/archives/32">
//             <div className="card-img-overlay">
//                 <span className="vk_post_imgOuter_singleTermLabel"
//                                                     style="color:#fff;background-color:#999999">Uncategorized</span>
//             </div>
//             <img src="http://vccw.test/wp-content/plugins/vk-blocks-pro/inc/vk-blocks/images/no-image.png"
//                  alt="" className="vk_post_imgOuter_img"/></a></div>
//         <div className="vk_post_body media-body">
//             <h5 className="vk_post_title media-title">
//                 <a href="http://vccw.test/archives/32">
//                     <span className="vk_post_title_new">New!!</span></a>
//             </h5>
//             <div className="vk_post_date media-date published">Dec 11th 2019</div>
//         </div>
//     </div>
// );






//
// export class VKComponentPosts {
//
//     get_loop(wp_query, options, options_loop){
//
//
//         const options_loop_default = {'class_loop_outer':''};
//         options_loop         = wp_parse_args( options_loop, options_loop_default );
//         let loop = '';
//         const outer_class = '';
//         if ( options_loop['class_loop_outer'] ) {
//             outer_class = ' ' . options_loop['class_loop_outer'];
//         }
//
//         loop += `<div class="vk_posts ${outer_class}">`;
//         loop += this.get_view( post, options );
//         loop += '</div>';
//
//         return loop;
//     }
//
//     get_view_type_card_horizontal(post, options) {
//         let html = '';
//         html += this.get_view_first_div(post, options);
//         html += '<div class="row no-gutters card-horizontal-inner-row">';
//
//         if (options['display_image']) {
//             html += '<div class="col-5 card-img-outer">';
//             let attr = {
//                     'class_outer':
//                         '',
//                     'class_image':
//                         'card-img card-img-use-bg',
//                 }
//             ;
//             html += this.get_thumbnail_image(post, options, attr);
//             html += '</div>;
//             html += '<div class="col-7">';
//         }
//
//         html += self::get_view_body(post, options);
//
//         if (options['display_image']) {
//             html += '</div><!-- /.col -->';
//         }
//
//         html += '</div><!-- [ /.row ] -->';
//         // html += '</a>';
//         html += '</div><!-- [ /.card ] -->';
//         return html;
//     }
//
//     get_view_first_div(post, options) {
//         let class_outer;
//         if (options['layout'] == 'card-horizontal') {
//             class_outer = 'card card-post card-horizontal';
//         } else if (options['layout'] == 'media') {
//             class_outer = 'media';
//         } else {
//             class_outer = 'card card-post';
//         }
//
//         if (!empty(options['class_outer'])) {
//             class_outer += ' '.esc_attr(options['class_outer']);
//         }
//         if (options['display_btn']) {
//             class_outer += ' vk_post-btn-display';
//         }
//         let html = '<div id="post-'.esc_attr(post->ID).
//         '" class="vk_post '.join(' ', get_post_class(class_outer)).
//         '">';
//         return html;
//     }
// }
