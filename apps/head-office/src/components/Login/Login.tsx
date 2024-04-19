import React from 'react';
import { detectDevice } from '@projects/common';
import CardBody from './LoginCardComponents/CardBody';
import CardFooter from './LoginCardComponents/CardFooter';
import CardHeader from './LoginCardComponents/CardHeader';
import Card from '../Card/Card';

const Login = () => {
    return (
        <Card
            cardHeader={<CardHeader />}
            cardBody={<CardBody />}
            cardFooter={<CardFooter />}
            className={detectDevice().isDesktop ? 'w-1/4' : (detectDevice().isTablet ? 'w-3/4' : 'w-full')}
        />
    );
};

export default Login;
