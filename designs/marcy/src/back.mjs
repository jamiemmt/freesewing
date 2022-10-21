import { pluginBundle } from '@freesewing/plugin-bundle'

export const back = {
  name: 'marcy.back',
  measurements: [
    'highBust',
    'chest',
    'underbust',
    'waist',
    'waistBack',
    'bustSpan',
    'neck',
    'hpsToBust',
    'hpsToWaistFront',
    'hpsToWaistBack',
    'shoulderToShoulder',
    'shoulderSlope',
    'waistToHHip',
    'waistToLHip',
    'bottomCircumference',
    'hips',
    'shoulder',
      'front_length',
      'back_length',
    'hpsToLHipFront',
    'hpsToLHipBack',
    'figure_length',
    'figure_breadth',
    'cross_front',
    'cross_back',
    'hipsCircumference',
    'seatCircumference',
    'side',
    'armhole',
  ],
  options: {
    // Static
    acrossBackFactor: 0.925,
    shoulderSlopeBack: 1.23,
    neckWidthBack: 0.197,
    neckWidthFront: 0.17,
    backDartLocation: 0.145,
    backCenterWaistReduction: 0.35,
    collarFactor: 0.19,
    // Fit
    bustSpanEase: { pct: 10, min: 0, max: 20, menu: 'fit' },
    chestEase: { pct: 11, min: 5, max: 20, menu: 'fit' },
    fullChestEaseReduction: { pct: 4, min: 0, max: 8, menu: 'fit' },
    shoulderToShoulderEase: { pct: -0.5, min: -1, max: 5, menu: 'fit' },
    waistEase: { pct: 5, min: 1, max: 20, menu: 'fit' },
    // Darts
    backDartHeight: { pct: 46, min: 38, max: 54, menu: 'darts' },
    bustDartCurve: { pct: 100, min: 0, max: 100, menu: 'darts' },
    bustDartLength: { pct: 90, min: 75, max: 100, menu: 'darts' },
    waistDartLength: { pct: 90, min: 75, max: 95, menu: 'darts' },
    // Armhole
    armholeDepth: { pct: 44, min: 38, max: 46, menu: 'armhole' },
    backArmholeCurvature: { pct: 63, min: 50, max: 85, menu: 'armhole' },
    backArmholePitchDepth: { pct: 35, max: 40, min: 30, menu: 'armhole' },
    backArmholeSlant: { deg: 5, min: 1, max: 9, menu: 'armhole' },
    frontArmholeCurvature: { pct: 63, min: 50, max: 85, menu: 'armhole' },
    frontArmholePitchDepth: { pct: 29, max: 31, min: 27, menu: 'armhole' },
    // Advanced
    backHemSlope: { deg: 2.5, min: 0, max: 5, menu: 'advanced' },
    backNeckCutout: { pct: 6, min: 3, max: 9, menu: 'advanced' },
    frontShoulderWidth: { pct: 95, max: 98, min: 92, menu: 'advanced' },
    highBustWidth: { pct: 86, max: 92, min: 80, menu: 'advanced' },
  },
  plugins: [pluginBundle],
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
    measurements,
    log,
    part,
  }) => {
    // Get to work
    points.cbNeck = new Point(0, measurements.neck * options.backNeckCutout)
    points.hps = new Point(measurements.neck * options.neckWidthBack, 0)


 let neck = measurements.neck
    let shoulder = measurements.shoulder
    let front_length = measurements.front_length
    let back_length = measurements.back_length
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
    points.A = new Point(0, 80).addCircle(3, 'lining').addCircle(20, 'fabric').attr('data-text', 'A')
    points.top = new Point(0, 0)
      .addCircle(3, 'lining')
      .addCircle(20, 'fabric')

    points.B = new Point(neck_b, 80)
      .addCircle(3, 'lining')
      .addCircle(20, 'fabric')
      .attr('data-text', 'B')

    points.C = new Point(points.B.x, points.B.y - neck_b/3 + .125*25)
         .attr('data-text', 'C')
    

      points.D = new Point(points.C.x + fside(neck_b/3+.125*25, shoulder+ 9.25), points.A.y)
          .attr('data-text', 'D')
      let sfrac = shoulder*.5 * 1/(shoulder + 9.25)
      points.E = new Point(points.D.x - sfrac*(points.D.x-points.C.x), points.D.y-sfrac*(points.D.y-points.C.y))
          .attr('data-text', 'E')
      points.F = new Point(points.D.x - (1-sfrac)*(points.D.x-points.C.x), points.D.y-(1-sfrac)*(points.D.y-points.C.y))
          .attr('data-text', 'F')

    points.bottom = new Point(0, 100+ measurements.hpsToWaistFront + measurements.waistToLHip)

    let lh_back = measurements.bottomCircumference / 4 - 6.35
    let hh_back = measurements.hips / 4 - 6.35
    let lh = back_length + 8.5 * 25
    let hh = back_length + 4.5 * 25

    points.Bust2 = new Point(0, points.A.y + measurements.hpsToBust)
      .addCircle(3, 'lining')
      .addCircle(20, 'fabric')
      .attr('data-text', 'bust')

    points.Bustf = new Point(0, points.A.y + back_length / 2)
          .attr('data-text', 'bust-test')

    points.xb = new Point(0, points.A.y + measurements.hpsToWaistBack / 4)
    //      .attr('data-text', 'xb')
    points.xbo = new Point(170, points.A.y + measurements.hpsToWaistBack / 4)
      .addCircle(3, 'lining')
      .addCircle(20, 'fabric')
      .attr('data-text', 'xb-o')

      // G is actually where it should be for the waistgood.
      points.G = new Point(0,  points.A.y +  back_length)
	  .attr('data-text', 'G')
      points.Real = new Point(points.G.x, points.G.y - back_length).attr('data-text', 'FFFFFFFFFFBBBB')
      points.WWaist = new Point(lh_back,  points.A.y + back_length)
      .addCircle(3, 'lining')
      .addCircle(20, 'fabric')
	  .attr('data-text', 'OW')

      
      points.H = new Point(points.G.x+.375*25, points.G.y)
          .attr('data-text', 'H')
      points.R = new Point(points.H.x, points.H.y + 12.5)
      points.I = new Point(points.G.x, points.G.y+25*7)
          .attr('data-text', 'I')
      points.J = new Point(points.xb.x, points.xb.y)
          .attr('data-text', 'J')

      points.K = new  Point(points.H.x+waist_b/2, points.H.y)
          .attr('data-text', 'K')

      points.L = new  Point(points.H.x+waist_b/2+20-.375*25, points.H.y)// again this dart size should be custom, it plus H's sway in should be the front dart      
          .attr('data-text', 'L')
      points.midwd = new Point(points.L.x - (20-.375*25)/2, points.L.y)
          .attr('data-text', 'midw')
      points.M = new Point(points.L.x + waist_b/2, points.L.y)
	  .attr('data-text', 'M')
      points.LHip = new Point(0, points.A.y + lh).attr('data-text', 'LH')
      points.N = new Point(points.midwd.x, points.LHip.y)
	  .attr('data-text', 'N')
      points.O = new Point(points.midwd.x, points.LHip.y-75)
	  .attr('data-text', 'O')
      points.P = new Point(points.L.x, points.L.y + 12.5)
      points.Q = new Point(points.K.x, points.K.y + 12.5)


      points.HHip = new Point(0, points.A.y + hh)
	  .attr('data-text', 'HH')

      points.LHip = new Point(0, points.A.y + lh)
      .attr('data-text', 'LH')
  

     
      points.LHipOuter = new Point(lh_back, points.LHip.y)
	  .attr('data-text', 'LHO')
	  .addCircle(3, 'lining')
	  .addCircle(20, 'fabric')

      
      points.HHipOuter = new Point(hh_back, points.HHip.y)
      
      // CRUCIAL Need to add the width of the dart here and dart contouring. doing at T. 
	  .attr('data-text', 'HHO')

     
/*
    points.cbNeckCp1 = new Point(points.hps.x * 0.8, points.cbNeck.y)
    let slope = measurements.shoulderSlope * options.shoulderSlopeBack * -1
    points.shoulder = utils.beamsIntersect(
      new Point((measurements.shoulderToShoulder * (1 + options.shoulderToShoulderEase)) / 2, 0),
      new Point((measurements.shoulderToShoulder * (1 + options.shoulderToShoulderEase)) / 2, 100),
      points.hps,
      points.hps.shift(slope, 85)
    )
    points.armholePitch = new Point(
      points.shoulder.x * options.acrossBackFactor,
      measurements.hpsToWaistBack * options.backArmholePitchDepth
    )

    // Construct waist and dart
    points.dartTip = new Point(
      measurements.underbust * options.backDartLocation,
      measurements.hpsToWaistBack * options.backDartHeight
    )
    let backWidth = (measurements.underbust / 4) * (1 + options.chestEase)
    let waistWidth = (measurements.waistBack / 2) * (1 + options.waistEase)
    let reduction = backWidth - waistWidth
    points.cbWaist = new Point(0, measurements.hpsToWaistBack)
    points.waistCenter = points.cbWaist.shift(0, reduction * options.backCenterWaistReduction)
    points.waistSide = points.waistCenter.shift(
      options.backHemSlope,
      waistWidth + reduction * (1 - options.backCenterWaistReduction / 2)
    )
    points.dartBottomCenter = utils.beamIntersectsX(
      points.waistCenter,
      points.waistSide,
      points.dartTip.x
    )
    points.dartBottomLeft = points.dartBottomCenter.shift(
      180,
      (reduction * (1 - options.backCenterWaistReduction * 0.5)) / 2
    )
    points.dartBottomRight = points.dartBottomLeft.rotate(180, points.dartBottomCenter)
    points.dartLeftCp = points.dartBottomLeft.shift(
      90,
      points.dartTip.dy(points.dartBottomLeft) / 2
    )
    points.dartRightCp = new Point(points.dartBottomRight.x, points.dartLeftCp.y)
    // Find out location of the armhole
    let armholeDepth = measurements.hpsToWaistBack * options.armholeDepth + points.shoulder.y
    points.cbNeckCp2 = new Point(0, armholeDepth)
    // Does dart pass armhole depth?
    let dartArmholeDepth = utils.curveIntersectsY(
      points.dartBottomLeft,
      points.dartLeftCp,
      points.dartTip,
      points.dartTip,
      armholeDepth
    )
    let extra = 0
    points.cbArmhole = utils.curveIntersectsY(
      points.cbNeck,
      points.cbNeckCp2,
      points.waistCenter,
      points.waistCenter,
      armholeDepth
    )
    if (dartArmholeDepth) {
      points.dartLeftArmhole = dartArmholeDepth
      extra = points.dartLeftArmhole.dx(points.dartTip) * 2 + points.cbArmhole.x
    }
    points.armhole = new Point(
      (measurements.underbust / 4) * (1 + options.chestEase) + extra,
      armholeDepth
    )

    // Control points for the side seam
    points.waistSideCp2 = points.waistSide.shift(90, points.armhole.dy(points.waistSide) / 2)

    // Construct armhole
    points.armholeCp2 = points.armhole.shift(180 - options.backArmholeSlant, 40)
    points.armholePitchCp1 = points.armholePitch.shift(-90 - options.backArmholeSlant, 40)
    points.armholeCpTarget = utils.beamsIntersect(
      points.armhole,
      points.armhole.shift(180 - options.backArmholeSlant, 40),
      points.armholePitch,
      points.armholePitch.shift(-90 - options.backArmholeSlant, 40)
    )
    points.armholeCp2 = points.armhole.shiftFractionTowards(
      points.armholeCpTarget,
      options.backArmholeCurvature
    )
    points.armholePitchCp1 = points.armholePitch.shiftFractionTowards(
      points.armholeCpTarget,
      options.backArmholeCurvature
    )
    points.armholePitchCp2 = points.armholePitchCp1.rotate(180, points.armholePitch)
    // Dolls need clothes too
    if (points.armholePitchCp2.y < points.shoulder.y) {
      points.armholePitchCp2.y = points.shoulder.y + points.shoulder.dy(points.armholePitch) / 2
    }

    // Store the back width at bust level
    points.bustCenter = utils.curveIntersectsY(
      points.cbNeck,
      points.cbNeckCp2,
      points.waistCenter,
      points.waistCenter,
      measurements.hpsToBust
    )
    if (!points.bustCenter) log.error('Could not find bust height in center seam of back part')
    if (points.bustCenter.y < points.armhole.y) {
      points.sideArmhole = points.armhole.clone()
      let sideArmholeTemp = new Path()
        .move(points.armhole)
        .curve(points.armhole, points.waistSideCp2, points.waistSide)
        .shiftAlong(10)
      points.sideArmhole = sideArmholeTemp.shiftOutwards(points.armhole, 100)
      points.bustSide = utils.beamIntersectsY(
        points.armhole,
        points.sideArmhole,
        measurements.hpsToBust
      )
    } else {
      points.bustSide = utils.curveIntersectsY(
        points.waistSide,
        points.waistSideCp2,
        points.armhole,
        points.armhole,
        measurements.hpsToBust
      )
    }
    if (!points.bustSide) log.error('Could not find bust height in side seam of back part')
    if (points.bustCenter.y < points.dartTip.y) {
      points.bustDartLeft = points.bustCenter.clone()
      points.bustDartLeft.x = points.dartTip.x
    } else {
      points.bustDartLeft = utils.curveIntersectsY(
        points.dartBottomLeft,
        points.dartLeftCp,
        points.dartTip,
        points.dartTip,
        measurements.hpsToBust
      )
    }
    if (!points.bustDartLeft) log.error('Could not find bust height in back dart')
    points.bustDartRight = points.bustDartLeft.flipX(points.dartTip)
    // Store things we'll need in the front parts
    store.set(
      'bustWidthBack',
      points.bustCenter.dx(points.bustDartLeft) + points.bustDartRight.dx(points.bustSide)
    )
    store.set(
      'sideSeamLength',
      new Path().move(points.waistSide).curve_(points.waistSideCp2, points.armhole).length()
    )
    store.set(
      'backHemLength',
      points.waistCenter.dist(points.dartBottomLeft) + points.dartBottomRight.dist(points.waistSide)
    )
    store.set('sideReduction', points.armhole.x - points.waistSide.x)
*/
    paths.seam1 = new Path()
	  .move(points.A)
	  .line(points.B)
	  .line(points.C)
	  .line(points.D)
	  .line(points.E)
	  .move(points.xb)
	  .line(points.H)
	  .line(points.R)
	  .line(points.I)
//	  .move(points.midwd)
	  .attr('class', 'fabric')

      paths.waistdart = new Path()
	  .move(points.L)
	  .line(points.P)
	  .line(points.O)
	  .line(points.Q)
	  .line(points.K)
	  .move(points.R)      
	  .move(points.M)
	  .line(points.P)
	  .attr('class', 'fabric')
      let isects = paths.waistdart.intersectsY(points.HHipOuter.y)
      if (isects.length != 2) {
	  throw new Error("uhoh");
      }
      let addi = Math.abs(isects[0].x -isects[1].x)
      let isects2 = paths.seam1.intersectsY(points.HHipOuter.y)
      if (isects2.length != 1) {
	  throw new Error("uhoh2");
      }
      let taddi = addi + isects2[0].x
      points.T = new Point( taddi + hh_back, points.HHip.y).attr('data-text', 'T')
      // CRUCIAL check if T is in the right place.
      points.U = new Point (points.LHip.x, points.LHip.y)
      
      points.V = new Point (points.LHipOuter.x, points.LHipOuter.y)


   
      points.W = new Point(points.J.x +xb , points.J.y).attr('data-text', 'W')
      let sectn = paths.seam1.intersectsY(points.Bustf.y)
      if (sectn.length != 1) {
	  throw new Error("uhoh3");
      }
      points.X = sectn[0].attr('data-text', 'X')
      points.Y = new Point(points.X.x + bust_b, points.X.y).attr('data-text', 'Y')
      points.Z = new Point(points.Y.x, points.M.y-fside(points.Y.x - points.M.x, side)).attr('data-text', 'Z')
      points.a = new Point(0, points.Z.y)
      
         paths.side = new Path()
	  .move(points.M)
	  .line(points.T)
	  .line(points.V)
	  .move(points.M)
	  .line(points.Z)
	  .line(points.a)
	  .attr('class', 'fabric')
      let sfract = (3* 25)/Math.sqrt((points.M.y - points.Z.y)*(points.M.y - points.Z.y), (points.M.x - points.Z.x)* (points.M.x - points.Z.x))
      let sect = paths.side.intersectsY(points.M.y - sfract*(points.M.y - points.Z.y))
      if (sect.length != 1) {
	  throw new Error("uhoh4");
      }
      points.b = sect[0]
      points.bin = new Point(points.b.x - 25*.125, points.b.y)
      points.sidec = new Point(points.bin.x - 6, points.bin.y)
      paths.scurve = new Path()
	  .move(points.M)
	  ._curve(points.sidec, points.Z)

      let ydart = points.Z.y + 25
      paths.dartn = new Path()
	  .move(points.E)
	  .line(points.K)
      let sectd = paths.dartn.intersectsY(ydart)
      if (sectd.length != 1) {
	  throw new Error("uhoh5");
      }
      points.c = sectd[0].attr('data-text', 'c')
      paths.wdart = new Path()
	  .move(points.E)
	  .line(points.c)
      let shfrac = (3.5 * 25)/ (Math.sqrt((points.E.y - points.c.y)*(points.E.y - points.c.y), (points.E.x - points.c.x)* (points.E.x - points.c.x)))
      let sectsh = paths.wdart.intersectsY(points.E.y + shfrac*(points.c.y - points.E.y))
    if (sectsh.length < 1) {
	  throw new Error("uhoh6");
      }				
      points.d = sectsh[0]
      points.e = new Point (points.W.x, points.Z.y)
      paths.dw = new Path()
	  .move(points.W)
	  .line(points.e)
      points.f = new Point(points.e.x + 25/Math.sqrt(2), points.e.y - 25/Math.sqrt(2))
      paths.armhole = new Path()
	  .move(points.Z)
	  .curve(points.Z, points.e, points.W)// CRITICAL needs to end up on f, haven't fixed yet
	  .curve(points.W, points.W, points.D)
      points.g = new Point(points.B.x - 12.5/Math.sqrt(2), points.B.y - 12.5/Math.sqrt(2))
      paths.neck = new Path()
	  .move(points.C)
	  .curve(points.C, points.B, points.A)
      let ntrials = 1
      points.h = points.D
      while (Math.abs( paths.armhole.length() - ah_b)>5 && ntrials < 25) {
	  ntrials++
	  if (paths.armhole.length() - ah_b > 0) {
	      points.h = paths.armhole.shiftAlong(ah_b).attr('data-text', 'Correct shoulder')
	      points.D = points.h
	      paths.armhole = new Path()
		  .move(points.Z)
		  .curve(points.Z, points.e, points.W)
		  .curve(points.W, points.W, points.D)
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
	  } else {
	      throw new Error("I don't think we should have to raise the shoulder")
	  }
      }
  

    if (complete) {
   //   points.titleAnchor = new Point(points.hps.x, points.armholePitchCp2.y)
   /*   macro('title', {
        nr: 2,
        title: 'back',
        at: points.titleAnchor,
      })
      macro('grainline', {
     //   from: new Point(points.hps.x / 2, points.shoulder.y),
      //  to: new Point(points.hps.x / 2, points.waistSide.y),
      })
      macro('sprinkle', {
        //snippet: 'bnotch',
        //on: ['armholePitch', 'bustCenter'],
      })
*/
 
      if (paperless) {
	  
      }
    }
  

    return part
  },
}
