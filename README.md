# be-functional

[![Playwright Tests](https://github.com/bahrus/be-functional/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-functional/actions/workflows/CI.yml)

<a href="https://nodei.co/npm/be-functional/"><img src="https://nodei.co/npm/be-functional.png"></a>


[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-functional?style=for-the-badge)](https://bundlephobia.com/result?p=be-functional)

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-functional?compression=gzip">

See be-overloading

## Working like it's '95

```html
<button be-functional='{
    "click": {
        "scriptRef": "my-script",
        "fn": "yawnAndStretch"
    }
}'>Tumble out of bed</button>
...
<script nomodule id=my-script be-exportable>
export const yawnAndStretch = e => {
    e.target.textContent = 'Try to come to life';
}
</script>
```

## Running locally

1.  Do a git clone or a git fork of repository https://github.com/bahrus/be-functional
2.  Install node.js
3.  Run "npm install" from location of folder created in step 1.
4.  Run npm run serve.  Open browser to http://localhost:3030/demo/

## Using from ESM Module:

```JavaScript
import 'be-functional/be-functional.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-functional';
</script>
```


