import { measurements, neckstimate, CISFEMALE, CISMALE } from './neckstimate.mjs'
import { degreeMeasurements } from '../../../config/measurements.mjs'

const getMeasurements = (size, index) => {
  let all = {}
  for (const m of measurements) {
    all[m] = neckstimate(size * 10, m, index)
  }

  return all
}

const multiplyMeasurements = (factor, index) => {
  let all = {}
  const base = index === 0 ? '340' : '380'
  for (const m of measurements) {
    if (degreeMeasurements.indexOf(m) !== -1)
      all[m] = neckstimate(base, m, index) // Don't multiply degrees
    else all[m] = factor * neckstimate(base, m, index)
  }

  return all
}

export const groups = ['adult', 'doll', 'giant']

export const sizes = {
  cisFemaleAdult: [28, 30, 32, 34, 36, 38, 40, 42, 44, 46],
  cisMaleAdult: [32, 34, 36, 38, 40, 42, 44, 46, 48, 50],
  cisFemaleDoll: [10, 20, 30, 40, 50, 60],
  cisMaleDoll: [10, 20, 30, 40, 50, 60],
  cisFemaleGiant: [150, 200, 250, 300],
  cisMaleGiant: [150, 200, 250, 300],
}

let jam = getMeasurements(36, CISFEMALE)
jam.highBust = 899
jam.chestCircumference = 914.4
jam.underbust = 838.2
jam.waistCircumference = 736.6
jam.wastBack = 356.6
jam.bustSpan = 190.55
jam.neckCircumference = 360.7
jam.hpsToBust = 241.3
jam.hpsToWaistFront = 457.2
jam.hpsToWaistBack = 431.8
jam.shouldertoshoulder = 381
jam.waistToHHip = 100
jam.waistToLHip = 203.2
jam.bottomCircumference = 1016
jam.hipsCircumference = 863.6
jam.shoulder = 114.3
jam.front_length = 355.6
jam.back_length = 342.9
jam.hpsToLHipFront = 457.2
jam.hpsToLHipBack = 457.2
jam.figure_length = 209.5
jam.figure_breadth = 196.8
jam.cross_front = 368.3
jam.cross_back = 406.4
jam.armhole = 421.8
jam.seatCircumference = 1016
jam.side = 215.9
jam.hips = 900

export const jamie = jam

let jam2 = getMeasurements(36, CISFEMALE)
jam2.biceps = 317.5 //12.5in
jam2.chestCircumference = 914.4
jam2.bust = 914.4
jam2.underbust = 838.2 //33in
jam2.waistToHHip = 76.2 //3 in
jam2.waistToLHip = 177.8 //7 or 7.5 in
jam2.bottomCircumference = 990.6 //39 in
jam2.hips = 863.6 //34
jam2.highBust = 876.3 //34.5
jam2.shoulder = 127 //5 in
jam2.frontLength = 381 //15
jam2.backLength = 381 //15
jam2.figureLength = 190.5 //7.5
jam2.figureBreadth = 184.15 //7.25
jam2.crossFront = 355.6 //14
jam2.crossBack = 444.5 // 17.5
jam2.armhole = 421.8
jam2.hipsCircumference = 863.6
jam2.seatCircumference = 990.6
jam2.side = 203.2 //8 in
export const jamie2 = jam2

/*ankle: [245, 235],
  biceps: [270, 350],
  bustFront: [480, 560], // FIXME: Estimate
  bustPointToUnderbust: [100, 60], // FIXME: Estimate
  bustSpan: [160, 190], // FIXME: Estimate
  chest: [925, 1000],
  crossSeam: [740, 870],
  crossSeamFront: [370, 410],
  crotchDepth: [270, 340],
  heel: [315, 360],
  head: [565, 590],
  highBust: [865, 1030],
  highBustFront: [440, 570], // FIXME: Estimate
  hips: [900, 840],
  hpsToBust: [275, 280],
  hpsToWaistBack: [395, 470],
  hpsToWaistFront: [400, 460], // FIXME: Estimate
  inseam: [765, 780],
  knee: [380, 410],
  neck: [340, 380],
  seat: [1010, 1020],
  seatBack: [520, 560],
  shoulderSlope: [13, 13],
  shoulderToElbow: [340, 360],
  shoulderToShoulder: [415, 450],
  shoulderToWrist: [590, 630],
  underbust: [780, 980], // FIXME: Estimate
  upperLeg: [570, 625],
  waist: [750, 810],
  waistBack: [380, 410],
  waistToArmhole: [170, 210],
  waistToFloor: [1050, 1160],
  waistToHips: [125, 130],
  waistToKnee: [600, 640],
  waistToSeat: [250, 270],
  waistToUnderbust: [80, 55], // FIXME: Estimate
  waistToUpperLeg: [285, 340],
  wrist: [165, 175],
}*/

