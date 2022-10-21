import { back } from './back.mjs'

export const front = {
  name: 'marcy.fst',
  after: back,
  draft: ({
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    options,
    complete,
    paperless,
    macro,
    utils,
    measurements = [waistToSeat, waistToLH],
    part,
  }) => {
    // Get to work

    let neck = measurements.neck
    let shoulder = measurements.shoulder
    let front_length = measurements.front_length
    let back_length = measurements.hpsToLHipBack
    let figure_length = measurements.figure_length
    let figure_breadth = measurements.figure_breadth
    let cross_front = measurements.cross_front
    let cross_back = measurements.cross_back
    let bust = measurements.chest
    let underbust = measurements.underbust
    let waist = measurements.waist
    let hhip = measurements.hipsCircumference
    let lhip = measurements.seatCircumference
    let side = measurements.side
    let armhole = measurements.armhole

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
    let ah_f = ah_2 * 0.97
    let ah_b = ah_2 * 1.03

    function fhyp(x, y) {
      return Math.sqrt(x * x + y * y)
    }

    function fside(x, y) {
      return Math.sqrt(Math.abs(x * x - y * y))
    }

    points.cfNeck = new Point(0, measurements.neck * options.collarFactor)
    //added these, for very top and v bottom. How do I change which measurements    points.A = new Point(0, 0).addCircle(3, 'lining').addCircle(20, 'fabric').attr('data-text', "A")
    points.A = new Point(0, 0)
      .addCircle(3, 'lining')
      .addCircle(20, 'fabric')
      .attr('data-text', 'top')

    points.nn = new Point(100, 0).attr('data-text', 'nn')

    points.nnn = new Point(300, 1100)
      .addCircle(3, 'lining')
      .addCircle(20, 'fabric')
      .attr('data-text', 'show')

    points.bottom = new Point(0, measurements.hpsToWaistFront + measurements.waistToLHip)

    let lh_front = measurements.bottomCircumference / 4 + 6.35
    let hh_front = measurements.hips / 4 + 6.35
    let lh = front_length + measurements.waistToLHip
    let hh = front_length + measurements.waistToHHip

    points.neck = new Point(0, 80).attr('data-text', 'A')
    points.necko = new Point(neck_f, 80).attr('data-text', 'B')

    points.C = new Point(neck_f, 80 - neck_b).attr('data-text', 'C')

    points.D = new Point(neck_f, 80 - neck_b / 2).attr('data-text', 'D')

    points.E = new Point(neck_f * 3.5, 80 - neck_b / 2).attr('data-text', 'E')

    let shoulder_len = shoulder + 9.525 // should make this custom but for now it's fine

    points.F = new Point(neck_f + fside(shoulder_len, neck_b / 2), 80 - neck_b / 2).attr(
      'data-text',
      'F'
    )

    let sfrac = (shoulder / shoulder_len) * 0.5
    points.H = new Point(
      neck_f + fside(shoulder_len, neck_b / 2) * (1 - sfrac),
      80 - neck_b / 2 - (neck_b / 2) * sfrac
    ).attr('data-text', 'H')
    points.G = new Point(
      neck_f + fside(shoulder_len, neck_b / 2) * sfrac,
      80 - neck_b / 2 - (neck_b / 2) * (1 - sfrac)
    ).attr('data-text', 'G')

    points.Bust2 = new Point(0, 80 + measurements.hpsToBust).attr('data-text', 'bust')

    let tbust_y = front_length/2

    points.I = new Point(0, 80 + tbust_y).attr('data-text', 'test-bust/I')
    points.J = new Point(bust_f, 80 + tbust_y).attr(
      'data-text',
      'test-bust/J'
    )
    points.K = new Point(figure_breadth2, 80 +  tbust_y).attr(
      'data-text',
      'test-bust/K'
    )

    points.L = new Point(figure_breadth2, 80 + fside(figure_length, figure_breadth2)).attr(
      'data-text',
      'L'
    )
     points.M = new Point(0,points.L.y).attr(
      'data-text',
      'M'
    )

    points.IWaist = new Point(0, 80 + front_length).attr('data-text', 'IWF')
    points.WWaist = new Point(lh_front, 80 + front_length).attr('data-text', 'OWF')
    points.N = new Point(figure_breadth2,  80 + front_length).attr('data-text', 'N')
      .addCircle(3, 'lining')
      .addCircle(20, 'fabric')
   

    points.HHip = new Point(0, 80 +  hh).attr('data-text', 'HHF')
    points.FHHip = new Point(figure_breadth2, 80 + hh).attr('data-text', 'FHF')
    points.HHipOuter = new Point(lh_front, 80 + hh).attr('data-text', 'HHO')
    
    points.LHip = new Point(0, 80 +  lh).attr('data-text', 'LHF')
    points.LHipOuter = new Point(lh_front, 80  +lh).attr('data-text', 'LHO')
    points.O = new Point(figure_breadth2, 80 + lh).attr('data-text', 'O')
   
    let wdiff = lhip - waist
    let wdart = 20 // This is 3/4 inch, should be relative and a function of wdiff eventually. Not actually sure if this is what I want anyway


    points.P = new Point(points.N.x - wdart/2, points.N.y).attr('data-text', 'P')
    
    points.Q = new Point(points.N.x + wdart/2, points.N.y).attr('data-text', 'Q')
    points.R = new Point(points.IWaist.x, points.IWaist.y + 12.5).attr('data-text', 'R')
    points.S = new Point(points.O.x, points.O.y - 75).attr('data-text', 'S')
    points.T = new Point(points.P.x , points.P.y+12.5).attr('data-text', 'T')
    points.U = new Point(points.Q.x, points.Q.y+12.5).attr('data-text', 'U')

    points.V = new Point(points.L.x, points.L.y+18.75).attr('data-text', 'V')
    points.W = new Point(points.M.x+bust_f, points.M.y).attr('data-text', 'W')
    points.Wg = new Point(points.W.x, points.W.y- 100).attr('data-text', 'Ws')

    points.X = new Point(points.IWaist.x + waist_f + wdart, points.IWaist.y).attr('data-text', 'X')
    // This will need to be changed, add in the portion of the dart still here
    let wdart_hh = 6.25
    points.Y = new Point(points.HHip.x + hhip_f + wdart_hh, points.HHip.y).attr('data-text', 'Y')
    points.Z = new Point(points.LHip.x + lhip_f , points.LHip.y).attr('data-text', 'Z')
     points.Z = new Point(points.LHip.x + lhip_f , points.LHip.y).attr('data-text', 'Z')


    let shoulderdartw = .375 * 25 // This is for an A cup, can be modified
    let sidedartw = .75 * 25 // This is also for an A cup. tbm
    let sidew = side + sidedartw
    let yadds = fside(sidew, points.X.x - points.J.x)

    points.a =  new Point(points.J.x , points.X.y - yadds).attr('data-text', 'a')
    points.b =  new Point(0, points.X.y - yadds).attr('data-text', 'b')
    points.c = new Point(points.X.x + .3 * (points.W.x - points.X.x), points.X.y +.3 * (-points.X.y + points.W.y)).attr('data-text', 'c')
    points.c8 = new Point(points.c.x - .125 * 25, points.c.y).attr('data-text', 'c8')
    points.d =  new Point(points.J.x, points.J.y-.5 * 25).attr('data-text', 'd')
    points.e =  new Point(points.J.x, points.J.y+.5 * 25).attr('data-text', 'e')
    points.bdl = new Point(points.V.x + 1/3 * (points.P.x - points.V.x) - .25 * 25, points.V.y + 1/3 * (points.P.y - points.V.y) ).attr('data-text', 'bdl')
       points.bdr = new Point(points.V.x + 1/3 * (points.Q.x - points.V.x) + .25 * 25, points.V.y + 1/3 * (-points.V.y + points.Q.y) ).attr('data-text', 'bdr')
      points.bdrr = new Point(points.Q.x +6, points.Q.y-85 ).attr('data-text', 'bdrr')
       points.bdll = new Point(points.P.x -6, points.P.y-85 ).attr('data-text', 'bdrr')
  
    points.Dd = new Point(0, 0).addCircle(3, 'lining').addCircle(20, 'fabric')

    points.xf = new Point(xf, points.neck.y+3* 25).attr('data-text', 'xf')
    let xff = (points.xf.y - points.H.y)/ (-points.H.y + points.L.y)
    points.f = new Point(points.L.x + xff * (points.H.x - points.L.x) +.125 * 25,  points.xf.y ).attr('data-text', 'f')
   // points.g = new Point(points.L.x + xff * (points.G.x - points.L.x) - .125 * 25, points.f.y).attr('data-text', 'g')
   // I'm totally guessing on this width. It should be the width of the dart at this pt which is .125 * 25 + the width before we bumped it out
   points.g = new Point(points.xf.x+ .25 * 25, points.xf.y).attr('data-text', 'g')
   points.h = new Point(points.g.x, points.a.y).attr('data-text', 'h')
   points.i = new Point(points.h.x + 25/Math.sqrt(2), points.h.y-  25/Math.sqrt(2)).attr('data-text', 'i')

   let ahd = .375 * 25 // based on a cup probably should be relative
   points.j = new Point(points.i.x + .5 * ahd/Math.sqrt(2),points.i.y + .5 * ahd/Math.sqrt(2)).attr('data-text', 'j')
   points.k = new Point(points.i.x - .5 * ahd/Math.sqrt(2),points.i.y - .5 * ahd/Math.sqrt(2)).attr('data-text', 'k')
  points.l = new Point(points.necko.x - 25/Math.sqrt(2), points.necko.y - 25/Math.sqrt(2) ).attr('data-text', 'lllllll')

  let ahtotal = armhole + ahd
  // probably should check that this is what the armhole ends up being ahtotal, the primary change will be to bring F down to make it the right length

/*
    points.hps = new Point(measurements.neck * options.neckWidthFront, 0)
    points.cfNeckCp1 = new Point(points.hps.x * 0.8, points.cfNeck.y)
    points.hpsCp2 = new Point(points.hps.x, points.cfNeck.y / 2)
    let slope = measurements.shoulderSlope * (2 - options.shoulderSlopeBack) * -1
    let xShoulder =
      ((measurements.shoulderToShoulder * (1 + options.shoulderToShoulderEase)) / 2) *
      options.frontShoulderWidth
    points.shoulder = utils.beamsIntersect(
      new Point(xShoulder, 0),
      new Point(xShoulder, 100),
      points.hps,
      points.hps.shift(slope, 85)
    )
    // Front is more narrow
    points.ex = points.shoulder.shift(180, 10)
    points.armholePitch = new Point(
      points.shoulder.x * options.acrossBackFactor,
      measurements.hpsToWaistBack * options.frontArmholePitchDepth
    )
    // Find out location of the armhole
    let armholeDepth = measurements.hpsToWaistBack * options.armholeDepth + points.shoulder.y
    points.armhole = new Point(
      (measurements.highBust / 4) * (1 + options.chestEase) * options.highBustWidth,
      armholeDepth
    )

    // Bust point
    points.bust = new Point(
      measurements.bustSpan * 0.5 * (1 + options.bustSpanEase),
      measurements.hpsToBust
    )

    // Construct armhole
    points.armholeCp2 = points.armhole.shift(180, 40)
    points.armholePitchCp1 = points.armholePitch.shift(-90, 40)
    points.armholeCpTarget = utils.beamsIntersect(
      points.armhole,
      points.armhole.shift(180, 40),
      points.armholePitch,
      points.armholePitch.shift(-90, 40)
    )
    points.armholeCp2 = points.armhole.shiftFractionTowards(
      points.armholeCpTarget,
      options.frontArmholeCurvature
    )
    points.armholePitchCp1 = points.armholePitch.shiftFractionTowards(
      points.armholeCpTarget,
      options.frontArmholeCurvature
    )
    points.armholePitchCp2 = points.armholePitchCp1.rotate(180, points.armholePitch)
    // Dolls need clothes too
    if (points.armholePitchCp2.y < points.shoulder.y) {
      points.armholePitchCp2.y = points.shoulder.y + points.shoulder.dy(points.armholePitch) / 2
    }

    // Draft body without breasts
    points.cfHem = new Point(0, measurements.hpsToWaistFront)
    points.sideHem = new Point(points.armhole.x, points.cfHem.y)

    // Create room for breasts
    // How much horizontal room do we need to add?
    let target =
      (measurements.chest * (1 + options.chestEase - options.fullChestEaseReduction)) / 2 -
      store.get('bustWidthBack')
    let rot = ['armhole', 'armholeCp2', 'armholePitchCp1', 'bustB', 'sideHem']
    // Rotate until we've got enough room
    points.bustA = points.bust.clone()
    points.bustB = points.bust.clone()
    points.bustSide = utils.beamIntersectsY(points.armhole, points.sideHem, points.bust.y)
    let steps = 0
    let angle = 0
    let increment = 0.5
    while (points.bustSide.x < target && steps < 80) {
      for (const p of rot) points[p] = points[p].rotate(increment, points.armholePitch)
      angle += increment
      points.bustSide = utils.beamIntersectsY(points.armhole, points.sideHem, points.bust.y)
      steps++
    }
    store.set('bustDartAngleSide', angle)
    points.cfBust = new Point(0, points.bust.y)

    // Smooth out the armhole pitch point
    points.pitchMax = utils.beamsIntersect(
      points.armholePitchCp1,
      points.armholePitchCp2,
      points.armholePitch,
      points.armholePitch.shift(points.armholePitchCp1.angle(points.armholePitchCp2) - 90, 30)
    )
    points.armholePitch = points.armholePitch.shiftFractionTowards(points.pitchMax, 0.2)
    points.armholePitchCp1 = points.armholePitch.shiftFractionTowards(
      points.armholePitchCp2.rotate(180, points.armholePitch),
      0.8
    )

    // Bust dart
    points.bustDartTop = utils.beamsIntersect(
      points.armhole,
      points.sideHem,
      points.bust,
      points.bust.shift(0, 100)
    )
    points.bustDartBottom = points.bustDartTop.rotate(angle * -1, points.bust)
    points.bustDartMiddle = points.bustDartTop.shiftFractionTowards(points.bustDartBottom, 0.5)
    points.bustDartTip = points.bustDartMiddle.shiftFractionTowards(
      points.bust,
      options.bustDartLength
    )
    points.bustDartEdge = utils.beamsIntersect(
      points.bust,
      points.bustDartMiddle,
      points.armhole,
      points.bustDartTop
    )
    points.bustDartCpTop = points.bust
      .shiftFractionTowards(points.bustDartTop, 0.666)
      .rotate(5 * options.bustDartCurve, points.bust)
    points.bustDartCpBottom = points.bust
      .shiftFractionTowards(points.bustDartBottom, 0.666)
      .rotate(-5 * options.bustDartCurve, points.bust)

    // Side seam length
    let aboveDart = points.armhole.dist(points.bustDartTop)
    let belowDart = store.get('sideSeamLength') - aboveDart
    points.sideHemInitial = points.bustDartBottom
      .shift(-90, belowDart)
      .shift(180, store.get('sideReduction'))
    points.sideHem = points.bustDartBottom.shiftTowards(points.sideHemInitial, belowDart)

    // Hem
    let hemLen = (measurements.waist / 2) * (1 + options.waistEase) - store.get('backHemLength')
    let reduce = points.cfHem.dist(points.sideHemInitial) - hemLen

    // Waist dart
    points.waistDartHem = new Point(points.bust.x, points.cfHem.y)
    points.waistDartLeft = points.waistDartHem.shift(180, reduce / 2)
    points.waistDartRight = points.waistDartHem.shift(0, reduce / 2)
    points.waistDartTip = points.waistDartHem.shiftFractionTowards(
      points.bust,
      options.waistDartLength
    )
    points.waistDartLeftCp = points.waistDartLeft.shift(
      90,
      points.waistDartHem.dist(points.bust) / 2
    )
    points.waistDartRightCp = points.waistDartRight.shift(
      90,
      points.waistDartHem.dist(points.bust) / 2
    )*/

    // darts n@
    paths.saBase = new Path()
      .move(points.G)
      .line(points.L)
      .curve_(points.L,   points.H)
      .move(points.V)
      .curve(points.V, points.bdll,  points.P)
      .line(points.T)
      .line(points.S)
       .move(points.V)
      .curve(points.V, points.bdrr , points.Q)
       .line(points.U)
      .line(points.S)
      .move(points.d)
      .line(points.L)
      .line(points.e)
      .move(points.j)
       .line(points.L)
      .line(points.k)
      .attr('class', 'fabric')

    paths.saBase1 = new Path()
      .move(points.neck)
      .line(points.necko)
      .line(points.C)
      .line(points.D)
      .line(points.C)
      .line(points.F)
	  .curve(points.xf, points.h,   points.a)//needs to be fixed somewhat, but actually pretty good
      .line(points.Y)
      .line(points.Z)
      .line(points.LHip)
      .line(points.neck)
	  .curve(points.neck, points.necko, points.C)// needs to be fixed too, actually pretty good at this point.
      .attr('class', 'fabric')

    if (complete) {
   

      if (sa) {
       // paths.sa = paths.saBase.offset(sa).line(points.cfNeck).attr('class', 'fabric sa')
        //paths.sa = paths.sa.move(points.cfHem).line(paths.sa.start())
      }
      if (paperless) {
	  
      }
    }
      return part
  },
}
