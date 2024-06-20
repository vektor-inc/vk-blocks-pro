/**
 * WordPress dependencies
 */
import {
	render,
	createRoot,
	useState,
	createContext,
	useEffect,
} from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import '@vkblocks/utils/store';
import '@vkblocks/utils/store/termColor';

import { STORE_NAME } from '@vkblocks/utils/store/constants';
import AdminLicense from '@vkblocks/admin/license';
import AdminBlockCategoryPosition from '@vkblocks/admin/block-category-position';
import AdminBalloon from '@vkblocks/admin/balloon';
import AdminMargin from '@vkblocks/admin/margin';
import AdminLoadSeparate from '@vkblocks/admin/load-separate';
import AdminNewFaq from '@vkblocks/admin/new-faq';
import AdminBreadcrumb from '@vkblocks/admin/breadcrumb';
import BlockManager from '@vkblocks/admin/block-manager';
import AdminCustomFormat from '@vkblocks/admin/custom-format';
import AdminCustomBlockStyle from '@vkblocks/admin/custom-block-style';
import AdminCustomCss from '@vkblocks/admin/custom-css';
import BlockStyleManager from '@vkblocks/admin/block-style-manager';
import AdminImportExport from '@vkblocks/admin/import-export';
import { SaveButton } from '@vkblocks/admin/save-button';
/*globals vkBlocksObject */

export const AdminContext = createContext();

export default function VKBlocksAdmin() {
	const [vkBlocksOption, setVkBlocksOption] = useState();
	const [reloadFlag, setReloadFlag] = useState(false);
	const [isChanged, setIsChanged] = useState(false);

	const storeOptions = useSelect((select) => {
		const { getOptions } = select(STORE_NAME);
		return getOptions().vkBlocksOption;
	}, []);

	useEffect(() => {
		setVkBlocksOption(storeOptions);
	}, [storeOptions]);

	const optionChanged = (value) => {
		setVkBlocksOption(value);
		setIsChanged(true);
	};

	return (
		<>
			{/* AdminContext.Providerで各コンポーネントにvalueを渡す */}
			<AdminContext.Provider
				value={{
					vkBlocksOption: vkBlocksOption ?? vkBlocksObject.options,
					setVkBlocksOption: optionChanged,
					reloadFlag,
					setReloadFlag,
				}}
			>
				{vkBlocksObject.isLicenseSetting && <AdminLicense />}
				<AdminBlockCategoryPosition />
				<AdminBalloon />
				{vkBlocksObject.isPro && <AdminCustomFormat />}
				{vkBlocksObject.isPro && <AdminCustomBlockStyle />}
				<AdminMargin />
				<AdminLoadSeparate />
				{vkBlocksObject.isPro && <AdminNewFaq />}
				{vkBlocksObject.isPro && <AdminBreadcrumb />}
				{vkBlocksObject.isPro && <AdminCustomCss />}
				<BlockManager />
				<BlockStyleManager />
				<SaveButton
					classOption={'sticky'}
					isChanged={isChanged}
					setIsChanged={setIsChanged}
				/>
				<AdminImportExport
					isChanged={isChanged}
					setIsChanged={setIsChanged}
				/>
			</AdminContext.Provider>
		</>
	);
}

// NOTE: ReactDOM.renderが非推奨になったのでフォールバック WP6.1以下をサポートしなくなったら削除すること #1574
const existsCreateRoot = typeof createRoot === 'function';
if (existsCreateRoot) {
	const container = document.getElementById('vk-blocks-admin');
	const root = createRoot(container);
	root.render(<VKBlocksAdmin />);
} else {
	render(<VKBlocksAdmin />, document.getElementById('vk-blocks-admin'));
}
