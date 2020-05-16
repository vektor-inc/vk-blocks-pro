const { Component } = wp.element;

export class VKBButton extends Component {

    render() {

        let buttonColorCustom = this.props.lbColorCustom;
        let buttonColor = this.props.lbColor;
        let buttonType = this.props.lbType;
        let buttonAlign = this.props.lbAlign;
        let buttonSize = this.props.lbSize;
        let buttonUrl = this.props.lbUrl;
        let buttonTarget = this.props.lbTarget;
        let fontAwesomeIconBefore = this.props.lbFontAwesomeIconBefore;
        let fontAwesomeIconAfter = this.props.lbFontAwesomeIconAfter;
        let richText = this.props.lbRichtext;
        let subCaption = this.props.lbsubCaption;
        let containerClass = '';
        let aClass = '';
        let aStyle = {};
        let iconBefore = '';
        let iconAfter = '';

        aClass = `btn vk_button_link`;

        if (buttonColorCustom) {

            aClass = `${aClass} btn-primary btn-${buttonSize}`;

            // 塗り
            if (buttonType === '0') {
                aStyle = {
                    backgroundColor: buttonColorCustom,
                    border: `1px solid ${buttonColorCustom}`
                };
                // 塗りなし
            } else if (buttonType === '1') {
                aStyle = {
                    backgroundColor: 'transparent',
                    border: '1px solid ' + buttonColorCustom,
                    color: buttonColorCustom
                };
            }
            // カスタムカラーじゃない場合
        } else if (!buttonColorCustom) {
            // 塗り
            if (buttonType === '0') {
                aClass = `${aClass} btn-${buttonSize} btn-${buttonColor}`;
                aStyle = null;
                // 塗りなし
            } else if (buttonType === '1') {
                aClass = `${aClass} btn-${buttonSize} btn-outline-${buttonColor}`;
                aStyle = null;
            }

        }

        if (buttonAlign === 'block') {
            aClass = `${aClass} btn-block`;
        }

        if (fontAwesomeIconBefore) {
            iconBefore = <i className={`${fontAwesomeIconBefore} vk_button_link_before`}></i>;
        }
        if (fontAwesomeIconAfter) {
            iconAfter = <i className={`${fontAwesomeIconAfter} vk_button_link_after`}></i>;
        }

        return (
            <a
                href={buttonUrl}
                id={'vk_button_link'}
                style={aStyle}
                className={aClass}
                role={'button'}
                aria-pressed={true}
                target={buttonTarget ? '_blank' : null}
                rel={'noopener noreferrer'}
            >
                {iconBefore}
                {richText}
                {iconAfter}
                {/*サブキャプションが入力された時のみ表示*/}
                {subCaption && <p className={'vk_button_link_subCaption'}>{subCaption}</p>}
            </a>
        );
    }
}
