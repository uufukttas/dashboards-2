import { Card } from '@projects/card';
import Image from 'next/image';
import React from 'react';

const CampaignsSection: React.FC = () => {
    return (
        <div className='flex'>
            <Card
                BRAND_PREFIX='sh'
                containerClassName="sh-campaigns-section w-1/2 h-full flex justify-center items-center mx-2"
            >
                <div className="sh-campaigns-section-content">
                    <div className="sh-campaigns-section-image-container">
                        <Image
                            src="/Cilgin_Kasim.jpeg"
                            alt="Campaigns"
                            width={750}
                            height={600}
                        />
                    </div>
                    <div className="sh-campaigns-section-text-container">
                        <p className="sh-campaigns-section-description p-4">
                            <span className='text-bold '>⚡Çılgın Kasım İndirimleri Başladı!⚡</span><br/>
                            Elektrikli araç sahipleri için yılın fırsatını kaçırmayın:
                            Circontrol E Home 650 €yerine sadece 499 €!
                            Kampanya 01.01.2025 tarihine kadar geçerlidir!
                            Stoklarla sınırlıdır, fırsatı kaçırmadan hemen sipariş verin.
                            <span>#ÇılgınKasım #SharzNet #ElektrikliAraç #EVŞarjİstasyonu #YılSonuKampanyası #SürdürülebilirGelecek #EVMobility #İndirim</span>
                        </p>
                    </div>
                </div>
            </Card>
            <Card
                BRAND_PREFIX='sh'
                containerClassName="sh-campaigns-section w-1/2 h-auto flex justify-center items-center mx-2"
            >
                <div className="sh-campaigns-section-content h-full">
                    <div className="sh-campaigns-section-image-container">
                        <Image
                            src="/duyuru.jpeg"
                            alt="Duyuru"
                            width={750}
                            height={600}
                        />
                    </div>
                    <div className="sh-campaigns-section-text-container">
                        <p className="sh-campaigns-section-description p-4">
                            Geleceğin e-mobilite çözümlerini keşfetmeniz için sizleri de standımızda görmekten mutluluk duyarız.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CampaignsSection;
