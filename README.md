# be-functional

## Working like it's '95 [TODO]

```html
<div be-functional='{
    "click": "my-script:yawnAndStretch"
}'>Tumble out of bed</div>
...
<script nomodule id=my-script be-exportable>
export const yawnAndStretch = e => {
    event.target.textContent = 'Try to come to life';
}
</script>
```