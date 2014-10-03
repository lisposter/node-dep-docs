# dep-docs (in dev... now)
[![NPM version](https://img.shields.io/npm/v/dep-docs.svg?style=flat)](https://www.npmjs.org/package/dep-docs)

a simple tools to collect node modules's docs(readme) in your project.


## API sample

```js
var depDocs = requrie('dep-docs');

var docs = depDocs('./');
```

result's format:

```js
[
    [readmePath1, readmePath2, ...],
    [module1, module2, ...]
]
```
first array is the readme path list,
the second array is the module name list of those module didn't has a readme file.

## CLI

```sh
$ docs ./
```

This command will generate html files from modules' `readmea` in `node_modules/.docs` and a `_toc.html` file.

If you are using Mac OS, the `_toc.html` will be opened with your default browser.

## License

MIT © [Leigh Zhu](http://zhu.li)
