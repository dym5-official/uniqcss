import { parse } from "postcss";
import Tokenizer from "css-selector-tokenizer";
import traverse from "traverse";
import fs from "node:fs";
import md5 from "md5";

const doUniqCss = (options) => {
    const { file, scope } = options;
    const css = fs.readFileSync(file).toString();
    const ast = parse(css);
    const map = {};

    const hash = (file, selector) => {
        return md5(`${file} ${selector}`).slice(0,8);
    };

    ast.walk((node) => {
        const { selector } = node;

        if ( selector ) {
            const sast = Tokenizer.parse(selector);
            
            traverse(sast).forEach((snode) => {
                if ( ["id", "class"].indexOf(snode?.type) !== -1 ) {
                    const originalName = snode.name;
                    let newSelector;

                    newSelector = `${snode.name}_${hash(file, snode.name)}`;

                    snode.name = newSelector;
                    map[originalName] = newSelector;
                }
            });

            node.selector = Tokenizer.stringify(sast);
            node.selector = scope ? `${scope} ${node.selector}` : node.selector;
        }
    });

    return {
        map,
        css: ast.toString(),
    }
}

export default doUniqCss;