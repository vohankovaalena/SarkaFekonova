export default function (eleventyConfig) {
  /* Statické soubory projdou beze změny: assets/css, assets/js, assets/img,
     assets/sil a favicon. Cesty ve stylopisu i v HTML tak zůstávají platné. */
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  /* Při úpravě stylů nebo skriptu se prohlížeč obnoví i bez přestavby. */
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
