import { pluginBundle } from '@freesewing/plugin-bundle'
import { bpanels } from './bpanels.mjs'

function bdraftCathrinPanel2({ macro, sa, points, paths, Point, complete, paperless, part }) {
  delete paths.outline
  paths.four.unhide()
  points.title = points.c
  macro('title', {
    nr: 6,
    title: 'back shoulder',
    at: points.title,
  })
  if (sa) paths.sa2 = paths.four.offset(sa).attr('class', 'fabric sa').close()

  /*paths.side2.unhide()
    paths.side1.hide()
    paths.side3.hide()
    paths.side4.hide()

  


  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.hipsGap1,
      to: points.hipsGap2,
      y: points.hipsGap1.y + sa + 15,
    })
    macro('ld', {
      from: points.waistGap1Right,
      to: points.waistGap2Left,
    })
    macro('hd', {
      from: points.underbustGap1Right,
      to: points.underbustGap2Left,
      y: points.underbustGap1Right.y - sa - 15,
    })
    macro('vd', {
      from: points.hipsGap1,
      to: points.waistGap1Right,
      x: points.hipsGap1.x - sa - 15,
    })
    macro('vd', {
      from: points.waistGap1Right,
      to: points.underbustGap1Right,
      x: points.hipsGap1.x - sa - 15,
    })
    macro('vd', {
      from: points.hipsGap2,
      to: points.waistGap1Right,
      x: points.hipsGap2.x + sa + 15,
    })
    macro('vd', {
      from: points.waistGap1Right,
      to: points.underbustGap2Left,
      x: points.hipsGap2.x + sa + 15,
    })
  }*/

  return part
}

export const bpanel2 = {
  name: 'cathrin.bpanel2',
  from: bpanels,
  plugins: [pluginBundle],
  draft: bdraftCathrinPanel2,
}
