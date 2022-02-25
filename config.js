const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://cloud.sdk.xyz',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: 'https://cdn.svgporn.com/logos/google-cloud.svg',
    logoLink: 'https://cloud.sdk.xyz',
    title:
      "<a href='https://cloud.sdk.xyz/'>Cloud</a>",
    githubUrl: 'https://github.com/sundoforce/cloud',
    helpUrl: '',
    tweetText: '',
    social: `<li>
		    <a href="https://www.facebook.com/groups/gcpkr" target="_blank" rel="facebook">
		      <div class="twitterBtn">
		        <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/twitter-brands-block.svg' alt={'Facebook'}/>
		      </div>
		    </a>
		  </li>
			<li>
		    <a href="https://www.facebook.com/groups/azurekr" target="_blank" rel="facebook">
		      <div class="discordBtn">
		        <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/discord-brands-block.svg' alt={'FaceBook'}/>
		      </div>
		    </a>
		  </li>`,
    links: [{ text: '', link: '' }],
    search: {
      enabled: false,
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/introduction', // add trailing slash if enabled above
      '/qwiklabs', // add trailing slash if enabled above
      '/gcp',
      '/aws',
      '/azure',
    ],
    collapsedNav: [
      '/aws', // add trailing slash if enabled above
      '/azure', // add trailing slash if enabled above
    ],
    links: [{ text: 'Amazon Group', link: 'https://www.facebook.com/groups/awskr'},
            { text: 'Azure Group', link: 'https://www.facebook.com/groups/azurekr' },
            { text: 'GCP Group', link: 'https://www.facebook.com/groups/gcpkr'},
            { text: 'Terraform Group', link: 'https://www.facebook.com/groups/terraform'}],
    frontline: false,
    ignoreIndex: true,
    title:
      "<a href='https://thundercloud.day'>Thundercloud</a><div class='greenCircle'></div><a href='https://javascript.sdk.xyz'>Javascript</a>",
  },
  siteMetadata: {
    title: 'Cloud Map | sdk',
    description: 'Documentation built with mdx. Powering https://sdk.xyz',
    ogImage: null,
    docsLocation: 'https://github.com/sundoforce/cloudmap/tree/master/content',
    favicon: 'https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Cloud',
      short_name: 'cloud',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
