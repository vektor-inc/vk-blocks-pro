import { ColumnResponsive } from './component';

export default function save({ attributes }) {
	return (
		<div>
			<ColumnResponsive attributes={attributes} for_={'save'} />
		</div>
	);
}
