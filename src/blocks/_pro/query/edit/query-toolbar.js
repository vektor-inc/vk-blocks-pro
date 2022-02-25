/**
 * WordPress dependencies
 */
import {
	ToolbarGroup,
	Dropdown,
	ToolbarButton,
	BaseControl,
	TextControl,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { settings, list, grid } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

export default function QueryToolbar({
	attributes: { query, displayLayout },
	setQuery,
	setDisplayLayout,
}) {
	const maxPageInputId = useInstanceId(
		QueryToolbar,
		'blocks-query-pagination-max-page-input'
	);
	const displayLayoutControls = [
		{
			icon: list,
			title: __('List view', 'vk-blocks'),
			onClick: () => setDisplayLayout({ type: 'list' }),
			isActive: displayLayout?.type === 'list',
		},
		{
			icon: grid,
			title: __('Grid view', 'vk-blocks'),
			onClick: () =>
				setDisplayLayout({
					type: 'flex',
					columns: displayLayout?.columns || 3,
				}),
			isActive: displayLayout?.type === 'flex',
		},
	];
	return (
		<>
			{!query.inherit && (
				<ToolbarGroup>
					<Dropdown
						contentClassName="block-library-query-toolbar__popover"
						renderToggle={({ onToggle }) => (
							<ToolbarButton
								icon={settings}
								label={__('Display settings', 'vk-blocks')}
								onClick={onToggle}
							/>
						)}
						renderContent={() => (
							<>
								<BaseControl>
									<TextControl
										label={__(
											'Items per Page',
											'vk-blocks'
										)}
										min={1}
										max={100}
										onChange={(value) => {
											if (
												isNaN(value) ||
												value < 1 ||
												value > 100
											) {
												return;
											}
											setQuery({
												perPage: value,
											});
										}}
										step="1"
										value={query.perPage}
										type={'number'}
									/>
								</BaseControl>
								<BaseControl>
									<TextControl
										label={__('Offset', 'vk-blocks')}
										min={0}
										max={100}
										onChange={(value) => {
											if (
												isNaN(value) ||
												value < 0 ||
												value > 100
											) {
												return;
											}
											setQuery({ offset: value });
										}}
										step="1"
										value={query.offset}
										type={'number'}
									/>
								</BaseControl>
								<BaseControl
									id={maxPageInputId}
									help={__(
										'Limit the pages you want to show, even if the query has more results. To show all pages use 0 (zero).',
										'vk-blocks'
									)}
								>
									<TextControl
										id={maxPageInputId}
										label={__(
											'Max page to show',
											'vk-blocks'
										)}
										min={0}
										onChange={(value) => {
											if (isNaN(value) || value < 0) {
												return;
											}
											setQuery({ pages: value });
										}}
										step="1"
										value={query.pages}
										type={'number'}
									/>
								</BaseControl>
							</>
						)}
					/>
				</ToolbarGroup>
			)}
			<ToolbarGroup controls={displayLayoutControls} />
		</>
	);
}
