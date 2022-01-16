import { version } from '../package.json'

export default {
  name: 'plugintest',
  version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'accessories',
  type: 'pattern',
  difficulty: 1,
  optionGroups: {
    tests: [
      'plugin',
    ],
    banner: [
      'bannerDy',
      'bannerSpaces',
      'bannerRepeat',
    ],
    bartack: [
      'bartackLength',
      'bartackAngle',
      'bartackDensity',
      'bartackWidth',
      'bartackStart',
      'bartackEnd',
    ]
  },
  measurements: [],
  parts: [
    'banner',
    'bartack',
    //'buttons',
    //'cutonfold',
    //'dimension',
    //'flip',
    //'gore',
    //'grainline',
    //'i18n',
    //'logo',
    //'measurements',
    //'mirror',
    //'notches',
    //'round',
    //'scalebox',
    //'sprinkle',
    //'svgattr',
    //'theme',
    //'title',
    //'validate',
    //'versionfreeSvg',
  ],
  options: {
    plugin: {
      dflt: 'banner',
      list: [
        'banner',
        'bartack',
        'buttons',
        'cutonfold',
        'dimension',
        'flip',
        'gore',
        'grainline',
        'i18n',
        'logo',
        'measurements',
        'mirror',
        'notches',
        'round',
        'scalebox',
        'sprinkle',
        'svgattr',
        'theme',
        'title',
        'validate',
        'versionfreeSvg',
      ]
    },
    // Banner options
    bannerDy: { count: -1, min: -15, max: 15 },
    bannerSpaces: { count: 10, min: 0, max: 20 },
    bannerRepeat: { count: 10, min: 1, max: 20 },
    // Bartack options
    bartackLength: {count: 15, min: 2, max: 100 },
    bartackAngle: {count: 0, min: -360, max: 360 },
    bartackDensity: {count: 3, min: 1, max: 5 },
    bartackWidth: {count: 3, min: 1, max: 5 },
    bartackStart: {pct: 25, min: 0, max: 100 },
    bartackEnd: {pct: 75, min: 0, max: 100 },
  },
}
