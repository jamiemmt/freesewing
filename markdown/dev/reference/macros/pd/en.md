---
title: pd
---

The `pd` macro adds a _path dimension_ to your pattern, indicating the length
of a path.  It is provided by the [dimension
plugin](/reference/plugins/dimension/).

## Signature

```js
macro('pd', {
  Number d,
  String id,
  Path path,
  Boolean noEndtMarker,
  Boolean noStartMarker,
  String text,
})
```

## Example

<Example caption="An example of a path dimension with the pd macro">
```js
({ Point, Path, paths, macro, part }) => {

  paths.example = new Path()
    .move(new Point(0,0))
    .curve(new Point(20,10), new Point(60,10), new Point(80,0))

  macro('pd', {
    path: paths.example,
    d: 15,
  })

  return part
}
```
</Example>

## Configuration

| Property        | Default | Type                | Description |
|----------------:|---------|---------------------|-------------|
| `path`          |         | [Path](/reference/api/path)   | The path to draw the dimension along |
| `d`             | 0       | Number              | The offset at which to draw the dimension |
| `text`          | Path length | Number          | The text to go on the dimension if not the length of the path |
| `id`            | auto-assigned | String | A custom ID under wich paths and points will be created |
| `noStartMarker` | `false` | Boolean             | Whether to not draw a start marker |
| `noEndMarker`   | `false` | Boolean             | Whether to not draw an end marker |

## Notes

Setting a custom ID will:

- Allow removal of the dimension with [the `rmd` macro](/reference/macros/rmd)
- Prevent removal of the dimension with [the `rmad` macro](/reference/macros/rmad/)
