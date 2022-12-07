/**
 * WordPress dependencies
 */
import { render, useState, createContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import AdminLicense from '@vkblocks/admin/license';
import AdminBalloon from '@vkblocks/admin/balloon';
import AdminMargin from '@vkblocks/admin/margin';
import AdminLoadSeparate from '@vkblocks/admin/load-separate';
import AdminNewFaq from '@vkblocks/admin/new-faq';
import AdminCustomFormat from '@vkblocks/admin/custom-format';
import AdminCustomCss from '@vkblocks/admin/custom-css';
import { SaveButton } from '@vkblocks/admin/save-button';
/*globals vkBlocksObject */

export const AdminContext = createContext();

export default function VKBlocksAdmin() {
	const [vkBlocksOption, setVkBlocksOption] = useState(
		vkBlocksObject.options
	);

	return (
		<>
			{/* AdminContext.Providerで各コンポーネントにvalueを渡す */}
			<AdminContext.Provider
				value={{
					vkBlocksOption,
					setVkBlocksOption,
				}}
			>
				{vkBlocksObject.isLicenseSetting && <AdminLicense />}
				<AdminBalloon />
				{vkBlocksObject.isPro && <AdminCustomFormat />}
				<AdminMargin />
				<AdminLoadSeparate />
				{vkBlocksObject.isPro && <AdminNewFaq />}
				{vkBlocksObject.isPro && <AdminCustomCss />}
				<SaveButton
					classOption={'sticky'}
					vkBlocksOption={vkBlocksOption}
				/>
			</AdminContext.Provider>
		</>
	);
}
render(<VKBlocksAdmin />, document.getElementById('vk-blocks-admin'));
