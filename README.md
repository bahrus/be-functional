# be-functional

## Working like it's '95 [TODO]

```html
<div be-functional='{
    "click": "my-script:yawnAndStretch"
}'>Tumble out of bed</div>
...
<script nomodule=ish id=my-script>
export const yawnAndStretch = e => {
    event.target.textContent = 'Try to come to life';
}
</script>
```