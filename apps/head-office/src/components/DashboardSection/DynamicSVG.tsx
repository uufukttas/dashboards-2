import React, { useState, useEffect } from 'react';

const DynamicSVG = ({ fileName, className }: { fileName: any, className: string }) => {
    const [svgContent, setSvgContent] = useState('');

    // useEffect içerisinde async fonksiyon çağırmak
    useEffect(() => {
        // İç içe bir async fonksiyon tanımlıyoruz
        const loadSVG = async () => {
            try {
                const response = await fetch(`/icons/${fileName}.svg`);
                if (response.ok) {
                    const text = await response.text();
                    setSvgContent(text);  // SVG içeriğini state'e set et
                } else {
                    console.error('SVG not found!');
                }
            } catch (error) {
                console.error('Error loading SVG:', error);
            }
        };

        if (fileName) {
            loadSVG();  // Dosya adı parametresi değiştiğinde SVG'yi yükle
        }
    }, [fileName]);  // Dosya adı değiştiğinde yeniden yükle

    return (
        <div
            className={`${className} svg-icon`}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
};

export default DynamicSVG;
