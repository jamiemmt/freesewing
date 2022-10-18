import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { back } from './back.mjs'
import { backt } from './backt.mjs'

import { frontSideDart } from './front-side-dart.mjs'

import { fst } from './fst.mjs'

const Moulage = new Design({
  data,
  parts: [back, backt, frontSideDart, fst],
})

export { back, frontSideDart, Moulage }
