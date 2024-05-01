![GitHub](https://img.shields.io/github/license/dym5-official/uniqcss?style=flat-square)
![npm](https://img.shields.io/npm/v/uniqcss?label=version&logo=npm&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/dym5-official/uniqcss?style=flat-square)

# uniqcss

An esbuild plugin for .uniq.css.

## Example

```jsx
import esbuild from 'esbuild';
import uniqcss from 'uniqcss';

await esbuild.build({
    plugins: [
        uniqcss()
    ]
})
```

Currently, this plugin does not accept any options.