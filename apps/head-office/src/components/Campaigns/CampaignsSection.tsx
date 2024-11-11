import { Card } from '@projects/card';
import React from 'react';
import Image from 'next/image';

const CampaignsSection: React.FC = () => {
    return (
        <div className='flex '>
            <Card
                BRAND_PREFIX='sh'
                containerClassName="sh-campaigns-section w-1/2 h-full flex justify-center items-center mx-2"
            >
                <div className="sh-campaigns-section-content">
                    <div className="sh-campaigns-section-image-container">
                        <Image
                            src="/Campaign.jpeg"
                            alt="Campaigns"
                            width={750}
                            height={600}
                        />
                    </div>
                    <div className="sh-campaigns-section-text-container">
                        <h2 className="sh-campaigns-section-title">Campaigns</h2>
                        <p className="sh-campaigns-section-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
                        </p>
                    </div>
                </div>
            </Card>

            <Card
                BRAND_PREFIX='sh'
                containerClassName="sh-campaigns-section w-1/2 h-full flex justify-center items-center mx-2"
            >
                <div className="sh-campaigns-section-content">
                    <div className="sh-campaigns-section-image-container">
                        <Image
                            src="/Campaign2.jpeg"
                            alt="Campaigns"
                            width={750}
                            height={600}
                        />
                    </div>
                    <div className="sh-campaigns-section-text-container">
                        <h2 className="sh-campaigns-section-title">Campaigns</h2>
                        <p className="sh-campaigns-section-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CampaignsSection;
