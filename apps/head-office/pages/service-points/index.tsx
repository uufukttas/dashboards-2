import React from 'react';
import Head from 'next/head';
import ProviderComponent from './ProviderComponent';
import '../../app/global.css';
import '../../src/styles/style.css';

export default function ServicePoints({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Head>
                <title>Service Points | Sharz.net</title>
            </Head>
            <ProviderComponent>
                {children}
            </ProviderComponent >
        </>
    )
};
