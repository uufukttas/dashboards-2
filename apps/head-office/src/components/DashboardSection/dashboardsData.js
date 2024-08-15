export const dashboardsData = {
    "total_charge_process_amount": {
        "title": "Toplam Sarj Islem Tutari",
        "value": 10000, // Tum zamanlarin total islem tutari
        "icon_name": "FaChargingStation",
        "description": "This is description of this card",
        "position": "1 / 1 / 1 / 5",
        "type": "",
    },
    "last_eight_days_ac_dc_sales": {
        "title": "Son 8 Gun AC DC Satışları",
        "value": [
            { "ac": [{ "1": 100 }, { "2": 300 }, { "3": 200 }, { "4": 250 }, { "5": 150 }, { "6": 220 }, { "7": 400 }, { "8": 250 }] },
            { "dc": [{ "1": 300 }, { "2": 250 }, { "3": 350 }, { "4": 400 }, { "5": 200 }, { "6": 300 }, { "7": 450 }, { "8": 100 }] }
        ], // Son 8 gunluk AC ve DC satis tutarlari
        "icon_name": "",
        "description": "This is description of this card",
        "position": "1 / 5 / 1 / 9",
        "type": "line",
    },
    "total_customer_count": {
        "title": "Musteri Sayisi",
        "value": 700, // Tum zamanlarin toplam musteri sayisi
        "icon_name": "HiUserGroup",
        "description": "This is description of this card",
        "position": "1 / 9 / 1 / 13",
        "type": "",
    },
    "total_used_kwh": {
        "title": "Toplam Kwh Tuketimi",
        "value": 10000, // Tum zamanlarin toplam kwh tuketimi
        "icon_name": "FaBolt",
        "description": "This is description of this card",
        "position": "2 / 1 / 2 / 3",
        "type": "",
    },
    "total_charge_process_count": {
        "title": "Toplam Sarj Islem Sayisi",
        "value": 1000, // Tum zamanlarin toplam islem sayisi
        "icon_name": "",
        "description": "This is description of this card",
        "position": "2 / 3 / 2 / 5",
        "type": "",
    },
    "payment_method_types": {
        "title": "Odeme Yontemleri",
        "value": [
            {
                "Kredi Karti (MP)": 100
            }, {
                "Sharz Card": 200
            }, {
                "Fleet / Wallet": 300
            }
        ], // Tum zamanlarin odeme yontemlerine gore islem sayisi
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "2 / 5 / 4 / 7",
        "type": "doughnut",
    },
    "ac_dc_sales": {
        "title": "AC/DC Satış Tutarlari",
        "value": [{
            "AC": 100,
        }, {
            "DC": 200
        }], // Tum zamanlarin AC ve DC satis tutarlari
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": " 2 / 7 / 4 / 9",
        "type": "semi_doughnut",
    },
    "last_three_months_active_customer_count": {
        "title": "Aktif Musteri Sayisi",
        "value": 600, // Son 3 ayin toplam aktif musteri sayisi
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "2 / 9 / 2 / 11",
        "type": "",
    },
    "inactive_customer_count": {
        "title": "Pasif Musteri Sayisi",
        "value": 100, // Tum zamanlarin toplam pasif musteri sayisi
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "2 / 11 / 2 / 13",
        "type": "",
    },
    "total_cost": {
        "title": "Toplam Maliyet",
        "value": 10000, // Tum zamanlarin toplam maliyeti
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "3 / 1 / 3 / 3",
        "type": "",
    },
    "total_earn": {
        "title": "Toplam Kazanc",
        "value": 15000, // Tum zamanlarin toplam kazanci
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "3 / 3 / 3 / 5",
        "type": "",
    },
    "last_month_active_customer_count": {
        "title": "Son Ay Aktif Musteri Sayisi",
        "value": 100, // Son ayin toplam aktif musteri sayisi
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "3 / 9 / 3 / 11",
        "type": "",
    },
    "last_week_active_customer_count": {
        "title": "Son Hafta Aktif Musteri Sayisi",
        "value": 50, // Son haftanin toplam aktif musteri sayisi
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "3 / 11 / 3 / 13",
        "type": "",
    },
    "connector": {
        "title": "Konnektor",
        "value": 450, // Toplam konnektor sayisi
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "4 / 1 / 4 / 5",
        "type": "",
    },
    "ac_status": {
        "title": "AC Durumu",
        "value": [{
            "available": 10,
        }, {
            "busy": 20,
        }, {
            "fault": 5
        }, {
            "maintenance": 5
        }], // AC Cihazlarin durumlarina gore sayilari
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "5 / 1 / 5 / 3",
        "type": "pie",
    },
    "dc_status": {
        "title": "DC Durumu",
        "value": [{
            "available": 10,
        }, {
            "busy": 20,
        }, {
            "fault": 5
        }, {
            "maintenance": 5
        }], // DC Cihazlarin durumlarina gore sayilari
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "5 / 3 / 5 / 5",
        "type": "pie",
    },
    "locations": {
        "title": "Lokasyonlar",
        "value": [{
            lat: 39.92504,
            lng: 32.83709
        }, {
            lat: 37.92504,
            lng: 27.83709
        }], // Kullanicinin sahip oldugu lokasyonlarin koordinatlari
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "4 / 5 / 6 / 13",
        "type": "map",
    },
    "daily_income": {
        "title": "Günlük Kazanç",
        "value": [
            { "today": [{ "00": 100 }, { "01": 300 }, { "02": 200 }, { "03": 250 }, { "04": 150 }, { "05": 220 }, { "06": 400 }, { "07": 250 }, { "08": 100 }, { "09": 100 }, { "10": 300 }, { "11": 200 }, { "12": 250 }, { "13": 150 }, { "14": 220 }, { "15": 400 }, { "16": 250 }, { "17": 100 }, { "18": 100 }, { "19": 300 }, { "20": 200 }, { "21": 250 }, { "22": 150 }, { "23": 220 }] },
            { "last_week_today": [{ "00": 100 }, { "01": 300 }, { "02": 250 }, { "03": 350 }, { "04": 400 }, { "05": 200 }, { "06": 300 }, { "07": 450 }, { "08": 100 }, { "09": 100 }, { "10": 300 }, { "11": 200 }, { "12": 250 }, { "13": 150 }, { "14": 220 }, { "15": 400 }, { "16": 250 }, { "17": 100 }, { "18": 100 }, { "19": 300 }, { "20": 200 }, { "21": 250 }, { "22": 150 }, { "23": 220 }] }
        ], // Gunluk kazanc
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "7 / 1 / 9 / 7",
        "type": "line",
    },
    "daily_kwh_usage": {
        "title": "Günlük Kwh Tüketimi",
        "value": [
            { "today": [{ "00": 100 }, { "01": 300 }, { "02": 200 }, { "03": 250 }, { "04": 150 }, { "05": 220 }, { "06": 400 }, { "07": 250 }, { "08": 100 }, { "09": 100 }, { "10": 300 }, { "11": 200 }, { "12": 250 }, { "13": 150 }, { "14": 220 }, { "15": 400 }, { "16": 250 }, { "17": 100 }, { "18": 100 }, { "19": 300 }, { "20": 200 }, { "21": 250 }, { "22": 150 }, { "23": 220 }] },
            { "last_week_today": [{ "00": 100 }, { "01": 300 }, { "02": 250 }, { "03": 350 }, { "04": 400 }, { "05": 200 }, { "06": 300 }, { "07": 450 }, { "08": 100 }, { "09": 100 }, { "10": 300 }, { "11": 200 }, { "12": 250 }, { "13": 150 }, { "14": 220 }, { "15": 400 }, { "16": 250 }, { "17": 100 }, { "18": 100 }, { "19": 300 }, { "20": 200 }, { "21": 250 }, { "22": 150 }, { "23": 220 }] }
        ], // Gunluk kwh tuketimi
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "7 / 7 / 9 / 13",
        "type": "line",
    },
    "monthly_income": {
        "title": "Aylık Kazanç",
        "value": [
            { "month": [{ "00": 100 }, { "01": 300 }, { "02": 200 }, { "03": 250 }, { "04": 150 }, { "05": 220 }, { "06": 400 }, { "07": 250 }, { "08": 100 }, { "09": 100 }, { "10": 300 }, { "11": 200 }, { "12": 250 }, { "13": 150 }, { "14": 220 }, { "15": 400 }, { "16": 250 }, { "17": 100 }, { "18": 100 }, { "19": 300 }, { "20": 200 }, { "21": 250 }, { "22": 150 }, { "23": 220 }] },
            { "last_month": [{ "00": 100 }, { "01": 300 }, { "02": 250 }, { "03": 350 }, { "04": 400 }, { "05": 200 }, { "06": 300 }, { "07": 450 }, { "08": 100 }, { "09": 100 }, { "10": 300 }, { "11": 200 }, { "12": 250 }, { "13": 150 }, { "14": 220 }, { "15": 400 }, { "16": 250 }, { "17": 100 }, { "18": 100 }, { "19": 300 }, { "20": 200 }, { "21": 250 }, { "22": 150 }, { "23": 220 }] }
        ], // Aylik kazanc
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "9 / 1 / 11 / 7",
        "type": "line",
    },
    "monthly_kwh_usage": {
        "title": "Aylık Kwh Tüketimi",
        "value": [
            { "month": [{ "00": 100 }, { "01": 300 }, { "02": 200 }, { "03": 250 }, { "04": 150 }, { "05": 220 }, { "06": 400 }, { "07": 250 }, { "08": 100 }, { "09": 100 }, { "10": 300 }, { "11": 200 }, { "12": 250 }, { "13": 150 }, { "14": 220 }, { "15": 400 }, { "16": 250 }, { "17": 100 }, { "18": 100 }, { "19": 300 }, { "20": 200 }, { "21": 250 }, { "22": 150 }, { "23": 220 }] },
            { "last_month": [{ "00": 100 }, { "01": 300 }, { "02": 250 }, { "03": 350 }, { "04": 400 }, { "05": 200 }, { "06": 300 }, { "07": 450 }, { "08": 100 }, { "09": 100 }, { "10": 300 }, { "11": 200 }, { "12": 250 }, { "13": 150 }, { "14": 220 }, { "15": 400 }, { "16": 250 }, { "17": 100 }, { "18": 100 }, { "19": 300 }, { "20": 200 }, { "21": 250 }, { "22": 150 }, { "23": 220 }] }
        ], // Aylik kwh tuketimi
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "9 / 7 / 11 / 13",
        "type": "line",
    },
    "yearly_income": {
        "title": "Yıllık Kazanç",
        "value": [
            { "year": [{ "00": 100 }, { "01": 300 }, { "02": 200 }, { "03": 250 }, { "04": 150 }, { "05": 220 }, { "06": 400 }, { "07": 250 }, { "08": 100 }, { "09": 100 }, { "10": 300 }, { "11": 200 }, { "12": 250 }, { "13": 150 }, { "14": 220 }, { "15": 400 }, { "16": 250 }, { "17": 100 }, { "18": 100 }, { "19": 300 }, { "20": 200 }, { "21": 250 }, { "22": 150 }, { "23": 220 }] },
            { "last_year": [{ "00": 100 }, { "01": 300 }, { "02": 250 }, { "03": 350 }, { "04": 400 }, { "05": 200 }, { "06": 300 }, { "07": 450 }, { "08": 100 }, { "09": 100 }, { "10": 300 }, { "11": 200 }, { "12": 250 }, { "13": 150 }, { "14": 220 }, { "15": 400 }, { "16": 250 }, { "17": 100 }, { "18": 100 }, { "19": 300 }, { "20": 200 }, { "21": 250 }, { "22": 150 }, { "23": 220 }] }
        ], // Yillik kazanc
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "11 / 1 / 13 / 7",
        "type": "line",
    },
    "yearly_kwh_usage": {
        "title": "Yıllık Kwh Tüketimi",
        "value": [
            { "year": [{ "00": 100 }, { "01": 300 }, { "02": 200 }, { "03": 250 }, { "04": 150 }, { "05": 220 }, { "06": 400 }, { "07": 250 }, { "08": 100 }, { "09": 100 }, { "10": 300 }, { "11": 200 }, { "12": 250 }, { "13": 150 }, { "14": 220 }, { "15": 400 }, { "16": 250 }, { "17": 100 }, { "18": 100 }, { "19": 300 }, { "20": 200 }, { "21": 250 }, { "22": 150 }, { "23": 220 }] },
            { "last_year": [{ "00": 100 }, { "01": 300 }, { "02": 250 }, { "03": 350 }, { "04": 400 }, { "05": 200 }, { "06": 300 }, { "07": 450 }, { "08": 100 }, { "09": 100 }, { "10": 300 }, { "11": 200 }, { "12": 250 }, { "13": 150 }, { "14": 220 }, { "15": 400 }, { "16": 250 }, { "17": 100 }, { "18": 100 }, { "19": 300 }, { "20": 200 }, { "21": 250 }, { "22": 150 }, { "23": 220 }] }
        ], // Yillik kwh tuketimi
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "11 / 7 / 13 / 13",
        "type": "line",
    },
    "monthly_total": {
        "title": "Aylık Toplam",
        "value": [
            { "08-2023": { "amount": 5190, "charge_count": 4000, "kwh": 90000, "service_fee": 143000 } },
            { "09-2023": { "amount": 3190, "charge_count": 3000, "kwh": 80000, "service_fee": 150000 } },
            { "10-2023": { "amount": 3019, "charge_count": 2590, "kwh": 75000, "service_fee": 125000 } },
            { "11-2023": { "amount": 3590, "charge_count": 3001, "kwh": 83200, "service_fee": 149000 } },
            { "12-2023": { "amount": 3500, "charge_count": 3250, "kwh": 91000, "service_fee": 139000 } },
            { "01-2024": { "amount": 3190, "charge_count": 1459, "kwh": 86000, "service_fee": 125999 } },
            { "02-2024": { "amount": 1900, "charge_count": 3698, "kwh": 79000, "service_fee": 139500 } },
            { "03-2024": { "amount": 1987, "charge_count": 3200, "kwh": 78500, "service_fee": 189623 } },
            { "04-2024": { "amount": 3520, "charge_count": 3190, "kwh": 76000, "service_fee": 198533 } },
            { "05-2024": { "amount": 3654, "charge_count": 4300, "kwh": 71000, "service_fee": 179563 } },
            { "06-2024": { "amount": 2958, "charge_count": 4125, "kwh": 69500, "service_fee": 179963 } },
            { "07-2024": { "amount": 3000, "charge_count": 3009, "kwh": 78900, "service_fee": 169000 } },
            { "08-2024": { "amount": 3100, "charge_count": 3756, "kwh": 85200, "service_fee": 187653 } }
        ], // Aylik toplam 
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "13 / 1 / 15 / 13",
        "type": "line&bar",
    },
    "most_used_locations": {
        "title": "En Çok Kullanılan Lokasyonlar",
        "value": [
            { "Location 1": 25 },
            { "Location 2": 20 },
            { "Location 3": 15 },
            { "Location 4": 10 },
            { "Location 5": 5 }
        ], // En cok sarj islemi yapilan lokasyonlar
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "15 / 1 / 16 / 5",
        "type": "list",
    },
    "most_charging_users": {
        "title": "En Çok Sarj Yapan Kullanıcılar",
        "value": [
            { "User 1": 25 },
            { "User 2": 20 },
            { "User 3": 15 },
            { "User 4": 10 },
            { "User 5": 5 }
        ], // En cok sarj islemi yapan kullanicilar
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": " 15 / 5 / 16 / 9",
        "type": "list",
    },
    "most_payment_types": {
        "title": "Ödeme Yöntemleri",
        "value": [
            { "Kredi Kartı": 25 },
            { "Sharz Card": 20 },
            { "Fleet / Wallet": 15 },
        ], // En cok kullanilan odeme yontemleri
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "15 / 9 / 16 / 13",
        "type": "list",
    }
};
