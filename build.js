const esbuild = require("esbuild");

(async () => {

    await esbuild.build({
        entryPoints: ["index.js"],
        outdir: "uniqcss",
        bundle: true,
        minify: false,
        target: "node16",
        format: "esm",
        external: ["node:fs","node:path"],
        plugins:[]
    });

})();