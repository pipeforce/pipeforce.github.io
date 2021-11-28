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
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'pipeforce', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.
  trailingSlash: false,

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/pipeforce/pipeforce.github.io/edit/master/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/pipeforce/pipeforce.github.io/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
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
          {
            type: 'docsVersionDropdown',
          },
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Manuals',
          },
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorials',
          },
          {
            type: 'doc',
            docId: 'api/commands',
            position: 'left',
            label: 'API',
          },
          {to: '/blog', label: 'News', position: 'left'},
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
          'We are hiring Developers. <a target="_blank" rel="noopener noreferrer" href="#">Apply now!</a>',
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
                label: 'Developer',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'News',
                to: '/blog',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} LOGABIT GmbH.`,
      },
      prism: {
        theme: require('prism-react-renderer/themes/dracula'),
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
