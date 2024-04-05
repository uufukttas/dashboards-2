import React from 'react';
import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

const ConnectorAddModal = () => {
    const sectionPrefix = 'connector';

    return (
        <div className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg`}>
            <form
                className={`${BRAND_PREFIX}-add-${sectionPrefix}-form w-full`}
                onSubmit={() => { }}
            >
                <div className={`-container`}>
                    <Label
                        className={`-label block mb-2 text-heading font-semibold`}
                        htmlFor={``}
                        labelText={`Şarj Ünitesi Markası`}
                    >
                        <span className="text-md text-error">*</span>
                    </Label>
                    <Dropdown
                        className={`-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
                        id={``}
                        items={[]}
                        name={``}
                        onChange={(event) => { }}
                        value={``}
                    />
                </div>
            </form>
        </div>
    );
};

export default ConnectorAddModal;
