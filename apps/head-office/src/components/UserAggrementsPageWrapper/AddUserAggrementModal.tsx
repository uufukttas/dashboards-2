import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddNewAggrementMutation } from '../../../app/api/services/user-aggrements/userAggrement.service';
import useModalManager from '../../hooks/useModalManager';
import BaseInput from '../Base/BaseInput';
import ModalLayout from '../Modal/Layouts/ModalLayout';
import { IModalLayoutButtonProps } from '../Modal/Layouts/ModalLayout.interface';

interface FormValues {
  Title: string;
  ConfirmMessage: string;
  PdfFile: FileList;
}

const AddUserAggrementModal = () => {
  const form = useForm<FormValues>();
  const [addNewAggrement] = useAddNewAggrementMutation();
  const { closeModal } = useModalManager();
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files ? event.target.files[0] : null;

    setPdfFile(file);
  };

  const handleAddNewAggrement = async () => {
    const data = form.getValues();

    const formData = new FormData();

    formData.append('UserAgreementTypeRID', '1');
    formData.append('Title', data.Title);
    formData.append('ConfirmMessage', data.ConfirmMessage);

    pdfFile && formData.append('PdfFile', pdfFile);

    // @ts-expect-error
    addNewAggrement({ body: formData })
      .unwrap()
      .then(() => {
        closeModal('addUserAggrementModal');
      });
  };

  const buttons: IModalLayoutButtonProps[] = [
    {
      key: 'addUserAggrementModal',
      label: 'Kaydet',
      buttonClassName: 'w-32',
      onClick: form.handleSubmit(handleAddNewAggrement),
    },
  ];

  return (
    <ModalLayout name="addUserAggrementModal" title="Kullanıcı Sözleşmesi Ekle" buttons={buttons} footerVisible>
      <div className="w-full flex flex-col gap-4">
        <BaseInput form={form} name="Title" id="Title" label="Title" placeholder="Başlık" rules={{ required: true }} />
        <BaseInput
          form={form}
          name="ConfirmMessage"
          id="ConfirmMessage"
          label="Onay Mesajı"
          placeholder="Onay Mesajı"
          rules={{ required: true }}
        />
        <BaseInput
          form={form}
          name="PdfFile"
          id="PdfFile"
          label="Pdf Dosyası"
          placeholder="Pdf Dosyası"
          type="file"
          accept=".pdf"
          rules={{ required: true }}
          onChange={handleFileChange}
        />
      </div>
    </ModalLayout>
  );
};

export default AddUserAggrementModal;
