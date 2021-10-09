# be-functional

## Working like it's '95 [TODO]

```html
<div be-functional='{
    "click": "myScript:yawnAndStretch"
}'>Tumble out of bed</div>
...
<script nomodule=ish id=myScript>
export function yawnAndStretch(){
    event.target.textContent = 'Try to come to life';
}
</script>
```