import React from "react";
import { componentDivider } from "./component-divider";
const { InnerBlocks } = wp.editor;
import hex2rgba from "../../_helper/hex-to-rgba";

export class Component extends React.Component {
  render() {
    let {
      bgColor,
      bgImage,
      bgPosition,
      outerWidth,
      padding_left_and_right,
      padding_top_and_bottom,
      opacity,
      upper_level,
      lower_level,
      upperDividerBgColor,
      lowerDividerBgColor,
      dividerType,
      borderWidth,
      borderStyle,
      borderColor,
      borderRadius,
      anchor
    } = this.props.attributes;

    let className = this.props.className;
    let for_ = this.props.for_;
    let classPaddingLR;
    let classPaddingVertical;
    let classBgPosition;
    let classWidth;
    let elm;
    let containerClass;
    let whichSideUpper;
    let whichSideLower;
    let bgStyle;
    let borderProperty;
    let borderRadiusProperty;

    //幅のクラス切り替え
    classWidth = ` vk_outer-width-${outerWidth}`;

    //hexからrgbaに変換
    if (bgColor) {
      bgColor = hex2rgba(bgColor, opacity);
    } else {
      //背景色をクリアした時は、白に変更
      bgColor = hex2rgba("#fff", opacity);
    }

    //classBgPositionのクラス切り替え
    if (bgPosition === "parallax") {
      classBgPosition = " vk_outer-bgPosition-parallax vk-prlx";
    } else if (bgPosition === "fixed") {
      classBgPosition = " vk_outer-bgPosition-fixed";
    } else {
      classBgPosition = " vk_outer-bgPosition-normal";
    }

    //classPaddingLRのクラス切り替え
    if (padding_left_and_right === "1") {
      classPaddingLR = " vk_outer-paddingLR-use";
    } else {
      classPaddingLR = " vk_outer-paddingLR-none";
    }

    //classPaddingVerticalのクラス切り替え
    if (padding_top_and_bottom === "1") {
      classPaddingVertical = " vk_outer-paddingVertical-use";
    } else {
      classPaddingVertical = " vk_outer-paddingVertical-none";
    }

    //上側セクションの傾き切り替え
    if (upper_level) {
      whichSideUpper = "upper";
    }

    //下側セクションの傾き切り替え
    if (lower_level) {
      whichSideLower = "lower";
    }

    //編集画面とサイト上の切り替え
    if (for_ === "edit") {
      elm = <InnerBlocks />;
    } else if ("save") {
      elm = <InnerBlocks.Content />;
      containerClass = "vk_outer_container";
    }

    //背景画像の有り無しでstyleを切り替え
    if (bgImage) {
      bgStyle = `linear-gradient(${bgColor}, ${bgColor}), url(${bgImage})`;
    } else {
      bgStyle = `linear-gradient(${bgColor}, ${bgColor})`;
    }

    //borderColorクリア時に白をセットする
    if (!borderColor) {
      borderColor = "#fff";
    }

    //Dividerエフェクトがない時のみ枠線を追加
    if (upper_level === 0 && lower_level === 0) {
      borderProperty = `${borderWidth}px ${borderStyle} ${borderColor}`;
      borderRadiusProperty = `${borderRadius}px`;
    } else {
      borderProperty = "none";
      borderRadiusProperty = `0px`;
    }

    return (
      <div
        id={anchor}
        className={
          className +
          " vk_outer" +
          classWidth +
          classPaddingLR +
          classPaddingVertical +
          classBgPosition
        }
        style={{
          background: bgStyle,
          border: borderProperty,
          borderRadius: borderRadiusProperty
        }}
      >
        {componentDivider(
          upper_level,
          upperDividerBgColor,
          whichSideUpper,
          dividerType
        )}
        <div className={containerClass}>{elm}</div>
        {componentDivider(
          lower_level,
          lowerDividerBgColor,
          whichSideLower,
          dividerType
        )}
      </div>
    );
  }
}
