import { VKBHeading } from './component';

export default function save({ attributes, className }) {
    return (
        <div className={className}>
            <VKBHeading attributes={attributes} for_={"save"} />
        </div>
    );
}
