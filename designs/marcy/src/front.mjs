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
    let front_length = measurements.hpsToLHipFront
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

    points.nnn = new Point(1000, 800)
      .addCircle(3, 'lining')
      .addCircle(20, 'fabric')
      .attr('data-text', 'show')

    points.bottom = new Point(0, measurements.hpsToWaistFront + measurements.waistToLHip)

    let lh_front = measurements.bottomCircumference / 4 + 6.35
    let hh_front = measurements.hips / 4 + 6.35
    let lh = measurements.hpsToWaistFront + measurements.waistToLHip
    let hh = measurements.hpsToWaistFront + measurements.waistToHHip

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

    points.I = new Point(0, 80 + measurements.hpsToWaistFront / 2).attr('data-text', 'test-bust/I')
    points.J = new Point(bust_f, 80 + measurements.hpsToWaistFront / 2).attr(
      'data-text',
      'test-bust/J'
    )
    points.K = new Point(figure_breadth2, 80 + measurements.hpsToWaistFront / 2).attr(
      'data-text',
      'test-bust/K'
    )

    points.L = new Point(figure_breadth2, 80 + fside(figure_length, figure_breadth2)).attr(
      'data-text',
      'test-bust/L'
    )

    points.IWaist = new Point(0, 80 + measurements.hpsToWaistFront).attr('data-text', 'IWF')
    points.WWaist = new Point(lh_front, 80 + measurements.hpsToWaistFront).attr('data-text', 'OWF')

    points.HHip = new Point(0, 80 + hh).attr('data-text', 'HHF')
    points.LHip = new Point(0, 80 + lh).attr('data-text', 'LHF')

    points.Dd = new Point(0, 0).addCircle(3, 'lining').addCircle(20, 'fabric')

    points.LHipOuter = new Point(lh_front, 80 + lh).attr('data-text', 'LHO')

    points.HHipOuter = new Point(lh_front, 80 + hh).attr('data-text', 'HHO')

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
    )

    paths.saBase = new Path()
      .move(points.cfHem)
      .line(points.waistDartLeft)
      .line(points.waistDartRight)
      .line(points.sideHem)
      .line(points.bustDartBottom)
      .line(points.bustDartEdge)
      .line(points.bustDartTop)
      .line(points.armhole)
      .curve(points.armholeCp2, points.armholePitchCp1, points.armholePitch)
      .curve_(points.armholePitchCp2, points.shoulder)
      .line(points.hps)
      .curve(points.hpsCp2, points.cfNeckCp1, points.cfNeck)
      .hide()

    if (complete) {
      points.titleAnchor = new Point(points.armholePitch.x / 2, points.armholePitchCp2.y)
      macro('title', {
        at: points.titleAnchor,
        nr: 1,
        title: 'front',
      })
      points.scaleboxAnchor = points.titleAnchor.shift(-90, 70)
      macro('scalebox', { at: points.scaleboxAnchor })
      paths.dart = new Path()
        .move(points.bustDartTop)
        .line(points.bustDartEdge)
        .line(points.bustDartBottom)
        .attr('class', 'help')
      macro('cutonfold', {
        from: points.cfNeck,
        to: points.cfHem,
        grainline: true,
      })
      macro('sprinkle', {
        snippet: 'notch',
        on: ['bust', 'armholePitch', 'cfBust'],
      })

      if (sa) {
        paths.sa = paths.saBase.offset(sa).line(points.cfNeck).attr('class', 'fabric sa')
        paths.sa = paths.sa.move(points.cfHem).line(paths.sa.start())
      }
      if (paperless) {
        macro('vd', {
          from: points.cfHem,
          to: points.waistDartTip,
          x: 0 - 15,
        })
        macro('vd', {
          from: points.cfHem,
          to: points.bust,
          x: 0 - 30,
        })
        macro('vd', {
          from: points.cfHem,
          to: points.cfNeck,
          x: 0 - 45,
        })
        macro('vd', {
          from: points.cfHem,
          to: points.hps,
          x: 0 - 60,
        })
        macro('hd', {
          from: points.cfBust,
          to: points.bust,
          y: points.bust.y - 15,
        })
        macro('hd', {
          from: points.cfBust,
          to: points.bustDartTip,
          y: points.bust.y - 30,
        })
        macro('hd', {
          from: points.cfHem,
          to: points.waistDartLeft,
          y: points.cfHem.y + sa + 15,
        })
        macro('hd', {
          from: points.cfHem,
          to: points.waistDartRight,
          y: points.cfHem.y + sa + 30,
        })
        macro('hd', {
          from: points.cfHem,
          to: points.sideHem,
          y: points.cfHem.y + sa + 45,
        })
        macro('hd', {
          from: points.cfHem,
          to: points.bustDartBottom,
          y: points.cfHem.y + sa + 60,
        })
        macro('hd', {
          from: points.cfHem,
          to: points.bustDartTop,
          y: points.cfHem.y + sa + 75,
        })
        macro('vd', {
          from: points.sideHem,
          to: points.bustDartBottom,
          x: points.bustDartTop.x + sa + 15,
        })
        macro('vd', {
          from: points.sideHem,
          to: points.bustDartTop,
          x: points.bustDartTop.x + sa + 30,
        })
        macro('vd', {
          from: points.sideHem,
          to: points.armhole,
          x: points.bustDartTop.x + sa + 45,
        })
        macro('vd', {
          from: points.sideHem,
          to: points.armholePitch,
          x: points.bustDartTop.x + sa + 60,
        })
        macro('vd', {
          from: points.sideHem,
          to: points.shoulder,
          x: points.bustDartTop.x + sa + 75,
        })
        macro('hd', {
          from: points.cfNeck,
          to: points.hps,
          y: points.hps.y - sa - 15,
        })
        macro('hd', {
          from: points.cfNeck,
          to: points.armholePitch,
          y: points.hps.y - sa - 30,
        })
        macro('hd', {
          from: points.cfNeck,
          to: points.shoulder,
          y: points.hps.y - sa - 45,
        })
        macro('hd', {
          from: points.cfNeck,
          to: points.armhole,
          y: points.hps.y - sa - 60,
        })
      }
    }

    return part
  },
}
