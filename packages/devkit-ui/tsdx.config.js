const replace = require("@rollup/plugin-replace");

module.exports = {
  rollup(config, opts) {
    // esm config
    if (opts.format === "esm") {
      config = { ...config, preserveModules: true };
      config.output = {
        ...config.output,
        dir: "dist/",
        entryFileNames: "[name].esm.js",
      };
      delete config.output.file;
    }

    // plugin-replace deprecated warning
    config.plugins = config.plugins.map((p) =>
      p.name === "replace"
        ? replace({
            "process.env.NODE_ENV": JSON.stringify(opts.env),
            preventAssignment: true,
          })
        : p
    );

    // return config
    return config;
  },
};
