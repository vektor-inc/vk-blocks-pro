/**
 * WordPress dependencies
 */
const { useState } = wp.element;
const { parse } = wp.blocks;
const { useDispatch } = wp.data;
/**
 * Internal dependencies
 */
const Button = "./button";
const getDefaultTemplates = "./default-templates";
const Preview = "./preview";

const __experimentalPageTemplatePicker = ({
  templates = getDefaultTemplates()
}) => {
  const { editPost } = useDispatch("core/editor");
  const [templatePreview, setTemplatePreview] = useState();

  const onApply = () => {
    editPost({
      title: templatePreview.name,
      blocks: parse(templatePreview.content)
    });
    setTemplatePreview(undefined);
  };

  return (
    <>
      <div>
        {templates.map(template => (
          <Button
            key={template.name}
            icon={template.icon}
            label={template.name}
            onPress={() => setTemplatePreview(template)}
          />
        ))}
      </div>
      <Preview
        template={templatePreview}
        onDismiss={() => setTemplatePreview(undefined)}
        onApply={onApply}
      />
    </>
  );
};

export default __experimentalPageTemplatePicker;
