---
group: Navigation
preview:
  props:
    to: picto-icon
  innerHTML:
    Go for it
---

# picto-link
Use this component to easily create links within your picto app. Using a component name or page id, the app will figure out the appropriate route and link to it.

```html
<picto-link to='picto-icon'>Link to "picto-icon" component</picto-link>
```

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description               | Type     | Default     |
| -------- | --------- | ------------------------- | -------- | ----------- |
| `to`     | `to`      | Page id or component name | `string` | `undefined` |


## Events

| Event         | Description                                     | Type                  |
| ------------- | ----------------------------------------------- | --------------------- |
| `linkClicked` | Notifies app to navigate to a page or component | `CustomEvent<string>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
