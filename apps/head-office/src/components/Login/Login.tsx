import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '@projects/dropdown';
import CardBody from './LoginCardComponents/CardBody';
import CardFooter from './LoginCardComponents/CardFooter';
import CardHeader from './LoginCardComponents/CardHeader';
import Card from '../Card/Card';
import { BRAND_PREFIX } from '../../constants/constants';
import { setSelectedLanguage } from '../../../app/redux/features/languages';
import { RootState } from '../../../app/redux/store';
import { IDropdownItemProps } from './types';

const Login: React.FC = () => {
    const loginPrefix = `${BRAND_PREFIX}-login`;
    const dispatch = useDispatch();
    const languages: IDropdownItemProps[] = useSelector((state: RootState) => state.languages.languages);

    return (
        <div
            className={`${loginPrefix}-side-container h-screen w-1/4 lg:mx-8 py-4 rounded flex flex-col justify-between`}
        >
            <div className={`${loginPrefix}-language-option-container flex justify-end`}>
                <Dropdown
                    className='border text-text text-sm rounded-lg block w-1/2 p-2.5 focus:ring-primary focus:border-primary'
                    id='languages'
                    items={languages}
                    name='languages'
                    onChange={(event) => dispatch(setSelectedLanguage(Number(event.target.value)))}
                />
            </div>
            <div className={`${loginPrefix}-logo-container`}>
                <Card
                    cardBody={<CardBody />}
                    cardFooter={<CardFooter />}
                    cardHeader={<CardHeader />}
                    className={` p-8 w-full`}
                />
            </div>
            <div className={`${loginPrefix}-footer-container`}>
                <p className={`${loginPrefix}-footer`}></p>
            </div>
        </div>
    );
};

export default Login;
