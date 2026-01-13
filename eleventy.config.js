export default function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("assets");

  // Collections
  eleventyConfig.addCollection("fanzins", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/fanzins/*.md").sort((a, b) => {
      return b.date - a.date; // newest first
    });
  });

  eleventyConfig.addCollection("videos", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/videos/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/projects/*.md").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0); // by order field
    });
  });

  eleventyConfig.addCollection("organizations", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/organizations/*.md").sort((a, b) => {
      return a.data.title.localeCompare(b.data.title); // alphabetical
    });
  });

  eleventyConfig.addCollection("campaigns", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/campaigns/*.md").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0); // by order field
    });
  });

  // Filters
  eleventyConfig.addFilter("dateFormat", function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  eleventyConfig.addFilter("filterUpcoming", function(videos, upcoming) {
    return videos.filter(v => v.data.upcoming === upcoming);
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
