module.exports = {
  // where it all starts -- the site's root Notion page (required)
  rootNotionPageId: '779198d2db384e35b84a477a327955d8',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'SolaTyolo',
  domain: 'note.cueture.club',
  author: 'SolaTyolo',
  icp: '闽ICP备18023132号-1',

  // open graph metadata (optional)
  description: 'Thoughts, stories and ideas.',
  socialImageTitle: 'SolaT yolo',
  socialImageSubtitle: 'Hello World! 👋',

  // social usernames (optional)
  twitter: null,  //remove
  github: 'SolaTyolo',
  linkedin: null,   //remove
  dev: 'solatyolo',
  medium: 'solat.yolo',
  email: 'solat.yolo@gmail.com',

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // image CDN host to proxy all image requests through (optional)
  // NOTE: this requires you to set up an external image proxy
  imageCDNHost: null,

  // Utteranc.es comments via GitHub issue comments (optional)
  utterancesGitHubRepo: 'SolaTyolo/nextjs-notion-starter-kit',

  //baidu analytics
  baiduAnalyticsId: '27aa73785891ab409935543eb4f1e1c6',

  // whether or not to enable support for LQIP preview images (optional)
  // NOTE: this requires you to set up Google Firebase and add the environment
  // variables specified in .env.example
  isPreviewImageSupportEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: null
}
