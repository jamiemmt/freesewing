---
title: title
---

The `title` macro adds a title to a pattern part.  
It is provided by the [title plugin](/reference/plugins/title).

## Signature

```js
macro('title', {
  Boolean append,
  Point at,
  String nr,
  String prefix,
  Number rotation,
  Number scale,
  String title,
})
```

## Example

<Example caption="An example of the title macro">
```js
({ Point, Path, paths, macro, store, part }) => {

  // This is where name/version is supposed to be stored
  store.set('data.version', 3)
  store.set('data.name', 'Example')

  macro('title', {
    nr: 9,
    title: 'The title',
    at: new Point(0,0)
  })

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(0,-50))
    .move(new Point(80,20))

  return part
}
```
</Example>

## Configuration

| Property   | Default | Type                | Description |
| ----------:| :-----: | ------------------- | ----------- |
| `at`       |         | [Point](/reference/api/point) | The point at which to insert the title |
| `nr`       |         | String              | The number of the pattern part |
| `title`    |         | String              | The name of the pattern part. If title is not set or is an empty string, this won't be rendered, and the version will go beneath the nr.|
| `prefix`   |         | String              | A prefix to add to the created points. This allow for more than 1 title per part, as long as you give them a different prefix.|
| `append`   | `false` | Boolean             | Set this to `true` to append the `nr` to any text already set in Point `at`'s attributes, rather than overwrite it |
| `rotation` | 0       | Number | An optional rotation in degrees |
| `scale`    | 1       | Number | An optional scaling factor |
