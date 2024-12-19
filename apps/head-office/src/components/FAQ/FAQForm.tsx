import {
  IKnowledgeBase,
  IKnowledgeBaseCategory,
} from 'apps/head-office/app/api/services/knowledge,base/knowledgebase.interface';
import { Button } from 'primereact/button';
import { FieldValues } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import useModalManager from '../../hooks/useModalManager';
import BaseInput from '../Base/BaseInput';
import BaseSelect from '../Base/BaseSelect';
import AddFAQCategoryModal from './AddFAQCategoryModal';

interface IFAQFormProps {
  form: FieldValues;
  categories?: IKnowledgeBaseCategory[];
  faqData?: IKnowledgeBase;
  sectionPrefix: string;
}

const FAQForm = ({ form, categories, faqData, sectionPrefix = 'faq' }: IFAQFormProps) => {
  const { openModal } = useModalManager();

  const handleAddCategory = () => {
    openModal('addFAQCategoryModal', <AddFAQCategoryModal />);
  };

  return (
    <div className={`${sectionPrefix}-form-container w-full flex flex-grow flex-col`}>
      <BaseInput
        form={form}
        id={`${sectionPrefix}-question`}
        label="Soru"
        name="question"
        placeholder="Soru"
        type="text"
        rules={{ required: 'Soru boş bırakılamaz' }}
      />
      <BaseInput
        form={form}
        id={`${sectionPrefix}-answer`}
        label="Cevap"
        name="answer"
        placeholder="Cevap"
        type="textarea"
        isTextarea
        containerClassName="h-auto"
        rules={{ required: 'Cevap boş bırakılamaz' }}
      />
      <BaseSelect
        form={form}
        id={`${sectionPrefix}-category`}
        items={categories?.map((category) => ({ name: category.name, value: category.rid })) || []}
        label={'Kategori'}
        name={'category'}
        rules={{ required: 'Kategori boş bırakılamaz' }}
        defaultValue={faqData?.knowledgeBaseCategoryRID}
        value={faqData?.knowledgeBaseCategoryRID}
        labelPrefix={
          <Button
            onClick={handleAddCategory}
            type="button"
            id={`${sectionPrefix}-add-category-button`}
            className=" hover:bg-primary-lighter flex flex-row items-center justify-center p-0"
          >
            <FaPlus className="text-blue-700 text-sm" />
            <span className="text-blue-700 text-sm">Ekle</span>
          </Button>
        }
      />
    </div>
  );
};

export default FAQForm;
