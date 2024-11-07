const tariffsTableHeadData = [
    {
        field: 'name',
        header: 'Tarife Adı',
        isRemovable: true,
    },
    {
        field: 'saleUnitPrice',
        header: 'Tarife Fiyatı',
        isRemovable: true,
    },
    {
        field: 'kwRange',
        header: 'Min-Max KW Aralığı',
        isRemovable: true,
    },
    {
        field: 'createDate',
        header: 'Kayit Tarihi',
        isRemovable: true,
    },
    {
        field: 'validityBeginDate',
        header: 'Aktif Tarihi',
        isRemovable: true,
    },
    {
        field: 'validityEndDate',
        header: 'Pasif Tarihi',
        isRemovable: true,
    },
    {
        field: 'actions',
        header: 'İşlemler',
        isRemovable: false,
    },
];


export { tariffsTableHeadData };
