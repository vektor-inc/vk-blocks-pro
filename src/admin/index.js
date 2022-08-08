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
import AdminTextStyle from '@vkblocks/admin/text-style';
/*globals vkBlocksObject */

export const AdminContext = createContext();

export default function VKBlocksAdmin() {
	const [vkBlocksOption, setVkBlocksOption] = useState(
		vkBlocksObject.options
	);
	const [vkBlocksBalloonMeta, setVkBlocksBalloonMeta] = useState(
		vkBlocksObject.balloonMeta
	);

	return (
		<>
			{/* AdminContext.Providerで各コンポーネントにvalueを渡す */}
			<AdminContext.Provider
				value={{
					vkBlocksOption,
					setVkBlocksOption,
					vkBlocksBalloonMeta,
					setVkBlocksBalloonMeta,
				}}
			>
				{vkBlocksObject.isLicenseSetting && <AdminLicense />}
				<AdminBalloon />
				<AdminTextStyle />
				<AdminMargin />
				<AdminLoadSeparate />
				{vkBlocksObject.isPro && <AdminNewFaq />}
			</AdminContext.Provider>
		</>
	);
}
render(<VKBlocksAdmin />, document.getElementById('vk-blocks-admin'));