export const cisFemaleAdult28 = getMeasurements(28, CISFEMALE)
export const cisFemaleAdult30 = getMeasurements(30, CISFEMALE)
export const cisFemaleAdult32 = getMeasurements(32, CISFEMALE)
export const cisFemaleAdult34 = getMeasurements(34, CISFEMALE)
export const cisFemaleAdult36 = getMeasurements(36, CISFEMALE)
export const cisFemaleAdult38 = getMeasurements(38, CISFEMALE)
export const cisFemaleAdult40 = getMeasurements(40, CISFEMALE)
export const cisFemaleAdult42 = getMeasurements(42, CISFEMALE)
export const cisFemaleAdult44 = getMeasurements(44, CISFEMALE)
export const cisFemaleAdult46 = getMeasurements(46, CISFEMALE)

export const cisMaleAdult32 = getMeasurements(32, CISMALE)
export const cisMaleAdult34 = getMeasurements(34, CISMALE)
export const cisMaleAdult36 = getMeasurements(36, CISMALE)
export const cisMaleAdult38 = getMeasurements(38, CISMALE)
export const cisMaleAdult40 = getMeasurements(40, CISMALE)
export const cisMaleAdult42 = getMeasurements(42, CISMALE)
export const cisMaleAdult44 = getMeasurements(44, CISMALE)
export const cisMaleAdult46 = getMeasurements(46, CISMALE)
export const cisMaleAdult48 = getMeasurements(48, CISMALE)
export const cisMaleAdult50 = getMeasurements(50, CISMALE)

export const cisFemaleDoll10 = multiplyMeasurements(0.1, CISFEMALE)
export const cisFemaleDoll20 = multiplyMeasurements(0.2, CISFEMALE)
export const cisFemaleDoll30 = multiplyMeasurements(0.3, CISFEMALE)
export const cisFemaleDoll40 = multiplyMeasurements(0.4, CISFEMALE)
export const cisFemaleDoll50 = multiplyMeasurements(0.5, CISFEMALE)
export const cisFemaleDoll60 = multiplyMeasurements(0.6, CISFEMALE)

export const cisMaleDoll10 = multiplyMeasurements(0.1, CISMALE)
export const cisMaleDoll20 = multiplyMeasurements(0.2, CISMALE)
export const cisMaleDoll30 = multiplyMeasurements(0.3, CISMALE)
export const cisMaleDoll40 = multiplyMeasurements(0.4, CISMALE)
export const cisMaleDoll50 = multiplyMeasurements(0.5, CISMALE)
export const cisMaleDoll60 = multiplyMeasurements(0.6, CISMALE)

export const cisFemaleGiant150 = multiplyMeasurements(1.5, CISFEMALE)
export const cisFemaleGiant200 = multiplyMeasurements(2, CISFEMALE)
export const cisFemaleGiant250 = multiplyMeasurements(2.5, CISFEMALE)
export const cisFemaleGiant300 = multiplyMeasurements(3, CISFEMALE)

export const cisMaleGiant150 = multiplyMeasurements(1.5, CISMALE)
export const cisMaleGiant200 = multiplyMeasurements(2, CISMALE)
export const cisMaleGiant250 = multiplyMeasurements(2.5, CISMALE)
export const cisMaleGiant300 = multiplyMeasurements(3, CISMALE)

export const cisFemaleAdult = {
  28: cisFemaleAdult28,
  30: cisFemaleAdult30,
  32: cisFemaleAdult32,
  34: cisFemaleAdult34,
  36: cisFemaleAdult36,
  38: cisFemaleAdult38,
  40: cisFemaleAdult40,
  42: cisFemaleAdult42,
  44: cisFemaleAdult44,
  46: cisFemaleAdult46,
  jamie: jamie,
  jamie2: jamie2,
}
export const cisMaleAdult = {
  32: cisMaleAdult32,
  34: cisMaleAdult34,
  36: cisMaleAdult36,
  38: cisMaleAdult38,
  40: cisMaleAdult40,
  42: cisMaleAdult42,
  44: cisMaleAdult44,
  46: cisMaleAdult46,
  48: cisMaleAdult48,
  50: cisMaleAdult50,
}
export const adult = {
  cisFemale: cisFemaleAdult,
  cisMale: cisMaleAdult,
}

export const cisFemaleDoll = {
  10: cisFemaleDoll10,
  20: cisFemaleDoll20,
  30: cisFemaleDoll30,
  40: cisFemaleDoll40,
  50: cisFemaleDoll50,
  60: cisFemaleDoll60,
}
export const cisMaleDoll = {
  10: cisMaleDoll10,
  20: cisMaleDoll20,
  30: cisMaleDoll30,
  40: cisMaleDoll40,
  50: cisMaleDoll50,
  60: cisMaleDoll60,
}
export const doll = {
  cisFemale: cisFemaleDoll,
  cisMale: cisMaleDoll,
}

export const cisFemaleGiant = {
  150: cisFemaleGiant150,
  200: cisFemaleGiant200,
  250: cisFemaleGiant250,
  300: cisFemaleGiant300,
}
export const cisMaleGiant = {
  150: cisMaleGiant150,
  200: cisMaleGiant200,
  250: cisMaleGiant250,
  300: cisMaleGiant300,
}
export const giant = {
  cisFemale: cisFemaleGiant,
  cisMale: cisMaleGiant,
}

export { measurements }
