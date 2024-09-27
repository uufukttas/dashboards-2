# Payloads

- [Languages List](#languages-list)
- [ResourceText GetByKeyList](#resourcetext-getbykeylist)
- [Auth Login](#auth-login)
- [API YOK](#api-yok)
- [ServicePoint GetAllPoints](#servicepoint-getallpoints)
- [ServicePoint GetStationById](#servicepoint-getstationbyid)
- [StationInfo GetByStationId](#stationinfo-getbystationid)
- [ServicePoint DeleteStation](#servicepoint-deletestation)
- [ServicePoint AddStation](#servicepoint-addstation)
- [ServicePoint GetCompanies](#servicepoint-getcompanies)
- [ServicePoint GetResellers](#servicepoint-getresellers)
- [ServicePoint UpdateStation](#servicepoint-updatestation)
- [Values GetCities](#values-getcities)
- [Values GetDistricts](#values-getdistricts)
- [StationFeature GetFeatureValues](#stationfeature-getfeaturevalues)
- [StationFeature AddStationFeature](#stationfeature-addstationfeature)
- [StationInfo AddStationInfo](#stationinfo-addstationinfo)
- [StationFeature GetStationFeature](#stationfeature-getstationfeature)
- [ServicePoint UpdateCommisionRate](#servicepoint-updatecommisionrate)
- [ServicePoint RemoveEnergyPrice](#servicepoint-removeenergyprice)
- [Auth ChargePointUserDelete](#auth-chargepointuserdelete)
- [StationInfo GetChargePointConnectorsV2](#stationinfo-getchargepointconnectorsv2)
- [Values GetChargePointFeatures](#values-getchargepointfeatures)
- [Values GetInvestors](#values-getinvestors)
- [Values GetModels](#values-getmodels)
- [ServicePoint GetStationSettings](#servicepoint-getstationsettings)
- [ServicePoint SelectCommisionRate](#servicepoint-selectcommisionrate)
- [ServicePoint GetEnergyPrice](#servicepoint-getenergyprice)
- [Auth ChargePointUserCreate](#auth-chargepointusercreate)
- [ServicePoint UpdateStationSettings](#servicepoint-updatestationsettings)
- [ServicePoint AddImage](#servicepoint-addimage)
- [ServicePoint AddEnergyPrice](#servicepoint-addenergyprice)
- [Values GetConnectorModels](#values-getconnectormodels)
- [ServicePoint UpdateConnector](#servicepoint-updateconnector)
- [ServicePoint InsertCommisionRate](#servicepoint-insertcommisionrate)
- [ServicePoint TariffSubFractionTypes](#servicepoint-tariffsubfractiontypes)
- [ServicePoint AddStationSettings](#servicepoint-addstationsettings)
- [Values GetDeviceCode](#values-getdevicecode)
- [StationFeature GetChargePointFeature](#stationfeature-getchargepointfeature)
- [StationFeature StationSelectedValues](#stationfeature-stationselectedvalues)
- [ServicePoint StationConnectorInfo](#servicepoint-stationconnectorinfo)
- [Auth GetUser](#auth-getuser)
- [Auth Users](#auth-users)
- [Auth Register](#auth-register)
- [Auth UpdateUser](#auth-updateuser)
- [Tariff DeleteTariff](#tariff-deletetariff)
- [Tariff GetTariffs](#tariff-gettariffs)
- [Tariff AddTariff](#tariff-addtariff)
- [Report MainReport](#report-mainreport)

- <h2 id="languages-list">/Language/LanguagesList</h2>
  GET

  ```json
    "data": [{
        "abbreviation": "TR-tr",
        "flag_url": "https://xxxxxxxxx.jpg",
        "id": 1,
        "name": "Türkçe",
        "rid": 10,
    }],
    "message": "",
    "status": 200,
  ```

- <h2 id="resourcetext-getbykeylist">/ResourceText/GetByKeyList</h2>
  POST: ["Primary", "Secondary",...]

  ```json
    "data": [{
            "id": 76,
            "resourceKey": "Primary",
            "value": "#fcd800"
        }],
    "message": "",
    "status": 200,
  ```

- <h2 id="auth-login">/Auth/Login</h2>
  POST: userName: string, password: string

  ```json
    "data": [{
        "userInformation": {
            "id": 123,
            "name": "John",
            "lastName": "Doe",
            "roles": ["Guest", "StationUser"],

        },
        "token": "abcdefghijklmnoprstuvyz",
    }],
    "message": "",
    "status": 200,
  ```

- <h2 id="api-yok">API YOK</h2>
  POST: [KPI Values]

  ```json
  "data": [{
    "connector": {
        "title": "Toplam Konnektor",
        "value": "450/483",
        "icon_name": "GiElectricalSocket",
        "description": "This is description of this card",
        "position": "1 / 9 / 7 / 13",
        "mobile_layout": "16 / 1 / 16 / 12",
        "tablet_layout": "5 / 1 / 5 / 5",
        "type": ""
    },
    "ac_status": {
        "title": "AC Sayisi",
        "value": "350/371",
        "icon_name": "IoIosFlash",
        "description": "This is description of this card",
        "position": "7 / 9 / 14 / 13",
        "mobile_layout": "17 / 1 / 17 / 12",
        "tablet_layout": "6 / 1 / 6 / 3",
        "type": ""
    },
    "dc_status": {
        "title": "DC Sayisi",
        "value": "100/112",
        "icon_name": "PiWaveSineBold",
        "description": "This is description of this card",
        "position": "14 / 9 / 21 / 13",
        "mobile_layout": "18 / 1 / 18 / 12",
        "tablet_layout": "6 / 3 / 6 / 5",
        "type": ""
    },
    "locations": {
        "title": "Lokasyonlar",
        "value": [
            { "lat": 41.0082, "long": 28.9784 },
            { "lat": 41.0151, "long": 28.9760 },
            { "lat": 41.0178, "long": 29.0064 },
            { "lat": 41.0283, "long": 28.9985 },
            { "lat": 41.0208, "long": 28.9642 },
            { "lat": 41.0350, "long": 28.9860 },
            { "lat": 41.0227, "long": 29.0094 },
            { "lat": 41.0333, "long": 29.0303 },
            { "lat": 41.0377, "long": 28.9785 },
            { "lat": 41.0404, "long": 29.0110 },
            { "lat": 41.0489, "long": 28.9972 },
            { "lat": 41.0530, "long": 28.9755 },
            { "lat": 41.0602, "long": 29.0311 },
            { "lat": 41.0678, "long": 29.0105 },
            { "lat": 41.0720, "long": 28.9850 },
            { "lat": 41.0753, "long": 29.0218 },
            { "lat": 41.0810, "long": 29.0035 },
            { "lat": 41.0865, "long": 28.9803 },
            { "lat": 41.0932, "long": 28.9904 },
            { "lat": 41.0985, "long": 29.0089 },
            { "lat": 41.1040, "long": 28.9780 },
            { "lat": 41.1102, "long": 29.0010 },
            { "lat": 41.1165, "long": 29.0230 },
            { "lat": 41.1228, "long": 28.9967 },
            { "lat": 41.1300, "long": 29.0200 },
            { "lat": 41.1354, "long": 28.9792 },
            { "lat": 41.1407, "long": 29.0058 },
            { "lat": 41.1480, "long": 28.9911 },
            { "lat": 41.1545, "long": 29.0140 },
            { "lat": 41.1600, "long": 28.9783 },
            { "lat": 39.9334, "long": 32.8597 },
            { "lat": 39.9208, "long": 32.8541 },
            { "lat": 39.9366, "long": 32.8372 },
            { "lat": 39.9075, "long": 32.8258 },
            { "lat": 39.9405, "long": 32.8236 },
            { "lat": 39.9255, "long": 32.8660 },
            { "lat": 39.9293, "long": 32.8383 },
            { "lat": 39.9139, "long": 32.8522 },
            { "lat": 39.9456, "long": 32.8304 },
            { "lat": 39.9182, "long": 32.8604 },
            { "lat": 38.4192, "long": 27.1287 },
            { "lat": 38.4237, "long": 27.1428 },
            { "lat": 38.4199, "long": 27.1381 },
            { "lat": 38.4086, "long": 27.1267 },
            { "lat": 38.4292, "long": 27.1325 },
            { "lat": 38.4155, "long": 27.1246 },
            { "lat": 38.4210, "long": 27.1340 },
            { "lat": 38.4178, "long": 27.1432 },
            { "lat": 40.1826, "long": 29.0669 },
            { "lat": 40.1932, "long": 29.0647 },
            { "lat": 40.2010, "long": 29.0500 },
            { "lat": 40.2089, "long": 29.0367 }
        ],
        "icon_name": "icon_name",
        "description": "This is description of this card",
        "position": "1 / 1 / 21 / 9",
        "mobile_layout": "19 / 1 / 19 / 12",
        "tablet_layout": "5 / 5 / 7 / 12",
        "type": "map"
    }}],
    "message": "",
    "status": 200,
  ```

- <h2 id="servicepoint-getallpoints">/ServicePoint/GetAllPoints</h2>
  GET

  ```json
    "data": [{
        "service-points": [{
            "name": "Test",
            "id": 123,
            "phone": "05553692514",
            "address": "Erseven Sokak",
            "city": "Istanbul",
            "district": "Kagithane",
            // "cityId": 34,
            // "districtId": 200,
        }],
        "count": 1
    }],
    "message": "",
    "status": 200,
  ```

- <h2 id="servicepoint-getstationbyid">/ServicePoint/GetStationById</h2>
  POST: stationId: number

  ```json
    "data":[{
        "id": 1,
        "name": "Test",
        "companyId": 7,
        "companyName": "Sharz.net",
        "resellerId": 3,
        "resellerName": "Sharz.net",
        "isActive": true,
        "isDeleted": false,
    }],
    "message": "",
    "status": 200,
  ```

- <h2 id="stationinfo-getbystationid">/StationInfo/GetByStationId</h2>
  POST: stationId: number

  ```json
    "data":[{
        "address": "Adres",
        "addressDetail": "Adres Detail",
        "cityId": 1,
        // "cityName": "Adana",
        "districtId": 1,
        // "districtName": "Aladag",
        "freeParkCount": 20,
        "id": 23,
        "lat": 23.4565,
        "long": 23.456,
        "name": "Test",
        "phone1": "05551472536",
        "phone2": "05551442536",
        "opportunities": [{
            "id": 0,
            "name": "Test"
        }],
        "paymentMethods": [{
            "id":1,
            "name": "Kredi Karti"
        }]
    }],
    "message": "",
    "status": 200,
  ```

- <h2 id="servicepoint-deletestation">/ServicePoint/DeleteStation</h2>
  POST: stationId: number

  ```json
    "data":[],
    "message": "Kayit basarili bir sekilde silindi",
    "status": 200,
  ```

- <h2 id="servicepoint-addstation">/ServicePoint/AddStation</h2>
  POST: stationName: string, companyId: number, resellerId: number

  ```json
    "data":[{
        "id": 123456,
        "name": "Test" // Opsiyonel
    }],
    "message": "Kayit basarili bir sekilde olusturuldu",
    "status": 200,
  ```

- <h2 id="servicepoint-getcompanies">/ServicePoint/GetCompanies</h2>
  GET

  ```json
    "data":[{
        "id": 1,
        "name": "Voltrun",
        "rid": 10
    }],
    "message": "",
    "status": 200,
  ```

- <h2 id="servicepoint-getresellers">/ServicePoint/GetResellers</h2>
  GET

  ```json
    "data":[{
        "id": 5,
        "name": "Aksa",
        "rid": 18
    }],
    "message": "",
    "status": 200,
  ```

- <h2 id="servicepoint-updatestation">/ServicePoint/UpdateStation</h2>
  POST: stationName: string, companyId: number, resellerId: number, stationId: string

  ```json
    "data":[{
        "id": 123456,
        "name": "Test" // Opsiyonel
    }],
    "message": "Kayit basarili bir sekilde guncellenmistir",
    "status": 200,
  ```

- <h2 id="values-getcities">/Values/GetCities</h2>
  GET

  ```json
    "data":[{
        "id": 1,
        "name": "Adana",
        "rid": 11
    }],
    "message": "",
    "status": 200,
  ```

- <h2 id="values-getdistricts">/Values/GetDistricts</h2>
  POST - cityId

  ```json
    "data":[{
        "id": 1,
        "cityName": "Adana",
        "districtName": "Aladag",
        "rid": 1
    }],
    "message": "",
    "status": 200,
  ```

- <h2 id="stationfeature-getfeaturevalues">/StationFeature/GetFeatureValues</h2>
  POST - stationFeatureType: number

  ```json
    "data":[{
        "id": 1,
        "isChecked": true,
        "name": "Sharz Uygulamasi",
        "rid": 5,
        "stationFeatureType": 1,
        "stationFeatureValue": 1,
    }],
    "message": "",
    "status": 200,
  ```

- <h2 id="stationfeature-addstationfeature">/StationFeature/AddStationFeature</h2>
  POST - stationId: mumber, stationFeatureType: 1, stationFeatureValue: 2 isDeleted: false

  ```json
    "data": [],
    "message": "Istasyon ozellikleri eklendi.",
    "status": 200
  ```

- <h2 id="stationinfo-addstationinfo">/StationInfo/AddStationInfo</h2>
  POST - stationId: number, address: string, phone1: string, phone2: string, lat: float, lon: float, cityId: number, districtId: number

  ```json
    "data": [{
        "id": 65870
    }],
    "message": "Istasyon bilgileri basarili bir sekilde kaydedildi.",
    "status": 200
  ```

- <h2 id="stationfeature-getstationfeature">/StationFeature/GetStationFeature</h2>
  POST - stationId: number

  ```json
    "data": [{
        "stationId": 65870,
        "id": 1,
        "isChecked": true,
        "name": "Sharz Uygulamasi",
        "rid": 5,
        "stationFeatureType": 1,
        "stationFeatureValue": 1,
    }],
    "message": "",
    "status": 200
  ```

- <h2 id="stationinfo-addstationinfo">/StationInfo/AddStationInfo</h2>
  POST - stationId: number, address: string, phone1: string, phone2: string, lat: float, lon: float, cityId: number, districtId: number

  ```json
    "data": [{
        "id": 65870
    }],
    "message": "Istasyon bilgileri basarili bir sekilde guncellendi",
    "status": 200
  ```

- <h2 id="servicepoint-apdatecommisionrate">/ServicePoint/UpdateCommisionRate</h2>
  POST - rid: number, stationId: number

  ```json
    "data": [],
    "message": "Komisyon basariyla silindi.",
    "status": 200
  ```

- <h2 id="servicepoint-removeenergyprice">/ServicePoint/RemoveEnergyPrice</h2>
  POST - Id: number

  ```json
    "data": [],
    "message": "Enerji Fiyati basariyla silindi",
    "status": 200
  ```

- <h2 id="auth-chargepointuserdelete">/Auth/ChargePointUserDelete</h2>
  POST - userId: number

  ```json
    "data": [],
    "message": "Tanimli kullanici basariyla silindi",
    "status": 200
  ```

- <h2 id="stationinfo-getchargepointconnectorsv2"> /StationInfo/GetChargePointConnectorsV2</h2>
  POST - stationChargePointId: 32633

  ```json
    "data": [{
        "rid": 132,
        "id": 1,
        "modelId": 1,
        "stationChargePointID": 12422,
        "status": 3,
        "statusName": "Bakimda",
        "isActive": true,
        "connectorNumber": 1,
        "epdkSocketNumber": "1231",
        "tariffId": null,
        "tariffName": null,
        "tariffSaleUnitPrice": null,
        "connectorType": "AC",
        "connectorKW": "220KW",
        "connectorName": "CCS/SAE"
    }],
    "message": "",
    "status": 200,
  ```

- <h2 id="values-getchargepointfeatures"> /Values/GetChargePointFeatures</h2>
  GET

  ```json
    "data": [{
        "accessTypeList": [{
            "id": 1,
            "name": "Herkese acik",
            "rid": 1
        }],
        "statusList": [{
            "id": 1,
            "name": "Mesgul",
            "rid": 1
        }],
    }],
    "message":"",
    "status": 200
  ```

- <h2 id="values-getinvestors"> /Values/GetInvestors</h2>
  GET

  ```json
    "data": [{
        "id":5,
        "name": "Sharz.net",
        "rid": 78
    }],
    "message":"",
    "status": 200
  ```

- <h2 id="values-getmodels"> /Values/GetModels</h2>
  GET

  ```json
    "data": [{
        "id": 1,
        "name": "Voltrun",
        "isDeleted": false,
    }],
    "message": "",
    "status": 200
  ```

- <h2 id="servicepoint-getstationsettings"> /ServicePoint/GetStationSettings</h2>
  POST - stationId: number, pageNumber: number, stationCount: number

  ```json
    "data": [{
        "accessType": "Herkese Acik", // accessTypeId de olabilir
        "accessTypeId": 2,
        "chargePointId": 14589,
        "connectorNumber": 2,
        "deviceCode": 908090809080,
        "hoStatus": "Kullanilabilir",
        "investor": "Investor Ismi",
        "investorId": 4,
        "isFreePoint": true,
        "lastHeartBeat": "dateTime",
        "isLimitedUsage": true,
        "brandId": 1,
        "brand": "Sinexcel",
        "ocppVersion": 1600-2100,
        "isRoaming": true,
        "stationId": 65870,
        "status": "Kullanilabilir", // hoStatus varsa buna gerek olmayabilir
        "model": "DC220W",
        "seriNo": "123123123",
        "createdDate": "DateTime",
        "brandLogo": "url", // DB path
        "deviceImage": "url", // DB path
    }],
    "message": "",
    "status": 200
  ```

- <h2 id="servicepoint/selectcommisionrate"> /ServicePoint/SelectCommisionRate</h2>
  POST - stationId: number

  ```json
    "data": [{
        "id": 12,
        "isActive": true,
        "commissionFor": 1, // Komisyon kime tanimlanacak
        "hasInvestor": true,
        "tariffSubFractionTypeID": 1,
        "tariffSubFractionTypeName": "Enerji Bedeli",
        "rate": "50%",
    }],
    "message": "",
    "status": 200,
  ```

- <h2 id="servicepoint-getenergyprice"> /ServicePoint/GetEnergyPrice</h2>
  POST - stationId: number

  ```json
    "data": [{
        "createdDate": "dateTime",
        "id": 1,
        "isActive": true,
        "isDeleted": true,
        "price": 3.56,
        "startDate": "DateTime",
        "stationId": 65870,
    }],
    "message": "",
    "status": 200
  ```

- <h2 id="auth-chargepointusercreate"> /Auth/ChargePointUserCreate</h2>
  POST - stationId: number

  ```json
    "data": [{
        "name": "Test",
        "lastName": "Test",
        "phoneNumber": "05514752536",
        "stationId": 65987
    }],
    "message": "",
    "status": 200
  ```

- <h2 id="servicepoint-updatestationsettings"> /ServicePoint/UpdateStationSettings</h2>
  POST - stationId number, isActive: false, isDeleted: true

  ```json
    "data": [],
    "message": "Unite basariyla silindi",
    "status": 200
  ```

- <h2 id="servicepoint-addimage"> /ServicePoint/AddImage</h2>
  POST - formData: formData

  ```json
    "data": [],
    "message": "Resim basariyla yuklendi",
    "status": 200,
  ```

- <h2 id="servicepoint-addenergyprice"> /ServicePoint/AddEnergyPrice</h2>

  POST - stationId: number, price: float, startData: dateTime, isActive: boolean, isDeleted: booelan

  ```json
    "data": [],
    "message": "Enerji fiyati basariyla eklendi",
    "status": 200,
  ```

- <h2 id="values-getconnectormodels"> /Values/GetConnectorModels</h2>
  POST - brandId: number

  ```json
    "data": [{
        "stationChargePointConnectorModelId": 1,
        "displayName": "22kw - AC - XX - XX",
    }],
    "message": "",
    "status": "",
  ```

- <h2 id="servicepoint-updateconnector"> /ServicePoint/UpdateConnector</h2>
  POST - id: number, connectorNumber: number, staionChargePointId: number, stationChargePointConnectorModelId: number

  ```json
    "data": [],
    "message": "Konnektor basariyla guncellendi",
    "status": 200
  ```

- <h2 id="servicepoint-insertcommisionrate"> /ServicePoint/InsertCommisionRate</h2>
  POST - ownerType: number, isActive: true, commissionFor: 1, // Komisyon kime tanimlanacak "hasInvestor": true, tariffSubFractionTypeID: 1, tariffSubFractionTypeName: "Enerji Bedeli", rate: "50%",

  ```json
    "data":[],
    "message": "Komisyon basariyla kaydedildi",
    "status": 200
  ```

- <h2 id="servicepoint-tariffsubfractiontypes"> /ServicePoint/TariffSubFractionTypes</h2>
  GET

  ```json
    "data": [{
      "id": 1,
      "name": "Enerji Bedeli",
      "unitType": 3,
      "isVarPrice": false,
      "roamingId": 3
    }],
    "message": "",
    "status": 200
  ```

- <h2 id="servicepoint-addstationsettings"> /ServicePoint/AddStationSettings</h2>
  POST - chargePoint: {code: number, isFreePoint: boolean, isLimitedUsage: boolean, ocppVersion: 1600 | 2100, investorId: number, isRoaming: boolean, serialNo: number, stationId: number, stationChargePointModelID: number}, chargePointFeatures: [{ stationChargePointFeatureType: number, stationChargePointFeatureTypeValue: number}],connectorCount: number

  ```json
    "data":[],
    "message": "Sarj unitesi basariya eklendi.",
    "status": 200
  ```

- <h2 id="values-getdevicecode"> /Values/GetDeviceCode</h2>
  POST - stationId: number

  ```json
    "data": [
        "deviceCode": "909090909",
        "servicePointId": 12312
    ],
    "message": "",
    "status": 200
  ```

- <h2 id="stationfeature-getchargepointfeature"> /StationFeature/GetChargePointFeature</h2>
  POST - stationChargePointId: number

  ```json
    "data":  [{
        "accessTypeList": [{
            "id": 1,
            "name": "Herkese acik",
            "rid": 1
        }],
        "statusList": [{
            "id": 1,
            "name": "Mesgul",
            "rid": 1
        }],
    }]
    "message": "",
    "status": 200
  ```

- <h2 id="stationfeature-stationselectedvalues"> /StationFeature/StationSelectedValues</h2>
  POST - stationId: number, featureTypeModel: [featureType: number]

  ```json
    "data": [{
    "StationFeatureType": 1,
    "StationFeatureValue": 1
    }],
    "message": "",
    "status": 200
  ```

- <h2 id="servicepoint-stationconnectorinfo"> /ServicePoint/StationConnectorInfo</h2>
  POST - connectorId: number

  ```json
    "data": [{
        "displayName": "CCS/SAE - 220kw - AC"
    }],
    "message": "",
    "status": 200
  ```

- <h2 id="auth-chargepointuserdelete"> /Auth/ChargePointUserDelete</h2>
  POST - userId: string

  ```json
    "data": [],
    "message": "Kullanici basariyla silindi.",
    "status": 200
  ```

- <h2 id="auth-getuser"> /Auth/GetUser</h2>
  POST - userId: string

  ```json
    "data": [{
        "userName": "Test",
        "name": "Test",
        "lastName": "Demneme",
        "email": "test@test.com",
        "phoneNumber": "05551472536",
        "userId": 1,
        "roles": ["StationUser", "Gues"]
    }],
    "message": "",
    "status": 200
  ```

- <h2 id="auth-users"> /Auth/Users</h2>
  POST - { pageNumber: number, userCount: number}

  ```json
      "data": [{
          "users": [], // usersList
          "count": 100
      }],
      "message": "",
      "status": 200
  ```

- <h2 id="auth-register"> /Auth/Register</h2>
  POST - { userName: string, name: string lastName: string, phoneNumber: string, email: string, roles: [], password: string}

  ```json
    "data": [],
    "message": "Kullanici basarili bit sekilde olusturuldu",
    "status": 200
  ```

- <h2 id="auth-updateuser"> /Auth/UpdateUser</h2>
  POST - { userName: string, name: string lastName: string, phoneNumber: string, email: string, roles: [], password: string}

  ```json
    "data": [],
    "message": "Kullanici basarili bit sekilde guncellendi",
    "status": 200
  ```

- <h2 id="tariff-deletetariff"> /Tariff/DeleteTariff</h2>
  POST - deletedTariffId: number

  ```json
    "data": [],
    "message": "Tarife basarili bir sekilde silindi."
    "status": 200
  ```

- <h2 id="tariff-gettariffs"> /Tariff/GetTariffs</h2>
  POST - pageNnumber: number; userCount: number

  ```json
    "data":[], //TarifeListesi
    "message": "",
    "status": 200
  ```

- <h2 id="tariff-addtariff"> /Tariff/AddTariff</h2>
  POST - { tariff: { name: string, validityBeginDate: dateTime, validityEndDate: dateTime, minKW: number, maxKW: nmber, saleUnitPrice: number/float } subFraction: [{ tariffSubFractionType: number, subFractionValue: number }] }

  ```json
    "data": [],
    "message": "Tarife basariyla eklendi.",
    "status": 200
  ```

- <h2 id="report-mainreport"> /Report/MainReport</h2>
  POST - { pageNumber: number, userCount: number}

  ```json
    "data": [{
    "reportData": [], //report tablosundaki datalar -> sadelestirilmesi soz konusu en son durumda donen datayi konusabiliriz.
    "count": 110
    }],
    "message": "",
    "status": 200
  ```

[comment]: <> (GetCities ve GetDistricts birlestirilebilir durumda ise ikisini de tek API den alabiliriz.)
[comment]: <> (GetStationFeatureValues apisinde parametre gondererek odeme yontemi ve istasyon olanaklarini alabiliyoruz parametre gondermeden hepsini alamaz miyiz?)
[comment]: <> (GetStationFeature apisinde parametre olarak istasyon id gondererek istasyonun sahip oldugu odeme yontemi ve istasyon olanaklarini alabiliyoruz. Bunun icin de iyilestirme olarak ne yapabiliriz?)
[comment]: <> (WorkingHours API leri degisebilir tekrar gozden gecirelim.)
