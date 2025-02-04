---
title: Pattern.getRenderProps()
---

The `Pattern.getRenderProps()` method will return an object that
facilitates rendered the pattern by an external renderer such as
a React component. It should only be called after calling `Pattern.draft()`.

## Pattern.getRenderProps() signature

```js
Object pattern.getRenderProps()
```

## Pattern.getRenderProps() example

```js
import { Aaron } from "@freesewing/aaron"
import { cisFemaleAdult34 } from "@freesewing/models"

const pattern = new Aaron({
  measurements: cisFemaleAdult34
})

const props = pattern.draft().getRenderProps()
```

## Pattern.getRenderProps() returned object

The `Pattern.getRenderProps()` method returns an object with 
the following properties:

| Property | Description |
| --------:| ----------- |
| `autoLayout` | An object describing the (automated) pattern layout |
| `height` | Height of the drafted pattern in `mm` |
| `logs` | The logs generated by the pattern |
| `parts` | A plain object holding the drafted parts |
| `settings` | The (sets of) settings used to draft the pattern |
| `stacks` | A plain object holding the drafted stacks |
| `svg` | An [Svg Object](/reference/api/svg/) object with the `preRender` hook applied |
| `width` | Widht of the drafted pattern in `mm` |
