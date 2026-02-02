// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    fintechSidebar: [
        {
            type: 'doc',
            id: 'home',
            label: 'Pratibimba Home',
        },
        {
            type: 'doc',
            id: 'fintech/index',
            label: 'Fintech Overview',
        },
        {
            type: 'doc',
            id: 'fintech/architecture',
            label: 'Architecture',
        },
        {
            type: 'doc',
            id: 'fintech/test-drive',
            label: 'Test Drive (Sandbox)',
        },
        {
            type: 'category',
            label: 'Generation',
            collapsed: false,
            items: [
                'fintech/credit-portfolio-generator',
                'fintech/digital-twin-cloning',
                'fintech/lstm-cascade-engine',
            ],
        },
        {
            type: 'category',
            label: 'Privacy & Compliance',
            collapsed: false,
            items: [
                'fintech/privacy-guarantees',
                'fintech/xprivacy-explainability',
            ],
        },
        {
            type: 'category',
            label: 'Validation & Testing',
            collapsed: false,
            items: [
                'fintech/validation-quality',
                'fintech/stress-testing',
                'fintech/regulatory-reports',
            ],
        },
        {
            type: 'doc',
            id: 'fintech/api-reference',
            label: 'API Reference',
        },
        {
            type: 'category',
            label: 'Business',
            collapsed: true,
            items: [
                'fintech/comparisons',
                'fintech/use-cases',
            ],
        },
    ],
};

export default sidebars;
