export const dashboardsData = {
    "total_charge_process_amount": { // Tum zamanlarin toplam sarj tutari
        "title": "Toplam Sarj Islem Tutari", // Sarj islemi basligi
        "value": 10000, // Tum zamanlarin toplam sarj tutar degeri
        "icon_name": "FaChargingStation", // Sarj islemi icin icon adi
        "description": "This is description of this card", // Sarj islemi icin aciklama
        "type": "1 / 1 / 1 / 5",
        "positions": [[1, 4], [1, 1]],
        "graphic_type": "",
    },
    "last_eight_days_ac_dc_sales": {
        "title": "Son 8 Gun AC DC Satışları", // Son 8 gun AC satislari basligi
        "value": [
            { "ac": [{ "1": 100 }, { "2": 200 }, { "3": 300 }, { "4": 400 }, { "5": 500 }, { "6": 600 }, { "7": 700 }, { "8": 800 }] },
            { "dc": [{ "1": 800 }, { "2": 700 }, { "3": 600 }, { "4": 500 }, { "5": 400 }, { "6": 300 }, { "7": 200 }, { "8": 100 }] }
        ],
        // Son 8 gun AC DC satislari
        "icon_name": "", // AC satislari icin icon adi
        "description": "This is description of this card", // AC satislari icin aciklama
        "positions": [1, 2],
        "type": "1 / 5 / 1 / 9",
        "graphic_type": "line",
    },
    "total_customer_count": {
        "title": "Musteri Sayisi", // Musteri sayisi basligi
        "value": 700, // Toplam musteri sayisi
        "icon_name": "HiUserGroup", // Musteri sayisi icin icon adi
        "description": "This is description of this card", // Musteri sayisi icin aciklama
        "type": "1 / 9 / 1 / 13",
    },
    "total_used_kwh": { // Tum zamanlarin toplam kwh tuketimi
        "title": "Toplam Kwh Tuketimi", // Kwh tuketimi basligi
        "value": 10000, // Tum zamanlarin toplam kwh tuketim degeri
        "icon_name": "FaBolt", // Kwh tuketimi icin icon adi
        "description": "This is description of this card", // Kwh tuketimi icin aciklama
        "type": "2 / 1 / 2 / 3",
        "graphic_type": "",
    },
    "total_charge_process_count": { // Tum zamanlarin toplam sarj islemi sayisi
        "title": "Toplam Sarj Islem Sayisi", // Sarj islemi basligi
        "value": 1000, // Tum zamanlarin toplam sarj islem sayisi
        "icon_name": "", // Sarj islemi icin icon adi
        "description": "This is description of this card", // Sarj islemi icin aciklama
        "type": "2 / 3 / 2 / 5",
        "graphic_type": "",
    },
    "payment_method_types": {
        "title": "Odeme Yontemleri", // Odeme yontemleri basligi
        "value": [
            {
                "Kredi Karti (MP)": 100
            }, {
                "Sharz Card": 200
            }, {
                "Apple Pay": 300
            }, {
                "Google Pay": 400
            }, {
                "Paypal": 500
            }
        ], // Odeme yontemleri
        "icon_name": "icon_name", // Odeme yontemleri icin icon adi
        "description": "This is description of this card", // Odeme yontemleri icin aciklama
        "positions": [2, 3],
        "type": "2 / 5 / 4 / 7",
        "graphic_type": "doughnut",
    },
    "ac_dc_sales_ratio": {
        "title": "AC/DC Satış Oranı", // AC/DC satis orani basligi
        "value": [{
            "AC": 100,
        }, { // AC satis orani
            "DC": 200 // DC satis orani
        }], // AC/DC satis orani
        "icon_name": "icon_name", // AC/DC satis orani icin icon adi
        "description": "This is description of this card", // AC/DC satis orani icin aciklama
        "positions": [2, 4],
        "type": " 2 / 7 / 4 / 9",
        "graphic_type": "semi_doughnut",
    },
    "last_three_months_active_customer_count": {
        "title": "Aktif Musteri Sayisi", // Aktif musteri sayisi basligi
        "value": 600, // Aktif musteri sayisi
        "icon_name": "icon_name", // Aktif musteri sayisi icin icon adi
        "description": "This is description of this card", // Aktif musteri sayisi icin aciklama
        "positions": [2, 5],
        "type": "2 / 9 / 2 / 11",
    },
    "inactive_customer_count": {
        "title": "Pasif Musteri Sayisi", // Pasif musteri sayisi basligi
        "value": 100, // Pasif musteri sayisi
        "icon_name": "icon_name", // Pasif musteri sayisi icin icon adi
        "description": "This is description of this card", // Pasif musteri sayisi icin aciklama
        "positions": [2, 6],
        "type": "2 / 11 / 2 / 13",
    },
    "total_cost": {
        "title": "Toplam Maliyet", // Toplam maliyet basligi
        "value": 10000, // Toplam maliyet
        "icon_name": "icon_name", // Toplam maliyet icin icon adi
        "description": "This is description of this card", // Toplam maliyet icin aciklama
        "positions": [2, 7],
        "type": "3 / 1 / 3 / 3",
    },
    "total_earn": {
        "title": "Toplam Kazanc", // Toplam gelir basligi
        "value": 15000, // Toplam gelir
        "icon_name": "icon_name", // Toplam gelir icin icon adi
        "description": "This is description of this card", // Toplam gelir icin aciklama
        "positions": [2, 8],
        "type": "3 / 3 / 3 / 5",
    },
    "last_month_active_customer_count": {
        "title": "Son Ay Aktif Musteri Sayisi", // Son ay aktif musteri sayisi basligi
        "value": 100, // Son ay aktif musteri sayisi
        "icon_name": "icon_name", // Son ay aktif musteri sayisi icin icon adi
        "description": "This is description of this card", // Son ay aktif musteri sayisi icin aciklama
        "positions": [3, 5],
        "type": "3 / 9 / 3 / 11",
    },
    "last_week_active_customer_count": {
        "title": "Son Hafta Aktif Musteri Sayisi", // Son hafta aktif musteri sayisi basligi
        "value": 50, // Son hafta aktif musteri sayisi
        "icon_name": "icon_name", // Son hafta aktif musteri sayisi icin icon adi
        "description": "This is description of this card", // Son hafta aktif musteri sayisi icin aciklama
        "positions": [3, 6],
        "type": "3 / 11 / 3 / 13",
    },
    "connector": {
        "title": "Connector", // Connector basligi
        "value": "450",
        "icon_name": "icon_name", // Connector icin icon adi
        "description": "This is description of this card", // Connector icin aciklama
        "positions": [3, 1],
        "type": "4 / 1 / 4 / 5",
    },
    "ac_status": {
        "title": "AC Durumu", // AC durumu basligi
        "value": [{
            "available": 10, // DC connectorlerden bos olanlarin sayisi
        }, {
            "busy": 20,
        }, {
            "fault": 5
        }, {
            "maintenance": 5
        }],
        "icon_name": "icon_name", // AC durumu icin icon adi
        "description": "This is description of this card", // AC durumu icin aciklama
        "positions": [4, 1],
        "type": "5 / 1 / 5 / 3",
        "graphic_type": "pie",
    },
    "dc_status": {
        "title": "DC Durumu", // AC durumu basligi
        "value": [{
            "available": 10, // DC connectorlerden bos olanlarin sayisi
        }, {
            "busy": 20,
        }, {
            "fault": 5
        }, {
            "maintenance": 5
        }],
        "icon_name": "icon_name", // AC durumu icin icon adi
        "description": "This is description of this card", // AC durumu icin aciklama
        "positions": [4, 1],
        "type": "5 / 3 / 5 / 5",
        "graphic_type": "pie",
    },
    "locations": {
        "title": "Lokasyonlar", // Lokasyonlar basligi
        "value": [],
        "icon_name": "icon_name", // Lokasyon islemi icin icon adi
        "description": "This is description of this card", // Lokasyon islemi icin aciklama
        "positions": [3, 2],
        "type": "4 / 5 / 6 / 13",
        "graphic_type": "map",
    },
    /*
    "daily_income": {
        "today": [
            {
                "0": 0
            },
            {
                "1": 100
            },
            {
                "2": 0
            },
            {
                "3": 0
            },
            {
                "4": 0
            },
            {
                "5": 0
            },
            {
                "6": 0
            },
            {
                "7": 0
            },
            {
                "8": 0
            },
            {
                "9": 0
            },
            {
                "10": 0
            },
            {
                "11": 0
            },
            {
                "12": 0
            },
            {
                "13": 0
            },
            {
                "14": 0
            },
            {
                "15": 0
            },
            {
                "16": 0
            },
            {
                "17": 0
            },
            {
                "18": 0
            },
            {
                "19": 0
            },
            {
                "20": 0
            },
            {
                "21": 0
            },
            {
                "22": 0
            },
            {
                "23": 0
            }
        ],
        "last_week": [
            {
                "0": 0
            },
            {
                "1": 100
            },
            {
                "2": 0
            },
            {
                "3": 0
            },
            {
                "4": 0
            },
            {
                "5": 0
            },
            {
                "6": 0
            },
            {
                "7": 0
            },
            {
                "8": 0
            },
            {
                "9": 0
            },
            {
                "10": 0
            },
            {
                "11": 0
            },
            {
                "12": 0
            },
            {
                "13": 0
            },
            {
                "14": 0
            },
            {
                "15": 0
            },
            {
                "16": 0
            },
            {
                "17": 0
            },
            {
                "18": 0
            },
            {
                "19": 0
            },
            {
                "20": 0
            },
            {
                "21": 0
            },
            {
                "22": 0
            },
            {
                "23": 0
            }
        ],
        "total_today": 100, // Bugun toplam kazanc
        "total_last_week": 100, // Gecen hafta bugun toplam kazanc
        "icon_name": "icon_name", // Kazanc islemi icin icon adi
        "description": "This is description of this card", // Kazanc islemi icin aciklama
        "positions": [3, 1],
        "type": "w-1/3",
    },
    "daily_kwh_usage": {
        "today": [
            {
                "0": 0
            },
            {
                "1": 100
            },
            {
                "2": 0
            },
            {
                "3": 0
            },
            {
                "4": 0
            },
            {
                "5": 0
            },
            {
                "6": 0
            },
            {
                "7": 0
            },
            {
                "8": 0
            },
            {
                "9": 0
            },
            {
                "10": 0
            },
            {
                "11": 0
            },
            {
                "12": 0
            },
            {
                "13": 0
            },
            {
                "14": 0
            },
            {
                "15": 0
            },
            {
                "16": 0
            },
            {
                "17": 0
            },
            {
                "18": 0
            },
            {
                "19": 0
            },
            {
                "20": 0
            },
            {
                "21": 0
            },
            {
                "22": 0
            },
            {
                "23": 0
            }
        ],
        "last_week": [
            {
                "0": 0
            },
            {
                "1": 100
            },
            {
                "2": 0
            },
            {
                "3": 0
            },
            {
                "4": 0
            },
            {
                "5": 0
            },
            {
                "6": 0
            },
            {
                "7": 0
            },
            {
                "8": 0
            },
            {
                "9": 0
            },
            {
                "10": 0
            },
            {
                "11": 0
            },
            {
                "12": 0
            },
            {
                "13": 0
            },
            {
                "14": 0
            },
            {
                "15": 0
            },
            {
                "16": 0
            },
            {
                "17": 0
            },
            {
                "18": 0
            },
            {
                "19": 0
            },
            {
                "20": 0
            },
            {
                "21": 0
            },
            {
                "22": 0
            },
            {
                "23": 0
            }
        ],
        "total_today": 100, // Bugun toplam kwh tuketimi
        "total_last_week": 100, // Gecen hafta bugun toplam kwh tuketimi
        "icon_name": "icon_name", // Kwh tuketimi islemi icin icon adi
        "description": "This is description of this card", // Kwh tuketimi islemi icin aciklama
        "positions": [3, 1],
        "type": "w-1/3",
    },
    "monthly_income": {
        "month": [
            {
                "1": 0
            },
            {
                "2": 100
            },
            {
                "3": 0
            },
            {
                "4": 0
            },
            {
                "5": 0
            },
            {
                "6": 0
            },
            {
                "7": 0
            },
            {
                "8": 0
            },
            {
                "9": 0
            },
            {
                "10": 0
            },
            {
                "11": 0
            },
            {
                "12": 0
            },
            {
                "13": 0
            },
            {
                "14": 0
            },
            {
                "15": 0
            },
            {
                "16": 0
            },
            {
                "17": 0
            },
            {
                "18": 0
            },
            {
                "19": 0
            },
            {
                "20": 0
            },
            {
                "21": 0
            },
            {
                "22": 0
            },
            {
                "23": 0
            },
            {
                "24": 0
            },
            {
                "25": 0
            },
            {
                "26": 0
            },
            {
                "27": 0
            },
            {
                "28": 0
            },
            {
                "29": 0
            },
            {
                "30": 0
            },
            {
                "31": 0
            }
        ],
        "last_month": [
            {
                "1": 0
            },
            {
                "2": 100
            },
            {
                "3": 0
            },
            {
                "4": 0
            },
            {
                "5": 0
            },
            {
                "6": 0
            },
            {
                "7": 0
            },
            {
                "8": 0
            },
            {
                "9": 0
            },
            {
                "10": 0
            },
            {
                "11": 0
            },
            {
                "12": 0
            },
            {
                "13": 0
            }
        ],
        "total_month": 100, // Bu ay toplam kazanc
        "total_last_month": 100, // Gecen ay toplam kazanc
        "icon_name": "icon_name", // Aylik kazanc islemi icin icon adi
        "description": "This is description of this card", // Aylik kazanc islemi icin aciklama
        "positions": [3, 2],
        "type": "w-1/3",
    },
    "monthly_kwh_usage": {
        "month": [
            {
                "1": 0
            },
            {
                "2": 100
            },
            {
                "3": 0
            },
            {
                "4": 0
            },
            {
                "5": 0
            },
            {
                "6": 0
            },
            {
                "7": 0
            },
            {
                "8": 0
            },
            {
                "9": 0
            },
            {
                "10": 0
            },
            {
                "11": 0
            },
            {
                "12": 0
            },
            {
                "13": 0
            },
            {
                "14": 0
            },
            {
                "15": 0
            },
            {
                "16": 0
            },
            {
                "17": 0
            },
            {
                "18": 0
            },
            {
                "19": 0
            },
            {
                "20": 0
            },
            {
                "21": 0
            },
            {
                "22": 0
            },
            {
                "23": 0
            },
            {
                "24": 0
            },
            {
                "25": 0
            },
            {
                "26": 0
            },
            {
                "27": 0
            },
            {
                "28": 0
            },
            {
                "29": 0
            },
            {
                "30": 0
            },
            {
                "31": 0
            }
        ],
        "last_month": [
            {
                "1": 0
            },
            {
                "2": 100
            },
            {
                "3": 0
            },
            {
                "4": 0
            },
            {
                "5": 0
            },
            {
                "6": 0
            },
            {
                "7": 0
            },
            {
                "8": 0
            },
            {
                "9": 0
            },
            {
                "10": 0
            },
            {
                "11": 0
            },
            {
                "12": 0
            },
            {
                "13": 0
            }
        ],
        "total_month": 100, // Bu ay toplam kwh tuketimi
        "total_last_month": 100, // Gecen ay toplam kwh tuketimi
        "icon_name": "icon_name", // Aylik kwh tuketimi islemi icin icon adi
        "description": "This is description of this card", // Aylik kwh tuketimi islemi icin aciklama
        "positions": [3, 2],
        "type": "w-1/3",
    },
    "yearly_income": {
        "year": [
            {
                "1": 0
            },
            {
                "2": 100
            },
            {
                "3": 0
            },
            {
                "4": 0
            },
            {
                "5": 0
            },
            {
                "6": 0
            },
            {
                "7": 0
            },
            {
                "8": 0
            },
            {
                "9": 0
            },
            {
                "10": 0
            },
            {
                "11": 0
            },
            {
                "12": 0
            }
        ],
        "last_year": [
            {
                "1": 0
            },
            {
                "2": 100
            },
            {
                "3": 0
            },
            {
                "4": 0
            },
            {
                "5": 0
            },
            {
                "6": 0
            },
            {
                "7": 0
            },
            {
                "8": 0
            },
            {
                "9": 0
            },
            {
                "10": 0
            },
            {
                "11": 0
            },
            {
                "12": 0
            }
        ],
        "total_year": 100, // Bu yil toplam kazanc
        "total_last_year": 100, // Gecen yil toplam kazanc
        "icon_name": "icon_name", // Yillik kazanc islemi icin icon adi
        "description": "This is description of this card", // Yillik kazanc islemi icin aciklama
        "positions": [3, 3],
        "type": "w-1/3",
    },
    "yearly_kwh_usage": {
        "year": [
            {
                "1": 0
            },
            {
                "2": 100
            },
            {
                "3": 0
            },
            {
                "4": 0
            },
            {
                "5": 0
            },
            {
                "6": 0
            },
            {
                "7": 0
            },
            {
                "8": 0
            },
            {
                "9": 0
            },
            {
                "10": 0
            },
            {
                "11": 0
            },
            {
                "12": 0
            }
        ],
        "last_year": [
            {
                "1": 0
            },
            {
                "2": 100
            },
            {
                "3": 0
            },
            {
                "4": 0
            },
            {
                "5": 0
            },
            {
                "6": 0
            },
            {
                "7": 0
            },
            {
                "8": 0
            },
            {
                "9": 0
            },
            {
                "10": 0
            },
            {
                "11": 0
            },
            {
                "12": 0
            }
        ],
        "total_year": 100, // Bu yil toplam kwh tuketimi
        "total_last_year": 100, // Gecen yil toplam kwh tuketimi
        "icon_name": "icon_name", // Yillik kwh tuketimi islemi icin icon adi
        "description": "This is description of this card", // Yillik kwh tuketimi islemi icin aciklama
        "positions": [3, 3],
        "type": "w-1/3",
    },
    "monthly_total": {
        "08-2023": {
            "amount": 350190,
            "charge_count": 4931,
            "kwh": 93815,
            "service_fee": 143646
        },
        "09-2023": {
            "amount": 350190,
            "charge_count": 4931,
            "kwh": 93815,
            "service_fee": 143646
        },
        "10-2023": {
            "amount": 350190,
            "charge_count": 4931,
            "kwh": 93815,
            "service_fee": 143646
        },
        "11-2023": {
            "amount": 350190,
            "charge_count": 4931,
            "kwh": 93815,
            "service_fee": 143646
        },
        "12-2023": {
            "amount": 350190,
            "charge_count": 4931,
            "kwh": 93815,
            "service_fee": 143646
        },
        "01-2024": {
            "amount": 350190,
            "charge_count": 4931,
            "kwh": 93815,
            "service_fee": 143646
        },
        "02-2024": {
            "amount": 350190,
            "charge_count": 4931,
            "kwh": 93815,
            "service_fee": 143646
        },
        "03-2024": {
            "amount": 350190,
            "charge_count": 4931,
            "kwh": 93815,
            "service_fee": 143646
        },
        "04-2024": {
            "amount": 350190,
            "charge_count": 4931,
            "kwh": 93815,
            "service_fee": 143646
        },
        "05-2024": {
            "amount": 350190,
            "charge_count": 4931,
            "kwh": 93815,
            "service_fee": 143646
        },
        "06-2024": {
            "amount": 350190,
            "charge_count": 4931,
            "kwh": 93815,
            "service_fee": 143646
        },
        "07-2024": {
            "amount": 350190,
            "charge_count": 4931,
            "kwh": 93815,
            "service_fee": 143646
        },
        "08-2024": {
            "amount": 350190,
            "charge_count": 4931,
            "kwh": 93815,
            "service_fee": 143646
        },
        "icon_name": "icon_name", // Aylik toplam islemi icin icon adi
        "description": "This is description of this card", // Aylik toplam islemi icin aciklama
        "positions": [4, 1],
        "type": "w-full",
    },
    "most_used_locations": {
        "locations": [{
            "location_name": "Location 1",
            "count": 25
        },
        {
            "location_name": "Location 2",
            "count": 20
        },
        {
            "location_name": "Location 3",
            "count": 15
        },
        {
            "location_name": "Location 4",
            "count": 10
        },
        {
            "location_name": "Location 5",
            "count": 5
        },
        ],
        "icon_name": "icon_name", // Aylik toplam islemi icin icon adi
        "description": "This is description of this card", // Aylik toplam islemi icin aciklama
        "positions": [5, 1],
        "type": "w-1/3"
    },
    "most_charging_users": {
        "users": [
            {
                "user_name": "User 1",
                "count": 25
            },
            {
                "user_name": "User 2",
                "count": 20
            },
            {
                "user_name": "User 3",
                "count": 15
            },
            {
                "user_name": "User 4",
                "count": 10
            },
            {
                "user_name": "User 5",
                "count": 5
            }
        ],
        "icon_name": "icon_name", // Aylik toplam islemi icin icon adi
        "description": "This is description of this card", // Aylik toplam islemi icin aciklama
        "positions": [5, 2],
        "type": "w-1/3"
    },
    "most_payment_types": {
        "payment_types": [
            {
                "payment_type": "Credit Card",
                "count": 25
            },
            {
                "payment_type": "Sharz Card",
                "count": 20
            },
            {
                "payment_type": "Apple Pay",
                "count": 15
            },
            {
                "payment_type": "Google Pay",
                "count": 10
            },
            {
                "payment_type": "Paypal",
                "count": 5
            }
        ],
        "icon_name": "icon_name", // Aylik toplam islemi icin icon adi
        "description": "This is description of this card", // Aylik toplam islemi icin aciklama
        "positions": [5, 3],
        "type": "w-1/3"
    },
    */
};
