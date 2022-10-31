import { base } from './base.mjs'
import { pluginBundle } from '@freesewing/plugin-bundle'
import { panels } from './panels.mjs'
import { draftPanel1ab } from './panel1ab.mjs'

function draftBase({ measurements, options, store, points, paths, Point, Path, part }) {
  paths.outline.hide()
  paths.side.unhide()
  paths.side2.unhide()
  paths.saBase.unhide()
  paths.shoulder.unhide()
  paths.saBase1.unhide()
  paths.armhole.unhide()

  return part
}

export const basep = {
  name: 'cathrin.basep',
  //  hide: true,
  measurements: [
    'underbust',
    'waist',
    'hipsCircumference',
    'hips',
    'waistToUnderbust',
    'waistToHips',
    'neck',
    'shoulder',
    'frontLength',
    'backLength',
    'figureLength',
    'figureBreadth',
    'crossFront',
    'crossBack',
    'bust',
    'seatCircumference',
    'lhip',
    'side',
    'armhole',
    'waistToHHip',
    'waistToLHip',
  ],
  from: base,
  draft: draftBase,
}
