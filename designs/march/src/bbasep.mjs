import { bbase } from './bbase.mjs'
import { pluginBundle } from '@freesewing/plugin-bundle'
import { bpanels } from './bpanels.mjs'
import { bdraftPanel1ab } from './bpanel1ab.mjs'

function bdraftBase({ measurements, options, store, points, paths, Point, Path, part }) {
  paths.side.unhide()
  paths.seam1.unhide()
  paths.waistdart.unhide()
  paths.lside.unhide()
  paths.scurve.unhide()
  paths.dartn.unhide()
  paths.wdart.unhide()
  paths.one.unhide()
  paths.dw.unhide()
  paths.armhole.unhide()

  return part
}

export const bbasep = {
  name: 'cathrin.bbasep',
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
  from: bbase,
  draft: bdraftBase,
}
