import { pluginBundle } from '@freesewing/plugin-bundle'
import { panels } from './panels.mjs'
import { draftPanel1ab } from './panel1ab.mjs'

function draftCathrinPanel1(params) {
  const { macro, sa, paths, points, options, complete, paperless, part } = params

  points.anchor = points.top.clone() // topCF.clone()
  delete paths.outline
  paths.side1.unhide()
  paths.side2.hide()
  paths.side3.hide()
  paths.side4.hide()
  /*    paths.side4.unhide()
    paths.side1.unhide()
    paths.side2.unhide()
    delete paths.panel2
    delete paths.panel3
    delete paths.panel4
    delete paths.panel5
    delete paths.panel6
  
   if (complete) {
   macro('cutonfold', {
      to: points.bottomCF,
      from: points.topCF,
      grainline: true,
    })*/
  points.title = points.O // waistCF.shiftFractionTowards(points.underbustGap1Left, 0.5)
  macro('title', {
    nr: 1,
    title: 'Front lower hip',
    at: points.title,
  })
  if (sa) {
    paths.sa = paths.side1.offset(sa).attr('class', 'fabric sa').close()
    /* paths.hi = path.saBase.clone().unhide()
	  points.A = new Point(0, 0).attr('text-attr', 'WTF')
	  paths.sa = paths.hi.offset(sa).attr('class', 'fabric sa')*/
  }

  /*
  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.bottomCF,
      to: points.waistCF,
      x: points.topCF.x - sa - 15,
    })
    macro('vd', {
      from: points.waistCF,
      to: points.topCF,
      x: points.topCF.x - sa - 15,
    })
    macro('vd', {
      from: points.hipsGap1,
      to: points.waistGap1Left,
      x: points.hipsGap1.x + sa + 15,
    })
    macro('vd', {
      from: points.waistGap1Left,
      to: points.underbustGap1Left,
      x: points.hipsGap1.x + sa + 15,
    })
    macro('hd', {
      from: points.bottomCF,
      to: points.hipsGap1,
      y: points.bottomCF.y + sa + 15,
    })
    macro('hd', {
      from: points.topCF,
      to: points.underbustGap1Left,
      y: points.topCF.y - sa - 15,
    })
    macro('ld', {
      from: points.waistCF,
      to: points.waistGap1Left,
    })
  }
*/
  return part
}

export const panel1 = {
  name: 'cathrin.panel1',
  from: panels,
  plugins: [pluginBundle],
  draft: draftCathrinPanel1,
}
