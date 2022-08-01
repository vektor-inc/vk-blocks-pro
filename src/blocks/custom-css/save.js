export default function save({ attributes }) {
	const { content } = attributes;

	return <style>{content}</style>;
}
