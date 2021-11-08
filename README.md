# be-functional

## Working like it's '95

```html
<div be-functional='{
    "click": {
        "from": "my-script",
        "fn": "yawnAndStretch"
    }
}'>Tumble out of bed</div>
...
<script nomodule id=my-script be-exportable>
export const yawnAndStretch = e => {
    e.target.textContent = 'Try to come to life';
}
</script>
```

