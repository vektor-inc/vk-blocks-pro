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
import BlockManager from '@vkblocks/admin/block-manager';
import AdminCustomFormat from '@vkblocks/admin/custom-format';
import AdminCustomBlockStyle from '@vkblocks/admin/custom-block-style';
import AdminCustomCss from '@vkblocks/admin/custom-css';
import { SaveButton } from '@vkblocks/admin/save-button';
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
				{vkBlocksObject.isPro && <AdminCustomFormat />}
				{vkBlocksObject.isPro && <AdminCustomBlockStyle />}
				<AdminMargin />
				<AdminLoadSeparate />
				{vkBlocksObject.isPro && <AdminNewFaq />}
				{vkBlocksObject.isPro && <AdminCustomCss />}
				<BlockManager />
				<SaveButton
					classOption={'sticky'}
					vkBlocksOption={vkBlocksOption}
					vkBlocksBalloonMeta={vkBlocksBalloonMeta}
				/>
			</AdminContext.Provider>
		</>
	);
}
render(<VKBlocksAdmin />, document.getElementById('vk-blocks-admin'));
