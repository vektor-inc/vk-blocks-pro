import SliderHook0_49_7 from './0.49.7'
import SliderHook0_56_4 from './0.56.4'
import SliderHook0_60_1 from './0.60.1'

export default function deprecatedHooks( el, attributes, saveFunName ){

	if("save_0_60_1_save_save" === saveFunName) {

		return <SliderHook0_60_1
			el={el}
			attributes={attributes}
		/>
	}else if("save_0_56_4_save_save" === saveFunName) {
		// 0.56.4
		return <SliderHook0_56_4
			el={el}
			attributes={attributes}
		/>
	}else if("save_0_49_7_save_save" === saveFunName) {

		// 0.49.7
		return <SliderHook0_49_7 attributes={attributes}/>
	}
}
