import compareVersions from 'compare-versions';

import SliderHook0_49_7 from './0.49.7'
import SliderHook0_56_4 from './0.56.4'
import SliderHook0_60_1 from './0.60.1'

const lessThan = (compareVersion) =>{
	// vkbSavedBlockVersion が compareVersion 未満の時 True を返す。
	return compareVersions( compareVersion, window.vkbSavedBlockVersion) > 0
}

export default function deprecatedHooks( el, attributes ){

	if(lessThan("0.49.7")){
		console.log("0.49.7以下")
		// 0.49.7以下
		return <SliderHook0_49_7 attributes={attributes}/>

	} else if ( lessThan('0.56.4') ) {
		console.log("0.56.4以下")
		// 0.56.4以下
		return <SliderHook0_56_4
			el={el}
			attributes={attributes}
		/>
	}else if ( lessThan('1.0.0')) {
		console.log("0.6.1以下")
		//0.6.1以下
		return <SliderHook0_60_1
			el={el}
			attributes={attributes}
		/>
	}　else {
		console.log("1.0.0に変換した後に壊れた時のフォールバック")
		return <SliderHook0_60_1
			el={el}
			attributes={attributes}
		/>
	}
}
