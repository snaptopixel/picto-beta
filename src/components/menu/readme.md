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

Navigation menu with support for search, grouping, routing, etc. Used as the left-hand menu in the Picto ui.

```html
<picto-menu ref='menu'></picto-menu>
<script>
  menu.options = [
    {
      label: 'Label'
    },
    {
      links: [
        {
          label: 'Link',
          href: 'https://stenciljs.com'
        },
        {
          label: 'Submenu (active due to route)',
          sref: '/global',
          links: [
            {label: 'URL Link', href: 'https://www.google.com'},
            {label: 'Page Link', sref: '/'}
          ]
        }
      ]
    }
  ]
</script>
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
