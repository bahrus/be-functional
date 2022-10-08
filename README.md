# be-functional

[![Playwright Tests](https://github.com/bahrus/be-functional/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-functional/actions/workflows/CI.yml)

<a href="https://nodei.co/npm/be-functional/"><img src="https://nodei.co/npm/be-functional.png"></a>


[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-functional?style=for-the-badge)](https://bundlephobia.com/result?p=be-functional)

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-functional?compression=gzip">

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

