/**
 * WordPress dependencies
 */
import { render, useState, createContext,useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import AdminLicense from '@vkblocks/admin/license';
import AdminBalloon from '@vkblocks/admin/balloon';
import AdminMargin from '@vkblocks/admin/margin';
import AdminLoadSeparate from '@vkblocks/admin/load-separate';
import AdminNewFaq from '@vkblocks/admin/new-faq';
/*globals vkBlocksObject */

export const AdminContext = createContext();

export default function VKBlocksAdmin() {

	const options = useSelect((select) => {
		return select('vk-blocks-pro/options').getOptions();
	}, []);

	const [vkBlocksOption, setVkBlocksOption] = useState(
		
	);
	const [vkBlocksBalloonMeta, setVkBlocksBalloonMeta] = useState(
		vkBlocksObject.balloonMeta
	);
	console.log(options);

	useEffect( () => {
		setVkBlocksOption( options );
	}, [ options ] );

	return (
		<>
			{/* AdminContext.Providerで各コンポーネントにvalueを渡す */}
			{ vkBlocksOption?.vk_blocks_pro_license_key && 
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
			</AdminContext.Provider>
			}
		</>
	);
}
render(<VKBlocksAdmin />, document.getElementById('vk-blocks-admin'));
