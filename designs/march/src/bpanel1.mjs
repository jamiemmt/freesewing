import { pluginBundle } from '@freesewing/plugin-bundle'
import { bpanels } from './bpanels.mjs'
import { bdraftPanel1ab } from './bpanel1ab.mjs'

function draftCathrinPanel1(params) {
  const { macro, sa, paths, points, options, complete, paperless, part } = params

  delete paths.outline
  paths.three.unhide().close().reverse()

  points.title = points.X
  macro('title', {
    nr: 5,
    title: 'back neck',
    at: points.title,
  })
  if (sa) paths.sa3 = paths.three.reverse().offset(sa).attr('class', 'fabric sa').close()

  /*  this part to replace
    //    points.anchor = points.top.clone()// topCF.clone()
    
    paths.side1.unhide()
    paths.side2.hide()
    paths.side3.hide()
    paths.side4.hide()
  points.title = points.Y// waistCF.shiftFractionTowards(points.underbustGap1Left, 0.5)
    macro('title', {
      nr: 1,
      title: 'Front lower hip',
      at: points.title,
    })
      if (sa) {
	  paths.sa = paths.side1.offset(sa).attr('class', 'fabric sa').close()
	 
      }

*/

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

export const bpanel1 = {
  name: 'cathrin.bpanel1',
  from: bpanels,
  plugins: [pluginBundle],
  draft: draftCathrinPanel1,
}
