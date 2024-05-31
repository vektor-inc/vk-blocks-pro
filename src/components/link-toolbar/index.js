import { useState } from 'react';
import { ToolbarButton, Dropdown, CheckboxControl, Button } from '@wordpress/components';
import { URLInput } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { link, linkOff, keyboardReturn } from '@wordpress/icons';

const LinkToolbar = ({ linkUrl, setLinkUrl, linkTarget, setLinkTarget }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        if (!isOpen) {
            setIsOpen(true);
        } else {
            if (linkUrl === '') {
                setIsOpen(false);
            }
        }
    };

    return (
        <Dropdown
            popoverProps={{ placement: 'bottom-start' }}
            renderToggle={({ isOpen, onToggle }) => {
                const setLink = () => {
                    handleToggle();
                    onToggle();
                };
                return (
                    <ToolbarButton
                        aria-expanded={isOpen}
                        icon={isOpen ? linkOff : link}
                        isActive={isOpen}
                        label={isOpen ? __('Unlink') : __('Input Link URL', 'vk-blocks-pro')}
                        onClick={setLink}
                    />
                );
            }}
            renderContent={({ onClose }) => (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onClose();
                    }}
                >
                    <div className="vk-block-editor-url-input-wrapper">
                        <URLInput
                            __nextHasNoMarginBottom
                            value={linkUrl}
                            onChange={(value) => setLinkUrl(value)}
                        />
                        <Button
                            icon={keyboardReturn}
                            label={__('Submit')}
                            type="submit"
                        />
                    </div>
                    <CheckboxControl
                        label={__('Open link new tab.', 'vk-blocks-pro')}
                        checked={linkTarget === '_blank'}
                        onChange={(checked) => setLinkTarget(checked ? '_blank' : '')}
                    />
                </form>
            )}
        />
    );
};

export default LinkToolbar;
