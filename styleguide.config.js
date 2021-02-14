const path = require("path");

module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, "src/styleguide/Wrapper"),
  },
  components: "./src/common/components/elements/**/*.js",
};
