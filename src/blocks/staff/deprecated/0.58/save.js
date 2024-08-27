import { NewComponent } from "./component";

export default function save({ attributes }) {
    return (
        <NewComponent
            attributes={attributes}
            setAttributes={''}
            className={''}
            for_={'save'}
        />
    );
}
