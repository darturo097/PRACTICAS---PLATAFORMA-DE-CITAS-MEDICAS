var docDefinition = {
    content: [
        {
            defaultStyle: {
                fontSize: 10
            },
            columns: [
                {
                    width: '50%',
                    stack: [
                        { text: 'Secretaría de Salud del Estado de Durango', bold: true, fontSize: 12, margin: [0, 0, 0, 5] },
                        { text: 'Centro de Atención Médica "Durango Norte"', fontSize: 10 },
                        { text: 'Teléfono: (618) 123 4567', fontSize: 10 },
                        { text: 'Correo: contacto@salud.gob.mx', fontSize: 10 }
                    ], alignment: 'center',
                    margin: [0, 10, 0, 0]
                },
                {
                    width: '50%',
                    table: {
                        widths: ['100%'],
                        body: [
                            [
                                { text: 'Paciente: JUAN PÉREZ LÓPEZ', bold: true, alignment: 'left' },
                            ],
                            [
                                { text: 'Edad: 42 años', bold: true, alignment: 'left' },
                            ],
                            [
                                { text: 'Sexo: Masculino', bold: true, alignment: 'left' },
                                
                            ],
                            [
                                { text: 'NSS: 1234567890', bold: true, alignment: 'left' },
                            ]
                        ]
                    },
                    layout: {
                        hLineWidth: function (i, node) {
                            return (i === 0 || i === node.table.body.length) ? 1 : 0;
                        },
                        vLineWidth: function (i, node) {
                            return (i === 0 || i === node.table.widths.length) ? 1 : 0;
                        },
                        hLineColor: function () { return 'black'; },
                        vLineColor: function () { return 'black'; },
                    },
                    margin: [10, 0, 0, 15]
                }
            ],
            margin: [0, 0, 0, 10]
        },
        {
            text: 'Fecha de expedición: Miércoles, 8 de Octubre del 2025',
            alignment: 'center',
            margin: [10, 0, 0, 15],
            bold: true
        },
        {
            text: 'Dirección: Boulevard Felipe Pescador No. 940, Colonia Victoria de Durango, Durango, Durango, CP 34000',
            alignment: 'left',
            margin: [10, 0, 0, 15],
            bold: true
        },

        {
            layout: {
                hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 1 : 0.5;
                },
                vLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 1 : 0.5;
                },
                hLineColor: function () { return 'black'; },
                vLineColor: function () { return 'black'; },
                paddingLeft: function () { return 5; },
                paddingRight: function () { return 5; },
                paddingTop: function () { return 5; },
                paddingBottom: function () { return 5; },
            },
            table: {
                headerRows: 1,
                widths: ['25%', '25%', '25%', '25%'],
                body: [
                    [
                        { text: 'Fecha: Miércoles, 8 de Octubre del 2025', alignment: 'left', colSpan: 2 },
                        {},
                        { text: 'Primer nivel de Atención', alignment: 'right', colSpan: 2 },
                        {}
                    ],
                    [
                        {
                            text: '5487 CITALOPRAM. TABLETA. CADA TABLETA CONTIENE: BROMHIDRATO DE CITALOPRAM EQUIVALENTE A 20 MG DE CITALOPRAM. ENVASE CON 28 TABLETAS.\n\nVía de administración Oral. Una Tableta(s) cada 24 Hora(s) durante 28 Día(s). Cantidad a Surtir: 1 ENV',
                            colSpan: 4
                        }, {}, {}, {}
                    ],
                    [
                        {
                            table: {
                                headerRows: 1,
                                widths: ['50%', '25%', '25%'],
                                body: [
                                    [
                                        { text: 'Nombre y firma del médico', style: 'tableHeader', fontSize:10 },
                                        { text: 'Cédula Profesional', style: 'tableHeader' },
                                        { text: 'Matrícula', style: 'tableHeader' }
                                    ],
                                    ['PAMELA YANID TORRES RUIZ', '9213548', '4875184'],
                                    [
                                        { text: 'Universidad de procedencia:', bold: true },
                                        { text: 'Universidad Autónoma de Baja California', colSpan: 2 },
                                        {}
                                    ],
                                ]
                            },
                            layout: 'lightHorizontalLines',
                            colSpan: 4,
                            margin: [0, 10, 0, 10]
                        }, {}, {}, {}
                    ],
                ]
            }
        }
    ]
};


pdfMake.createPdf(docDefinition).open();