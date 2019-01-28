# picto-testbed

Basic component used to test the various parts of Picto's documentation rendering.

```html
<picto-testbed ref="target"></picto-testbed>
<br/>
<button ref="button">Call @Method</button>
<script>
  button.addEventListener('click', () => target.method());
</script>
```

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                   | Type                      | Default         |
| ----------- | ------------ | ----------------------------- | ------------------------- | --------------- |
| `arrProp`   | --           | An arry prop w/no default     | `{ message: string; }[]`  | `undefined`     |
| `boolProp`  | `bool-prop`  | A boolean prop w/no default   | `boolean`                 | `undefined`     |
| `numProp`   | `num-prop`   | A number prop w/default       | `number`                  | `1234`          |
| `objProp`   | --           | An object prop w/no default   | `{ message: string; }`    | `undefined`     |
| `strProp`   | `str-prop`   | A string prop w/default       | `string`                  | `'Hello World'` |
| `unionProp` | `union-prop` | A string union prop w/default | `"bar" \| "baz" \| "foo"` | `'bar'`         |


## Events

| Event    | Description                  | Type                  |
| -------- | ---------------------------- | --------------------- |
| `tested` | A test event to demo logging | `CustomEvent<number>` |


## Methods

### `method(a?: string, b?: number, ...rest: any[]) => Promise<number>`

Increments and returns the numProp property

#### Parameters

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `a`    | `string` |             |
| `b`    | `number` |             |
| `rest` | `any[]`  |             |

#### Returns

Type: `Promise<number>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
