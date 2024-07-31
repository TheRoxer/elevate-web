import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {},
  },

  env: {
    url: "http://51.38.131.177:3000/",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
