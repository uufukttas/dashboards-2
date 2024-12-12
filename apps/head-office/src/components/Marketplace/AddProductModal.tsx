import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BRAND_PREFIX } from '../../constants/constants';
import BaseInput from '../Base/BaseInput';
import BaseSelect from '../Base/BaseSelect';
import ModalLayout from '../Modal/Layouts/ModalLayout';

const AddProductModal: React.FC = () => {
  const sectionPrefix: string = `${BRAND_PREFIX}-add-product-modal`;
  const [productInfo, setProductInfo] = useState({});
  const form = useForm();

  const handleFormSubmit = () => {
    console.log('Form submitted', productInfo);
  };

  return (
    <ModalLayout className="w-full" id={`${sectionPrefix}-modal`} name={'addProductModal'} title="Ürün Ekle">
      <div className={`${sectionPrefix}-form-container w-full`}>
        <form className={`${sectionPrefix}-form`} onSubmit={form.handleSubmit(handleFormSubmit)}>
          <BaseInput
            form={form}
            id={`${sectionPrefix}-product-name`}
            label="Ürün Adı"
            name="productName"
            placeholder="Ürün Adı"
            type="text"
            onChange={(e) => setProductInfo({ ...productInfo, productName: e.target.value })}
          />
          <BaseInput
            form={form}
            id={`${sectionPrefix}-stock-count`}
            label="Stok Adedi"
            name="stockCount"
            placeholder="Stok Adedi"
            type="number"
            onChange={(e) => setProductInfo({ ...productInfo, productStockCount: e.target.value })}
          />
          <BaseInput
            form={form}
            id={`${sectionPrefix}-product-price`}
            label="Ürün Fiyatı"
            name="productPrice"
            placeholder="Ürün Fiyatı"
            type="number"
            onChange={(e) => setProductInfo({ ...productInfo, productPrice: e.target.value })}
          />
          <BaseInput
            form={form}
            id={`${sectionPrefix}-discount-product-price`}
            label="Ürün İndirimli Fiyatı"
            name="discountProductPrice"
            placeholder="Ürün İndirimli Fiyatı"
            type="number"
            onChange={(e) => setProductInfo({ ...productInfo, productDiscountPrice: e.target.value })}
          />
          <BaseSelect
            containerClassName="py-1"
            form={form}
            defaultValue={1}
            id={`${sectionPrefix}-product-category`}
            items={[
              { label: 'Kategori 1', value: '1' },
              { label: 'Kategori 2', value: '2' },
              { label: 'Kategori 3', value: '3' },
            ]}
            label="Kategori"
            name="productCategory"
            onChange={(e) => setProductInfo({ ...productInfo, productCategory: e.target.value })}
          />
          <BaseSelect
            containerClassName="py-1"
            form={form}
            defaultValue={1}
            id={`${sectionPrefix}-product-badge`}
            items={[
              { label: 'Yeni', value: '1' },
              { label: 'İndirimli', value: '2' },
              { label: 'Son Stoklar', value: '3' },
            ]}
            label="Ürün Rozeti"
            name="productBadge"
            onChange={(e) => setProductInfo({ ...productInfo, productBadge: e.target.value })}
          />
          <BaseInput
            containerClassName="py-2"
            form={form}
            id={`${sectionPrefix}-product-description`}
            isTextarea
            label="Ürün Açıklaması"
            name="productDescription"
            placeholder="Ürün Açıklaması"
            type="textarea"
            onChange={(e) => setProductInfo({ ...productInfo, productDescription: e.target.value })}
          />
          <BaseInput
            containerClassName="py-4"
            form={form}
            id={`${sectionPrefix}-product-image`}
            label="Ürün Resmi"
            name="productImage"
            placeholder="Ürün Resmi"
            type="file"
            onChange={(e) => setProductInfo({ ...productInfo, productImage: e.target.value })}
          />
          <Button
            className={`${BRAND_PREFIX}-button my-8 bg-primary text-primary-font-color rounded-lg text-base font-semibold w-full py-2`}
            id={`${sectionPrefix}-add-button`}
            label="Ürün Ekle"
            rounded
            type="submit"
          />
        </form>
      </div>
    </ModalLayout>
  );
};

export default AddProductModal;
