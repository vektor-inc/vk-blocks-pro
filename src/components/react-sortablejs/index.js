/**
 * External dependencies
 */
import classnames from 'classnames';
import { ReactSortable } from 'react-sortablejs';

// https://github.com/SortableJS/Sortable#options
// https://github.com/SortableJS/react-sortablejs

export const ReactSortableJs = (props) => {
	const {
		className,
		list,
		setList,
		animation = 200,
		delay = 2,
		handle,
		children,
	} = props;

	return (
		<ReactSortable
			className={classnames(`vk-react-sortable-js`, className)}
			list={list}
			setList={setList}
			animation={animation}
			delay={delay}
			handle={handle}
		>
			{children}
		</ReactSortable>
	);
};
