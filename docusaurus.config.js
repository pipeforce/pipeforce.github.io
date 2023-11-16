// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PIPEFORCE',
  tagline: 'Platform for Workflow Automation and Integration',
  url: 'https://pipeforce.github.io',
  baseUrl: '/',
  // TODO Change this to 'throw', once in production:
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'pipeforce', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.
  trailingSlash: false,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/pipeforce/pipeforce.github.io/edit/master/',
          docLayoutComponent: require.resolve('./src/components/DocsLayout.jsx')
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/pipeforce/pipeforce.github.io/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-KXWX67RYXR',
          anonymizeIP: true,
        },
        googleAnalytics: {
          trackingID: 'G-KXWX67RYXR',
          anonymizeIP: true,
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        logo: {
          alt: 'PIPEFORCE',
          src: 'img/pipeforce-logo-150w.png',
        },
        items: [
          /** 
          {
            type: 'docsVersionDropdown',
          },**/
          {
            href: 'https://logabit.atlassian.net/wiki/spaces/PA/pages/2543353860',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://logabit.atlassian.net/wiki/display/PA/customcontent/list/ac%3Acom.mute.confluence.plugins.lms%3Acourse-type',
            position: 'left',
            label: 'Tutorials',
          },
          {
            href: 'http://docs.pipeforce.org/api.html',
            position: 'left',
            label: 'API',
          },
          /**{to: '/blog', label: 'News', position: 'left'},**/
          {
            href: 'https://logabit.atlassian.net/wiki/spaces/PA/pages/2548400545',
            label: 'Downloads',
          },
          {
            position: 'right',
            href: 'https://logabit.atlassian.net/servicedesk/customer/portals',
            label: 'Support',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorials',
                href: 'https://logabit.atlassian.net/wiki/display/PA/customcontent/list/ac%3Acom.mute.confluence.plugins.lms%3Acourse-type',
              },
              {
                label: 'FAQ',
                href: 'https://logabit.atlassian.net/wiki/spaces/PA/pages/2548400531/FAQ',
              },
            ],
          },
          {
            title: 'LOGABIT',
            items: [
              {
                label: 'Website',
                href: 'https://pipeforce.io',
              },
              {
                label: 'Support',
                href: 'https://logabit.atlassian.net/servicedesk/customer/portals',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'News',
                to: 'https://pipeforce.io/blog/',
              },
              {
                label: "Imprint",
                to: 'https://pipeforce.io/impressum/',
              }
            ],
          },
        ],
        copyright: `<br/>Copyright © ${new Date().getFullYear()} <b>LOGABIT GmbH.</b>`,
      },
      prism: {
        theme: require('prism-react-renderer/themes/dracula'),
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
