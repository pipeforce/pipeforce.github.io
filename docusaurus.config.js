// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
require('dotenv').config()

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
        googleAnalytics: {
          trackingID: process.env.TRACKING_ID,
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
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'doc',
            docId: 'tutorials/basics',
            position: 'left',
            label: 'Tutorials',
          },
          {
            type: 'doc',
            docId: 'api/commands',
            position: 'left',
            label: 'Commands',
          },
          {
            href: 'http://docs.pipeforce.io/api.html',
            position: 'left',
            label: 'HTTP API',
          },
          /**{to: '/blog', label: 'News', position: 'left'},**/
          {
            type: 'doc',
            docId: 'downloads',
            position: 'right',
            label: 'Downloads',
          },
          {
            position: 'right',
            href: 'https://logabit.atlassian.net/servicedesk/customer/portals',
            label: 'Support',
          },
        ],
      },
      announcementBar: {
        id: 'support_us',
        content:
          'We are hiring Developers. <a target="_blank" rel="noopener noreferrer" href="https://germantechjobs.de/jobs/LOGABIT-GmbH-Fullstack-Open-Source-Entwickler-mwd">Apply now!</a>',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: false,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorials',
                to: '/docs/tutorials/basics',
              },
              {
                label: 'FAQ',
                to: '/docs/faq',
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
