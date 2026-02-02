// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Pratibimba',
    tagline: 'Enterprise-Grade Synthetic Credit Data Platform',
    favicon: 'img/favicon.ico',

    // Updated to match the "pratibimba-ai" organization name
    url: 'https://pratibimba-ai.github.io',
    baseUrl: '/',

    // Organization Settings
    organizationName: 'pratibimba-ai',
    projectName: 'pratibimba-ai.github.io',
    deploymentBranch: 'gh-pages',
    trailingSlash: false,

    onBrokenLinks: 'throw',

    markdown: {
        mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    routeBasePath: '/',
                    // Updated to point to the correct repo for editing
                    editUrl: 'https://github.com/pratibimba-ai/pratibimba-ai.github.io/tree/main/',
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            image: 'img/pratibimba-social-card.png',
            mermaid: {
                theme: { light: 'neutral', dark: 'forest' },
                options: {
                    themeVariables: {
                        /* Dark Mode Variables */
                        primaryColor: '#0e7490',
                        primaryTextColor: '#ffffff',
                        primaryBorderColor: '#22d3ee',
                        lineColor: '#67e8f9',
                        secondaryColor: '#1e293b',
                        tertiaryColor: '#0f172a',
                        fontSize: '14px',
                        fontFamily: 'Inter, sans-serif',
                    }
                }
            },
            navbar: {
                title: 'Pratibimba',
                logo: {
                    alt: 'Pratibimba Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        to: '/',
                        label: 'Home',
                        position: 'left',
                        activeBaseRegex: '^/$',
                    },
                    {
                        to: '/fintech/',
                        label: 'Fintech Module',
                        position: 'left',
                    },
                    {
                        // Keeping link to the original source code repository
                        href: 'https://github.com/ramprag/DataRobo',
                        label: 'Source Code',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Documentation',
                        items: [
                            { label: 'Overview', to: '/' },
                            { label: 'API Reference', to: '/fintech/api-reference' },
                        ],
                    },
                    {
                        title: 'Solutions',
                        items: [
                            { label: 'Digital Twin Cloning', to: '/fintech/digital-twin-cloning' },
                            { label: 'Stress Testing', to: '/fintech/stress-testing' },
                        ],
                    },
                    {
                        title: 'Project',
                        items: [
                            { label: 'Source Code', href: 'https://github.com/ramprag/DataRobo' },
                            { label: 'Documentation Feed', href: 'https://github.com/pratibimba-ai/pratibimba-ai.github.io' },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Pratibimba. Project DataRobo.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
                additionalLanguages: ['python', 'bash', 'json', 'yaml'],
            },
            colorMode: {
                defaultMode: 'dark',
                disableSwitch: false,
                respectPrefersColorScheme: true,
            },
        }),
};

export default config;
