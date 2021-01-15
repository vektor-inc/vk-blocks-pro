import { faSchema } from '../../../utils/font-awesome';

export const originalSchema = {
	label: {
		type: 'string',
		default: 'Write Caption here ...',
	},
	color: {
		type: 'string',
		default: '#337ab7',
	},
	style: {
		type: 'string',
		default: 'solid',
	},
	styleLine: {
		type: 'string',
		default: 'default',
	},
	dotCaption: {
		type: 'string',
		default: 'STEP',
	},
	dotNum: {
		type: 'number',
		default: 1,
	},
};
const mergeSchema = () => {
	return Object.assign(originalSchema, faSchema);
};
export const schema = mergeSchema();

export const deprecated = [
	{
		attributes: {
			color: {
				type: 'string',
				default: '#337ab7',
			},
			style: {
				type: 'string',
				default: 'solid',
			},
			styleLine: {
				type: 'string',
				default: 'default',
			},
			dotCaption: {
				type: 'string',
				default: 'STEP',
			},
			dotNum: {
				type: 'number',
				default: 1,
			},
		},
		save({ attributes, className }) {
			return (
				<StepItem
					attributes={attributes}
					className={className}
					for_={'save'}
				/>
			);
		},
	},
	{
		attributes: schema,
		save({ attributes, className }) {
			return (
				<Component1
					attributes={attributes}
					className={className}
					for_={'save'}
				/>
			);
		},
	},
	{
		attributes: schema,
		save({ attributes, className }) {
			return (
				<Component
					attributes={attributes}
					className={className}
					for_={'save'}
				/>
			);
		},
	},
];
