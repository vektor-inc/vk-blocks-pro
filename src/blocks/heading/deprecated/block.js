/**
 * heading block type
 *
 */
import {
	schema_0_40_0,
	schemav0_24_1,
	schema,
	schema1,
	schema2,
} from './schema';
import classNames from 'classnames';
import { VKBHeading, VKBHeading2, VKBHeadingV0_24_1 } from './component';
import { VKBHeading_0_39_5 } from './0.39.5/component';
import { VKBHeading_0_40_0 } from './component_0_40_0';
import VKBHeading_0_40_1 from './0.40.1';

const { Component } = wp.element;
import { RichText } from '@wordpress/block-editor';
const { __ } = wp.i18n;

export const Deprecated = [
	VKBHeading_0_40_1,
	{
		attributes: schema_0_40_0,
		save(props) {
			const { attributes } = props;
			return (
				<div id={attributes.anchor}>
					<VKBHeading_0_40_0 {...props} for_={'save'} />
				</div>
			);
		},
	},
	{
		attributes: schema2,
		save(props) {
			const { attributes } = props;
			return (
				<div id={attributes.anchor}>
					<VKBHeading_0_39_5 attributes={attributes} for_={'save'} />
				</div>
			);
		},
	},
];


