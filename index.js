import path from "node:path";
import doUniqCss from "./do-uniq-css.js";

const data = {};

export const setup = (build) => {
    build.onResolve({ filter: /\.uniq\.css$/ }, (args) => {
        const file = path.resolve(args.resolveDir, args.path);
        const namespace = data[file] ? "uniqcss-parsed" : "uniqcss";

        return {
            path: args.path,
            namespace,
            pluginData: {
                file,
                resolveDir: args.resolveDir,
                filePath: args.path,
            }
        }
    });

    build.onLoad({ filter: /.*/, namespace: 'uniqcss' }, (args) => {
        const { file, filePath } = args.pluginData;
        const result = doUniqCss({ file });

        data[file] = result.css;

        const response = {
            contents: `import "${file}";export default ${JSON.stringify(result.map)};`,
            loader: 'js',
            resolveDir: args.pluginData.resolveDir,
        };

        return response;
    });

    build.onLoad({ filter: /.*/, namespace: 'uniqcss-parsed' }, (args) => {
        const { file } = args.pluginData;

        const response = {
            contents: data[file],
            loader: "css",
            resolveDir: args.pluginData.resolveDir,
        }

        data[file] = "";

        return response;
    });
}

const uniqcss = () => {
    return {
        name: "uniqcss",
        setup: (build) => setup(build),
    };
}

export default uniqcss;