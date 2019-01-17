---
group: Global
preview:
  props:
    options:
      - label: Label
      - links:
        - label: Link
          url: https://stenciljs.com
        - label: Submenu (active due to route)
          sref: /global
          links:
          - label: URL Link
            url: https://www.google.com
          - label: Page Link
            sref: /
            
  
---

# picto-menu

Displays a menu for your components

```html
<picto-menu>
  <section>
    <label>Components</label>
    <nav>
      <label>Controls</label> <a href="#">Button</a> <a href="#">Label</a>
      <a href="#">Thing</a>
    </nav>
  </section>
</picto-menu>
```

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                 | Default |
| --------- | --------- | ----------- | -------------------- | ------- |
| `options` | --        |             | `(ILink \| IMenu)[]` | `[]`    |


## Events

| Event            | Description | Detail |
| ---------------- | ----------- | ------ |
| `navLinkClicked` |             | ILink  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
