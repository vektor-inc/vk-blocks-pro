import { Component } from './component';

export default function save({ attributes }) {
	return <Component attributes={attributes} for_={'save'} />;
}
