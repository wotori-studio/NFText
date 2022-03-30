const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

// module.exports = withPlugins([
// [optimizedImages, {
/* config for next-optimized-images */
// }],

// your other plugins here

// ]);

// https://nextjs.org/docs/migrating/incremental-adoption#micro-frontends-with-monorepos-and-subdomains
module.exports = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `https://nftext.wotori.com/:path*`,
        },
      ],
    };
  },
};
