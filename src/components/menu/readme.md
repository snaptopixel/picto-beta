---
group: Global
preview:
  props:
    options:
      - label: Label
      - links:
        - label: Link
          href: https://stenciljs.com
        - label: Submenu (active due to route)
          sref: /global
          links:
          - label: URL Link
            href: https://www.google.com
          - label: Page Link
            sref: /
            
  
---

# picto-menu

Displays a menu for your components

<!--
options:
  - label: Label
  - links:
    - label: Link
      href: https://stenciljs.com
    - label: Submenu (active due to route)
      sref: /global
      links:
      - label: URL Link
        href: https://www.google.com
      - label: Page Link
        sref: /
-->
```html
<picto-menu></picto-menu>
```

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                 | Default |
| --------- | --------- | ----------- | -------------------- | ------- |
| `options` | --        |             | `(IMenu \| ILink)[]` | `[]`    |


## Events

| Event            | Description | Type                 |
| ---------------- | ----------- | -------------------- |
| `navLinkClicked` |             | `CustomEvent<ILink>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
