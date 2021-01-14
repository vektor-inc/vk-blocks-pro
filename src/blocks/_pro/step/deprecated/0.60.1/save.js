import { Component } from './component';

export default function save({ attributes, className }) {
	return (
		<Component
			attributes={attributes}
			className={className}
			for_={'save'}
		/>
	);
}
