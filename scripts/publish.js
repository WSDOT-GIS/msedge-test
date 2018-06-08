/**
 * Publishes the website to GitHub Pages.
 */

const ghpages = require("gh-pages");

ghpages.publish(
  ".",
  {
    src: ["images/*", "src/*", "dist/*", "*.html", "*.css"]
  },
  result => {
    if (!!result) {
      if (result instanceof Error) {
        console.error("error", result);
      } else {
        console.warn("result", result);
      }
    } else {
        console.log("completed");
    }
  }
);
