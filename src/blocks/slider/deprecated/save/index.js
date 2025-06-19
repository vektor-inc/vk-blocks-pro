/* eslint camelcase: 0 */
import save1_105_0 from './1.105.0/save';
import save1_80_1 from './1.80.1/save';
import save1_51_0 from './1.51.0/save';
import save1_48_1 from './1.48.1/save';
import save1_34_1 from './1.34.1/save';
import save1_13_1 from './1.13.1/save';
import save1_10_0 from './1.10.0/save';
import save1_9_2 from './1.9.2/save';
import save1_9_1 from './1.9.1/save';
import save1_2_1 from './1.2.1/save';
import save1_0_16 from './1.0.16/save';

const blockAttributes = {
	unit: {
		type: 'string',
		default: 'px',
	},
	pc: {
		type: 'number',
		default: 600,
	},
	tablet: {
		type: 'number',
		default: 600,
	},
	mobile: {
		type: 'number',
		default: 600,
	},
	autoPlay: {
		type: 'boolean',
		default: true,
	},
	autoPlayDelay: {
		type: 'number',
		default: 2500,
	},
	pagination: {
		type: 'boolean',
		default: true,
	},
	clientId: {
		type: 'string',
		default: '',
	},
	width: {
		type: 'string',
		default: '',
	},
	loop: {
		type: 'boolean',
		default: true,
	},
	effect: {
		type: 'string',
		default: 'slide',
	},
	speed: {
		type: 'number',
		default: 300,
	},
};

const blockAttributes2 = {
	...blockAttributes,
	slidesPerView: {
		type: 'number',
		default: 1
	},
	slidesPerGroup: {
		type: 'number',
		default: 1
	}
}

const blockAttributes3 = {
	...blockAttributes2,
	speed: {
		type: 'number',
		default: 500,
	},
}

const blockAttributes4 = {
	...blockAttributes3,
	autoPlayStop: {
		type: 'boolean',
		default: false
	},
	pagination: {
		type: 'string',
		default: 'bullets'
	},
	clientId: {
		type: 'string',
	}
}

/**
 * 1.10.0 で高さのデフォルト値を変更
 */
const blockAttributes5 = {
	...blockAttributes4,
	pc: {
		type: 'number'
	},
	tablet: {
		type: 'number'
	},
	mobile: {
		type: 'number'
	},
}

/**
 * 1.11.0 でナビゲーション設定を追加
 */
const blockAttributes6 = {
	...blockAttributes5,
	navigationPosition: {
		type: 'string',
		default: 'mobile-bottom'
	}
}

/**
 * 1.34.1 で blockID を追加
 */
const blockAttributes7 = {
	...blockAttributes6,
	blockId: {
		type: 'string'
	}
}

/**
 * 1.48.1 で追加された値
 */
const blockAttributes8 = {
	...blockAttributes7,
	slidesPerViewMobile: {
		type: 'number',
		default: 1
	},
	slidesPerViewTablet: {
		type: 'number',
		default: 1
	},
	slidesPerViewPC: {
		type: 'number',
		default: 1
	},
	slidesPerGroup: {
		type: 'string',
		default: 'one-by-one'
	},
}

// 1.51.0 時点から追加された値
 const blockAttributes9 = {
	...blockAttributes8,
	centeredSlides: {
		type: 'boolean',
		default: false
	},
	editorMode: {
		type: 'string',
		default: 'default'
	},
}

// 1.80.1 時点からの変更点
const blockAttributes10 = {
	...blockAttributes9,
	width: {
		type: 'string'
	},
}

/*
// 1.105.0 時点からの変更点
const blockAttributes11 = {
	...blockAttributes10,
	zoomAnimation: {
		type: 'boolean',
		default: false
	},
	zoomInitialScale: {
		type: 'number',
		default: 1
	},
	zoomFinalScal: {
		type: 'number',
		default: 1.25
	},
}
*/

const deprecated = [
	{
		attributes: blockAttributes10,
		save: save1_105_0,
	},
	{
		attributes: blockAttributes9,
		save: save1_80_1,
	},
	{
		attributes: blockAttributes8,
		save: save1_51_0,
	},
	{
		attributes: blockAttributes7,
		save: save1_48_1,
	},
	{
		attributes: blockAttributes6,
		save: save1_34_1,
	},
	{
		attributes: blockAttributes6,
		save: save1_13_1,
	},
	{
		attributes: blockAttributes5,
		save: save1_10_0,
	},
	{
		attributes: blockAttributes4,
		save: save1_9_2,
	},
	{
		attributes: blockAttributes3,
		save: save1_9_1,
	},
	{
		attributes: blockAttributes2,
		save: save1_2_1,
	},
	{
		attributes: blockAttributes,
		save: save1_0_16,
	},
];

export default deprecated;
