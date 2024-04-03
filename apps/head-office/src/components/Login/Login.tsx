import React from 'react';
import { detectDevice } from '@projects/common';
import CardBody from './LoginCardComponents/CardBody';
import CardFooter from './LoginCardComponents/CardFooter';
import CardHeader from './LoginCardComponents/CardHeader';
import Card from '../Card/Card';

const Login = () => {
    const cardContent = {
        header: <CardHeader />,
        body: <CardBody />,
        footer: <CardFooter />,
    };

    return (
        <Card
            cardContent={cardContent}
            className={detectDevice().isDesktop ? 'w-1/4' : (detectDevice().isTablet ? 'w-3/4' : 'w-full')}
        />
    );
};

export default Login;
