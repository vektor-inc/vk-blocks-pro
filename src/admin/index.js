/**
 * WordPress dependencies
 */
import { render, useState, createContext, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import AdminLicense from '@vkblocks/admin/license';
import AdminBalloon from '@vkblocks/admin/balloon';
import AdminMargin from '@vkblocks/admin/margin';
import AdminLoadSeparate from '@vkblocks/admin/load-separate';
import AdminNewFaq from '@vkblocks/admin/new-faq';
import { SaveButton } from '@vkblocks/admin/save-button';
/*globals vkBlocksObject */

export const AdminContext = createContext();

export default function VKBlocksAdmin() {
	const storeVKBlocksOption = useSelect((select) => {
		return select('vk-blocks-pro/options').getVKBlocksOption();
	}, []);

	const storeBalloonMeta = useSelect((select) => {
		return select('vk-blocks-pro/options').getBalloonMeta();
	}, []);

	const [vkBlocksOption, setVkBlocksOption] = useState();
	const [vkBlocksBalloonMeta, setVkBlocksBalloonMeta] = useState();

	useEffect(() => {
		setVkBlocksOption(storeVKBlocksOption);
	}, [storeVKBlocksOption]);

	useEffect(() => {
		setVkBlocksBalloonMeta(storeBalloonMeta);
	}, [storeBalloonMeta]);

	return (
		<>
			{/* AdminContext.Providerで各コンポーネントにvalueを渡す */}

			{vkBlocksOption &&
				vkBlocksBalloonMeta && (
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
						<AdminMargin />
						<AdminLoadSeparate />
						{vkBlocksObject.isPro && <AdminNewFaq />}
						<SaveButton
							classOption={'sticky'}
							vkBlocksOption={vkBlocksOption}
							vkBlocksBalloonMeta={vkBlocksBalloonMeta}
						/>
					</AdminContext.Provider>
				)}
		</>
	);
}
render(<VKBlocksAdmin />, document.getElementById('vk-blocks-admin'));
