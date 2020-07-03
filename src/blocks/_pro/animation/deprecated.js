export const deprecated = [
    {
        attributes: {
            effect: {
                type: "string",
                default: "slide-up",
            },
            clientId: {
                type: "string",
                default: "",
            },
        },
        save(props) {
            return (
                <div className={ classNames(`vk_animation vk_animation-${props.attributes.effect} vk_animation-${props.attributes.clientId}`) }>
                    <InnerBlocks.Content />
                </div>
            );
        },
    }
];
