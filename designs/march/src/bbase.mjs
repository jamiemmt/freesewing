import { pluginBundle } from '@freesewing/plugin-bundle'

function bdraftCathrinBase({ measurements, options, store, points, paths, Point, Path, part }) {
  // Where to divide our corset into panels
  function fhyp(x, y) {
    return Math.sqrt(x * x + y * y)
  }
  function fside(x, y) {
    return Math.sqrt(Math.abs(x * x - y * y))
  }
  function yintersect(line, yloc) {
    let t = line.intersectsY(yloc)
    if (t.length == 0) {
      throw new Error('no intersection y.')
    }
    return t
  }
  function xintersect(line, xloc) {
    let t = line.intersectsX(xloc)
    if (t.length == 0) {
      throw new Error('no intersection x.')
    }
    return t
  }
  function xloc(line, yloc) {
    return yintersect(line, yloc)[0].x
  }
  function yloc(line, xloc) {
    return xintersect(line, xloc)[0].y
  }
  function centered_dart(p1, p2, dlen) {
    let xmin = Math.min(p1.x, p2.x)
    let ymin = Math.min(p1.y, p2.y)
    let half_way = new Point(xmin + Math.abs(p1.x - p2.x) / 2, ymin + Math.abs(p1.y - p2.y) / 2)
    let complete_len = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y))
    let fracy = dlen / complete_len
    points.pointl = new Point(
      xmin + ((1 - fracy) / 2) * Math.abs(p1.x - p2.x),
      ymin + ((1 - fracy) / 2) * Math.abs(p1.y - p2.y)
    )
    points.pointr = new Point(
      xmin + ((1 - fracy) / 2) * Math.abs(p1.x - p2.x) + fracy * Math.abs(p1.x - p2.x),
      ymin + ((1 - fracy) / 2) * Math.abs(p1.y - p2.y) + fracy * Math.abs(p1.y - p2.y)
    )
    return [points.pointl, points.pointr]
  }

  let neck = measurements.neck
  let shoulder = measurements.shoulder
  let front_length = measurements.frontLength
  let back_length = measurements.backLength
  let figure_length = measurements.figureLength
  let figure_breadth = measurements.figureBreadth
  let cross_front = measurements.crossFront
  let cross_back = measurements.crossBack
  let bust = measurements.chest
  let underbust = measurements.underbust
  let waist = measurements.waist
  let hhip = measurements.hipsCircumference
  let lhip = measurements.seatCircumference
  let side = measurements.side
  let armhole = measurements.armhole
  let waistToHHip = measurements.waistToHHip
  let waistToLHip = measurements.waistToLHip

  let neck_f = (neck / 6) * 1.1
  let neck_b = (neck / 6) * 1.17
  let figure_breadth2 = figure_breadth / 2
  let xf = cross_front / 2
  let xb = cross_back / 2
  let bust4 = bust / 4
  let bust_f = bust4 * (1 + 1 / 46)
  let bust_b = bust4 * (1 - 1 / 46)
  let ub = underbust + 5
  let cup = bust - underbust
  let waist_4 = waist / 4
  let waist_f = waist_4 * 1.04
  let waist_b = waist_4 * 0.96
  let hhip_4 = hhip / 4.0
  let hhip_f = hhip_4 * 1.03
  let hhip_b = hhip_4 * 0.97
  let lhip_4 = lhip / 4
  let lhip_f = lhip_4 * 1.03
  let lhip_b = lhip_4 * 0.97
  let ah_2 = armhole / 2
  let ah_f = ah_2 * 1.03
  let ah_b = ah_2 * 0.97

  points.A = new Point(0, 80) //.addCircle(3, 'lining').addCircle(20, 'fabric')//.attr('data-text', 'A')
  points.B = new Point(neck_b, 80)
  //.attr('data-text', 'B')
  points.C = new Point(points.B.x, points.B.y - neck_b / 3 + 0.125 * 25)
  //.attr('data-text', 'C')
  points.D = new Point(
    points.C.x + fside(neck_b / 3 + 0.125 * 25, shoulder + 9.25),
    points.A.y + 6.5
  )
  //.attr('data-text', 'D')
  let sfrac = (shoulder * 0.5 * 1) / (shoulder + 9.25)
  points.E = new Point(
    points.D.x - sfrac * (points.D.x - points.C.x),
    points.D.y - sfrac * (points.D.y - points.C.y)
  )
  //.attr('data-text', 'E')
  points.F = new Point(
    points.D.x - (1 - sfrac) * (points.D.x - points.C.x),
    points.D.y - (1 - sfrac) * (points.D.y - points.C.y)
  )
  //.attr('data-text', 'F')

  // points.bottom = new Point(0, 100+ measurements.hpsToWaistFront + measurements.waistToLHip)

  let lh_back = measurements.bottomCircumference / 4 - 6.35
  let hh_back = measurements.hips / 4 - 6.35
  let lh = back_length + waistToLHip
  let hh = back_length + waistToHHip

  // points.Bust2 = new Point(0, points.A.y + measurements.hpsToBust)
  //.attr('data-text', 'bust')
  points.Bustf = new Point(0, points.A.y + back_length / 2)
  //.attr('data-text', 'bust-test')
  points.xb = new Point(0, points.A.y + back_length / 4)
  //      //.attr('data-text', 'xb')
  points.xbo = new Point(170, points.A.y + back_length / 4)
  //.attr('data-text', 'xb-o')
  // G is actually where it should be for the waistgood.
  points.G = new Point(0, points.A.y + back_length)
  //.attr('data-text', 'G')
  //	points.Real = new Point(points.G.x, points.G.y - back_length)//.attr('data-text', 'FFFFFF')
  points.WWaist = new Point(lh_back, points.A.y + back_length)
  //.attr('data-text', 'OW')
  points.H = new Point(points.G.x + 0.375 * 25, points.G.y)
  //.attr('data-text', 'H')
  points.R = new Point(points.H.x, points.H.y + 12.5)
  points.I = new Point(points.G.x, points.G.y + 25 * 7)
  //.attr('data-text', 'I')
  points.J = new Point(points.xb.x, points.xb.y)
  //.attr('data-text', 'J')

  points.K = new Point(points.H.x + waist_b / 2, points.H.y)
  //.attr('data-text', 'K')

  points.L = new Point(points.H.x + waist_b / 2 + 20 - 0.375 * 25, points.H.y) // again this dart size should be custom, it plus H's sway in should be the front dart
  //.attr('data-text', 'L')
  points.midwd = new Point(points.L.x - (20 - 0.375 * 25) / 2, points.L.y)
  //.attr('data-text', 'midw')
  points.M = new Point(points.L.x + waist_b / 2, points.L.y)
  //.attr('data-text', 'M')
  points.LHip = new Point(0, points.A.y + lh) //.attr('data-text', 'LH')
  points.N = new Point(points.midwd.x, points.LHip.y)
  //.attr('data-text', 'N')
  points.O = new Point(points.midwd.x, points.LHip.y - 75)
  //.attr('data-text', 'O')
  points.P = new Point(points.L.x, points.L.y + 12.5)
  points.Q = new Point(points.K.x, points.K.y + 12.5)

  points.HHip = new Point(0, points.A.y + hh)
  //.attr('data-text', 'HH')
  points.LHip = new Point(0, points.A.y + lh)
  //.attr('data-text', 'LH')
  points.LHipOuter = new Point(lh_back, points.LHip.y)
  points.HHipOuter = new Point(hh_back, points.HHip.y)

  paths.seam1 = new Path()
    .move(points.J)
    .line(points.A)
    .line(points.B)
    .line(points.C)
    .line(points.D)
    .line(points.E)
    .move(points.xb)
    .line(points.H)
    .line(points.M)
    .line(points.H)
    .line(points.R)
    .line(points.I)
    .move(points.midwd)
    .attr('class', 'fabric')
    .hide()

  paths.waistdart = new Path()
    .move(points.L)
    .line(points.P)
    .line(points.O)
    .line(points.Q)
    .line(points.K)
    .move(points.R)
    .move(points.M)
    .line(points.P)
    .move(points.P)
    .line(points.R)
    .attr('class', 'fabric')
    .hide()

  let isects = yintersect(paths.waistdart, points.HHipOuter.y)

  let addi = Math.abs(isects[0].x - isects[1].x)
  //  throw new Error ("addi is "+ addi)
  let xl = xloc(paths.seam1, points.HHipOuter.y)

  let taddi = addi + xl
  points.T = new Point(taddi + hh_back, points.HHip.y) //.attr('data-text', 'T')
  // CRUCIAL check if T is in the right place.
  points.U = new Point(points.LHip.x, points.LHip.y)

  points.V = new Point(points.LHipOuter.x, points.LHipOuter.y)

  points.W = new Point(points.J.x + xb, points.J.y) //.attr('data-text', 'W')
  let sectn = yintersect(paths.seam1, points.Bustf.y)
  points.X = sectn[0] //.attr('data-text', 'X')
  points.Y = new Point(points.X.x + bust_b, points.X.y) //.attr('data-text', 'Y')
  points.Z = new Point(points.Y.x, points.M.y - fside(points.Y.x - points.M.x, side)) //.attr('data-text', 'Z')
  points.a = new Point(0, points.Z.y)

  paths.side = new Path()
    .move(points.M)
    .line(points.T)
    .line(points.V)
    .line(points.U)
    .line(points.I)
    .move(points.M)
    .line(points.Z)
    .line(points.a)
    .attr('class', 'fabric')
    .hide()
  let sfract =
    (3 * 25) /
    Math.sqrt(
      (points.M.y - points.Z.y) * (points.M.y - points.Z.y),
      (points.M.x - points.Z.x) * (points.M.x - points.Z.x)
    )
  //   throw new Error ("the frac is " + sfract)
  paths.lside = new Path().move(points.M).line(points.Z).hide()

  points.b = paths.lside.shiftFractionAlong(sfract)
  points.bin = new Point(points.b.x - 25 * 0.125, points.b.y)
  points.sidec = new Point(points.bin.x - 6, points.bin.y)
  paths.scurve = new Path().move(points.M)._curve(points.sidec, points.Z).hide()

  let ydart = points.Z.y + 25
  paths.dartn = new Path().move(points.E).line(points.K).hide()
  let sectd = yintersect(paths.dartn, ydart)

  points.c = sectd[0] //.attr('data-text', 'c')
  paths.wdart = new Path().move(points.E).line(points.c).hide()
  //	    .line(points.F)
  let shfrac =
    (3.5 * 25) /
    Math.sqrt(
      (points.E.y - points.c.y) * (points.E.y - points.c.y),
      (points.E.x - points.c.x) * (points.E.x - points.c.x)
    )
  let sectsh = paths.wdart.shiftAlong(3.5 * 25)
  paths.one = new Path().move(points.c).line(points.L).hide()
  points.d = sectsh
  points.e = new Point(points.W.x, points.Z.y)
  paths.dw = new Path().move(points.W).line(points.e).hide()
  points.f = new Point(points.e.x + 25 / Math.sqrt(2) - 5, points.e.y - 25 / Math.sqrt(2) + 10)
  ;(points.arm = new Point(points.e.x + 20, points.e.y)),
    (points.arm2 = new Point(points.e.x + 35, points.e.y)),
    (points.arm3 = new Point(points.xbo.x - 10, points.xbo.y + 55))
  paths.armhole = new Path()
    .move(points.Z)
    .curve(points.Z, points.e, points.e) // CRITICAL needs to end up on f, haven't fixed yet
    .curve(points.e, points.arm3, points.xbo)
    .curve(points.xbo, points.D, points.D)
    .hide()
  points.g = new Point(points.B.x - 12.5 / Math.sqrt(2), points.B.y - 12.5 / Math.sqrt(2))
  paths.neck = new Path().move(points.C).curve(points.C, points.B, points.A).hide()
  let ntrials = 1
  points.h = points.D

  // critical this should be like 5 mm or less
  // also critical I think we should be doing this but only before we fix the angle
  /*
      while (Math.abs( paths.armhole.length() - ah_b)>8 && ntrials < 25) {
      ntrials++
      if (paths.armhole.length() - ah_b > 0) {
      points.h = paths.armhole.shiftAlong(ah_b).attr('data-text', 'Correct shoulder')
      points.D = points.h
      paths.armhole = new Path()
      .move(points.Z)
      .curve(points.Z, points.e, points.f)
      .curve(points.f, points.f, points.D)
      paths.shoulder = new Path()
      .move(points.C)
      .line(points.h)
      points.j = paths.shoulder.shiftAlong(shoulder/2)
      points.i = paths.shoulder.shiftAlong(shoulder/2 + 9.25)
      paths.ndart = new Path()
      .move(points.i)
      .line(points.K)
      points.k = paths.ndart.shiftAlong(3.5 * 25)
      paths.dartdart = new Path()
      .move(points.k)
      .line(points.j)
      // eventually should move c and waist dart over if this moved much
      // also should straighten out should once the dart is closed
      } else { //CRITICAL I think this needs to be fixed
      //	throw new Error("I don't think we should have to raise the shoulder")
      }
      }*/

  return part
}

export const bbase = {
  name: 'cathrin.bbase',
  hide: true,
  measurements: [
    'underbust',
    'bust',
    'waist',
    'hipsCircumference',
    'seatCircumference',
    'neck',
    'armhole',
    'waistToUnderbust',
    'waistToHHip',
    'waistToLHip',
    'side',
    'shoulder',
    'frontLength',
    'backLength',
    'figureLength',
    'figureBreadth',
    'crossFront',
    'crossBack',
  ],
  options: {
    waistReduction: { pct: 10, min: 2, max: 20, menu: 'fit' },
    panels: { list: ['11', '13'], dflt: '13', menu: 'fit' },
    backOpening: { pct: 4, min: 3, max: 10, menu: 'style' },
    backRise: { pct: 15, min: 1, max: 25, menu: 'style' },
    backDrop: { pct: 2, min: 0, max: 5, menu: 'style' },
    frontRise: { pct: 4, min: 0.1, max: 8, menu: 'style' },
    frontDrop: { pct: 5, min: 0, max: 10, menu: 'style' },
    hipRise: { pct: 5, min: 0, max: 15, menu: 'style' },
  },
  draft: bdraftCathrinBase,
}
