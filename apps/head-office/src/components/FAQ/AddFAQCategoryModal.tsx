import { useForm } from 'react-hook-form';
import { useAddNewKnowledgeBaseCategoryMutation } from '../../../app/api/services/knowledge,base/knowledgebase.service';
import useModalManager from '../../hooks/useModalManager';
import BaseInput from '../Base/BaseInput';
import ModalLayout from '../Modal/Layouts/ModalLayout';
import { IModalLayoutButtonProps } from '../Modal/Layouts/ModalLayout.interface';

const AddFAQCategoryModal = () => {
  const form = useForm();
  const [addNewKnowledgeBaseCategory] = useAddNewKnowledgeBaseCategoryMutation();
  const { closeModal } = useModalManager();

  const handleAddCategory = (data: Record<string, string>) => {
    addNewKnowledgeBaseCategory({
      body: {
        name: data.name,
        description: data.description,
      },
    })
      .unwrap()
      .then(() => {
        closeModal('addFAQCategoryModal');
      });
  };

  const buttons: IModalLayoutButtonProps[] = [
    {
      key: 'add-faq-category-button',
      label: 'Kategori Ekle',
      onClick: form.handleSubmit(handleAddCategory),
    },
  ];

  return (
    <ModalLayout
      className="w-full"
      id={'addFAQCategoryModal'}
      key={'addFAQCategoryModal'}
      name={'AddFAQCategoryModal'}
      title="Kategori Ekle"
      buttons={buttons}
      footerVisible
    >
      <div className={`add-faq-category-form-container w-full`}>
        <BaseInput
          form={form}
          id={`add-faq-category-name`}
          label="Kategori Adı"
          name="name"
          placeholder="Kategori Adı"
          type="text"
          rules={{ required: 'Kategori adı boş bırakılamaz' }}
        />
        <BaseInput
          form={form}
          id={`add-faq-category-description`}
          label="Kategori Açıklaması"
          name="description"
          placeholder="Kategori Açıklaması"
          type="text"
        />
      </div>
    </ModalLayout>
  );
};

export default AddFAQCategoryModal;
