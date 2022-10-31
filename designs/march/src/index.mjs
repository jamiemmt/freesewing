import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
//Parts
import { panel1 } from './panel1.mjs'
import { panel2 } from './panel2.mjs'
import { panel3 } from './panel3.mjs'
import { panel4 } from './panel4.mjs'
/*import { panel5 } from './panel5.mjs'
import { panel6 } from './panel6.mjs'*/
// Skeleton parts for export
import { base } from './base.mjs'
import { panels } from './panels.mjs'
import { basep } from './basep.mjs'

import { bpanel1 } from './bpanel1.mjs'
import { bpanel2 } from './bpanel2.mjs'
import { bpanel3 } from './bpanel3.mjs'
import { bpanel4 } from './bpanel4.mjs'
/*import { panel5 } from './panel5.mjs'
import { panel6 } from './panel6.mjs'*/
// Skeleton parts for export
import { bbase } from './bbase.mjs'
import { bpanels } from './bpanels.mjs'
import { bbasep } from './bbasep.mjs'

// Create design
const March = new Design({
  data,
  parts: [panel1, panel2, panel3, panel4, bpanel1, bpanel2, bpanel3, bpanel4], // basep, bbasep] //panel5, panel6],
})

// Named exports
export {
  panels,
  panel1,
  panel2,
  panel3,
  panel4,
  March,
  bpanels,
  bpanel1,
  bpanel2,
  bpanel3,
  bpanel4,
} //base, basep, bbase  bbasep}//, panel2, panel3, panel4, panel5, panel6, Cathrin }
