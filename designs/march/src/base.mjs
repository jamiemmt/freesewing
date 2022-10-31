function draftCathrinBase({ measurements, options, store, points, paths, Point, Path, part }) {
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

  let bottom = front_length + waist_to_lh
  let neck_f = (neck / 6) * 1.1
  let neck_b = (neck / 6) * 1.17
  let figure_breadth2 = figure_breadth / 2
  let xf = cross_front / 2
  let xb = cross_back / 2
  let bust4 = bust / 4
  let bust_f = bust4 * (1 + 1 / 20)
  let bust_b = bust4 * (1 - 1 / 20)
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
  let waist_to_hh = measurements.waistToHHip
  let waist_to_lh = measurements.waistToLHip

  store = store.extend([
    ['yloc1', yloc],
    ['xloc1', xloc],
    ['xintersect', xintersect],
    ['yintersect', yintersect],
    ['centered_dart1', centered_dart],
    ['neck', neck],
    /*["shoulder", shoulder]
	["front_length", front_length]
	["back_length", back_length]
	["figure_length", figure_length]
	["figure_breadth", figure_breadth],
	["cross_front", cross_front],
	["cross_back", measurements.cross_back],
	["bust", measurements.bust],
	["underbust", measurements.underbust],
	["waist", measurements.waist],
	["hhip", measurements.hipsCircumference],
	["lhip", measurements.seatCircumference],
	["side", measurements.side],
	["armhole", measurements.armhole],
	["waist_to_hh", measurements.waistToHHip],
	["waist_to_lh", measurements.waistToLHip],
	["bottom", front_length + waist_to_lh],
	["neck_f", neck / 6 * 1.1],
	["neck_b", neck / 6 * 1.17],
	["figure_breadth2", figure_breadth / 2],
	["xf", cross_front / 2],
	["xb", cross_back / 2],
	["bust4", bust / 4],
	["bust_f", bust4 * (1 + 1 / 20)],
	["bust_b", bust4 * (1 - 1 / 20)],
	["ub", underbust + 5],
	["cup", bust - underbust],
	["waist_4", waist / 4],
	["waist_f", waist_4 * 1.04],
	["waist_b", waist_4 * 0.96],
	["hhip_4", hhip / 4.0],
	["hhip_f", hhip_4 * 1.03],
	["hhip_b", hhip_4 * 0.97],
	["lhip_4", lhip / 4],
	["lhip_f", lhip_4 * 1.03],
	["lhip_b", lhip_4 * 0.97],
	["ah2", armhole / 2],
	["ahf", ah_2 * 1.03],
	["ahb",  ah_2 * .97]*/
  ])

  //  points.cfNeck = new Point(0, neck * options.collarFactor)
  //added these, for very top and v bottom. How do I change which measurements    points.A = new Point(0, 0).addCircle(3, 'lining').addCircle(20, 'fabric')//.attr('data-text', "A")
  points.top = new Point(0, 0)
  points.bottom = new Point(0, 200) //.attr('data-text', 'bottom')

  function fhyp(x, y) {
    return Math.sqrt(x * x + y * y)
  }

  function fside(x, y) {
    return Math.sqrt(Math.abs(x * x - y * y))
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

  points.top = new Point(0, 0)
  //.attr('data-text', 'top')

  points.bottom = new Point(0, measurements.hpsToWaistFront + measurements.waistToLHip)

  let lh_front = measurements.seatCircumference / 4 + 6.35
  let hh_front = measurements.hips / 4 + 6.35
  let lh = front_length + waist_to_lh
  let hh = front_length + waist_to_hh

  points.A = new Point(0, 80) //.attr('data-text', 'A')
  points.B = new Point(neck_f, 80) //.attr('data-text', 'B')

  points.C = new Point(neck_f, points.B.y - neck_b) //.attr('data-text', 'C')
  // SECOND we should fix D and F on the front and back to make these angles correct.
  points.D = new Point(neck_f, points.C.y + neck_b / 2 - 6.5) //.attr('data-text', 'D')

  points.E = new Point(points.D.x + 6 * 25, points.D.y) //.attr('data-text', 'E')

  let cup_size = bust - underbust // CRITICAL what is my underbust really
  let shoulder_dart = 0.375 * 25
  if (cup_size > 2) {
    // this is still not super custom, it's just a vs b
    shoulder_dart = 12.5
  }
  let shoulder_len = shoulder + shoulder_dart // should make this custom but for now it's fine
  points.F = new Point(points.D.x + fside(shoulder_len, neck_b / 2), points.D.y)

  let mt = centered_dart(points.C, points.F, shoulder_dart)
  points.G = mt[0]
  points.H = mt[1]
  let tbust_y = front_length / 2

  points.I = new Point(0, 80 + tbust_y) //.attr('data-text', 'I')
  points.J = new Point(bust_f, points.I.y) //.attr('data-text','J')
  points.K = new Point(figure_breadth2, 80 + tbust_y) //.attr('data-text','K')

  points.L = new Point(figure_breadth2, 80 + fside(figure_length, figure_breadth2)) //.attr('data-text','L' )

  points.M = new Point(0, points.L.y)
  //.attr(  'data-text',  'M'      )

  points.IWaist = new Point(0, 80 + front_length) //.attr('data-text', 'IWF')
  points.WWaist = new Point(lh_front, points.IWaist.y) //.attr('data-text', 'OWF')
  points.N = new Point(figure_breadth2, points.IWaist.y) //.attr('data-text', 'N')

  points.HHip = new Point(0, 80 + hh) //.attr('data-text', 'HHF')
  points.FHHip = new Point(figure_breadth2, points.HHip.y) //.attr('data-text', 'FHF')
  points.HHipOuter = new Point(lh_front, points.HHip.y) //.attr('data-text', 'HHO')

  points.LHip = new Point(0, 80 + lh) //.attr('data-text', 'LHF')
  points.LHipOuter = new Point(lh_front, points.LHip.y) //.attr('data-text', 'LHO')
  points.O = new Point(figure_breadth2, points.LHip.y) //.attr('data-text', 'O')

  let wdiff = lhip - waist
  let wdart = 20 // This is 3/4 inch, should be relative and a function of wdiff eventually. Not actually sure if this is what I want anyway

  points.P = new Point(points.N.x - wdart / 2, points.N.y) //.attr('data-text', 'P')
  points.Q = new Point(points.N.x + wdart / 2, points.N.y) //.attr('data-text', 'Q')
  points.R = new Point(points.IWaist.x, points.IWaist.y + 12.5) //.attr('data-text', 'R')
  points.S = new Point(points.O.x, points.O.y - 75) //.attr('data-text', 'S')
  points.T = new Point(points.P.x, points.P.y + 12.5) //.attr('data-text', 'T')
  points.U = new Point(points.Q.x, points.Q.y + 12.5) //.attr('data-text', 'U')

  points.V = new Point(points.L.x, points.L.y + 18.75) //.attr('data-text', 'V')
  points.W = new Point(points.M.x + bust_f, points.M.y) //.attr('data-text', 'W')

  points.X = new Point(points.IWaist.x + waist_f + wdart, points.IWaist.y) ////.attr('data-text', 'X')
  // This will need to be changed, add in the portion of the dart still her
  let wdart_hh = 6.25
  points.Y = new Point(points.HHip.x + hhip_f + wdart_hh, points.HHip.y) //.attr('data-text', 'Y')
  points.Z = new Point(points.LHip.x + lhip_f, points.LHip.y) //.attr('data-text', 'Z')
  points.Z = new Point(points.LHip.x + lhip_f, points.LHip.y) //.attr('data-text', 'Z')

  let shoulderdartw = 0.375 * 25 // This is for an A cup, can be modified
  let sidedartw = 0.75 * 25 // This is also for an A cup. tbm
  let sidew = side + sidedartw
  let yadds = fside(sidew, points.X.x - points.J.x)

  points.a = new Point(points.J.x, points.X.y - yadds) //.attr('data-text', 'a')
  points.b = new Point(0, points.X.y - yadds) //.attr('data-text', 'b')
  points.c = new Point(
    points.X.x + 0.3 * (points.W.x - points.X.x),
    points.X.y + 0.3 * (-points.X.y + points.W.y)
  ) //.attr('data-text', 'c')
  points.c8 = new Point(points.c.x - 0.125 * 25, points.c.y) //.attr('data-text', 'c8')
  // d and e should be centered around W's intersect
  points.bdl = new Point(
    points.V.x + (1 / 3) * (points.P.x - points.V.x) - 0.25 * 25,
    points.V.y + (1 / 3) * (points.P.y - points.V.y)
  ) //.attr('data-text', 'bdl')
  points.bdr = new Point(
    points.V.x + (1 / 3) * (points.Q.x - points.V.x) + 0.25 * 25,
    points.V.y + (1 / 3) * (-points.V.y + points.Q.y)
  ) //.attr('data-text', 'bdr')
  points.bdrr = new Point(points.Q.x + 10, points.Q.y - 85) //.attr('data-text', 'bdrr')
  points.bdll = new Point(points.P.x - 10, points.P.y - 85) //.attr('data-text', 'bdrr')

  points.Dd = new Point(0, 0) //.addCircle(3, 'lining')//.addCircle(20, 'fabric')

  points.xf = new Point(xf, points.A.y + 2 * 25) //.attr('data-text', 'xf')
  let xff = (points.xf.y - points.H.y) / (-points.H.y + points.L.y)

  // This isn't quite right, should fix. f should be 1/8 inch away from HL but it's currently something weird, thought the frac would work

  points.f = new Point(points.L.x + xff * (points.H.x - points.L.x) + 0.125 * 25, points.xf.y).attr(
    'data-text',
    'f'
  )
  // points.g = new Point(points.L.x + xff * (points.G.x - points.L.x) - .125 * 25, points.f.y).attr('data-text', 'g')
  // I'm totally guessing on this width. It should be the width of the dart at this pt which is .125 * 25 + the width before we bumped it out
  points.g = new Point(points.xf.x + 0.25 * 25, points.xf.y) //.attr('data-text', 'g')
  points.h = new Point(points.g.x, points.a.y) //.attr('data-text', 'h')
  points.i = new Point(points.h.x + 20 / Math.sqrt(2), points.h.y - 20 / Math.sqrt(2)) //.attr('data-text', 'i')

  let ahd = 0.375 * 25 // based on a cup probably should be relative
  points.j = new Point(
    points.i.x + (0.5 * ahd) / Math.sqrt(2),
    points.i.y + (0.5 * ahd) / Math.sqrt(2)
  ) //.attr('data-text', 'j')
  points.k = new Point(
    points.i.x - (0.5 * ahd) / Math.sqrt(2),
    points.i.y - (0.5 * ahd) / Math.sqrt(2)
  ) //.attr('data-text', 'k')
  points.l = new Point(points.B.x - 25 / Math.sqrt(2), points.B.y - 25 / Math.sqrt(2)) //.attr('data-text', 'lL')

  let ahtotal = ah_f + ahd
  // probably should check that this is what the armhole ends up being ahtotal, the primary change will be to bring F down to make it the right length

  paths.side = new Path()
    .move(points.a)
    .curve_(new Point(points.X.x, points.X.y), points.X)
    .attr('class', 'fabric')
    .hide()
  points.Won = yintersect(paths.side, points.W.y)[0]
  points.d = new Point(0, 0) // yintersect(paths.side, points.Won.y-.5 * sidedartw)[0]
  points.e = new Point(0, 0) //yintersect(paths.side, points.Won.y+.5 * sidedartw)[0]

  points.sideguide = new Point(points.c8.x - 4, points.c8.y)
  paths.side2 = new Path()
    .move(points.a)
    ._curve(points.sideguide, points.X)
    ._curve(points.X, points.X)
    .attr('class', 'fabric')
    .hide()
  points.Won = yintersect(paths.side, points.W.y)[0]
  points.d = points.Won.clone() //yintersect(paths.side, points.Won.y-.5 * sidedartw)[0]//.attr('data-text', 'd')
  points.e = yintersect(paths.side, points.Won.y + sidedartw)[0] //.attr('data-text', 'e')

  // darts n@
  paths.saBase = new Path()
    .move(points.G)
    .line(points.L)
    .curve(points.f, points.f, points.H)
    .move(points.V)
    .curve(points.V, points.bdll, points.P)
    .line(points.T)
    .line(points.S)
    .move(points.T)
    .line(points.R)
    .move(points.U)
    .line(points.X)
    .line(points.IWaist)
    .move(points.V)
    .line(points.P)
    .move(points.V)
    .line(points.Q)
    .move(points.V)
    .curve(points.V, points.bdrr, points.Q)
    .line(points.U)
    .line(points.S)
    .move(points.d)
    .line(points.L)
    .line(points.e)
    .move(points.j)
    .line(points.L)
    .line(points.k)
    .move(points.b)
    .line(points.a)
    .attr('class', 'fabric')
    .hide()

  paths.shoulder = new Path().move(points.D).line(points.E).hide()
  paths.saBase1 = new Path()
    .move(points.A)
    .line(points.B)
    .line(points.C)
    .line(points.D)
    .line(points.C)
    .line(points.F)
    .attr('class', 'fabric')
    .hide()
  points.AH = new Point(points.b.x + (points.a.x - points.b.x) * 0.66 + 8, points.b.y - 8)
  paths.armhole = new Path()
    .move(points.F)
    .line(points.g)
    .curve(points.AH, points.AH, points.a) //new Point(points.h.x-30, points.h.y), points.a)

    //	.curve(points.h, points.h, points.g)
    .attr('class', 'fabric')
    .hide()

  /*
      let ntrials = 0
      // critical this should be like 5 mm or less
	while (Math.abs( paths.armhole.length() - ahtotal )>8 && ntrials < 25) {
	    ntrials++
	    if (paths.armhole.length() - ah_f > 0) {
		points.h = paths.armhole.shiftAlong(ah_f).attr('data-text', 'Correct shoulder')
		points.D = points.h
		paths.armhole = new Path()
		    .move(points.Z)
		    .curve(points.Z, points.e, points.f)
		    .curve(points.f, points.f, points.D).hide()
		paths.shoulder = new Path()
		    .move(points.C)
		    .line(points.h).hide()
		points.j = paths.shoulder.shiftAlong(shoulder/2)
		points.i = paths.shoulder.shiftAlong(shoulder/2 + 9.25)
		paths.ndart = new Path()
		    .move(points.i)
		    .line(points.K).hide()
		points.k = paths.ndart.shiftAlong(3.5 * 25)
		paths.dartdart = new Path()
		    .move(points.k)
		    .line(points.j).hide()
		// eventually should move c and waist dart over if this moved much
		// also should straighten out should once the dart is closed
	    } else { //CRITICAL I think this needs to be fixed, we might need to raise the sholder
		//	throw new Error("I don't think we should have to raise the shoulder")
	    }
	}
    */
  paths.side = new Path()
    .move(points.a)
    .line(points.X)
    .line(points.Y)
    .line(points.Z)
    .line(points.LHip)
    .line(points.A)
    .curve(points.A, points.B, points.C) // needs to be fixed too, actually pretty good at this point.
    .attr('class', 'fabric')
    .hide()

  //      throw new Error ('angle is ' + points.C.angle(points.F))

  // Now we want to fold away the darts from the chest and shoulder, and add one to the chest from L
  let rotate = ['d', 'a', 'W', 'k', 'i', 'j', 'h', 'xf', 'g', 'F', 'H', 'f']
  let ang = points.L.angle(points.d) - points.L.angle(points.e)
  //throw new Error ("angle is " + (-points.L.angle(points.d) + points.L.angle(points.e))) //+ points.e.dist(points.d))
  for (let p of rotate) {
    points[p] = points[p].rotate(-ang, points.L)
  }
  let rotate2 = ['k', 'xf', 'g', 'F', 'H', 'f']
  let ang2 = points.L.angle(points.k) - points.L.angle(points.j)
  for (let p of rotate2) {
    points[p] = points[p].rotate(-ang2, points.L)
  }

  points.oldDart = points.M.clone()
  points.newDart = new Point(points.M.x, points.M.y + shoulder_dart)
  let add_dart = ['M', 'I', 'l', 'IWaist', 'P', 'bdl', 'bdll', 'V', 'K'] //, 'G', 'D', 'C', 'B', 'A', 'b', 'cfNeck']
  let ang3 = points.L.angle(points.M) - points.L.angle(points.newDart)
  for (let p of add_dart) {
    points[p] = points[p].rotate(-ang3, points.L)
  }

  // Here is where cathrin starts

  // Absolute values for some options
  store.set('waistReduction', measurements.waist * options.waistReduction)
  store.set('backOpening', measurements.underbust * options.backOpening)
  let len = measurements.waistToUnderbust + measurements.waistToHips
  for (let option of ['backRise', 'backDrop', 'frontRise', 'frontDrop', 'hipRise'])
    store.set(option, len * options[option])
  store.set('length', len)

  /**
   * How much should we take in the corset at waist and bust
   *
   * I assume that the hips are larger than the underbust.
   * Can I be sure? Maybe not, but a larger underbust than hip
   * measurements seems very rare to say the least.
   */
  store.set('width', 0.5 * (measurements.hips - store.get('backOpening')))
  store.set(
    'waistIntake',
    0.5 * (measurements.hips - measurements.waist + store.get('waistReduction'))
  )
  store.set('bustIntake', 0.5 * (measurements.hips - measurements.underbust))

  // Basic box (CB = Center back, CF = Center front)
  let wid = store.get('width')
  points.underbustCF = new Point(0, 0)
  points.hipsCF = new Point(0, len)
  points.hipsCB = new Point(wid, len)
  points.underbustCB = new Point(wid, 0)
  points.topSide = points.underbustCF.shiftFractionTowards(points.underbustCB, 0.5)
  points.bottomSide = points.hipsCF.shiftFractionTowards(points.hipsCB, 0.5)
  points.waistCF = points.underbustCF.shift(-90, measurements.waistToUnderbust)
  points.waistCB = new Point(points.hipsCB.x, points.waistCF.y)

  // frontRise
  points.topCF = points.underbustCF.shift(90, store.get('frontRise'))
  points.frontRiseStart = points.underbustCF.shift(0, wid * 0.15)
  points.frontRiseStartCp2 = points.underbustCF.shift(0, wid * 0.11)
  points.topCFCp1 = points.topCF.shift(0, wid * 0.11)

  // frontDrop
  points.bottomCF = points.hipsCF.shift(-90, store.get('frontDrop'))
  points.bottomCFCp2 = points.bottomCF.shift(0, wid * 0.11)

  // hipRise
  points.hipRise = points.bottomSide.shift(90, store.get('hipRise'))
  points.hipRiseCp1 = points.hipRise.shift(180, wid * 0.3)
  points.hipRiseCp2 = points.hipRise.shift(0, wid * 0.2)

  // backDrop
  points.backDrop = points.hipsCB.shift(-90, store.get('backDrop'))
  points.backDropCp1 = points.backDrop.shift(180, wid * 0.3)

  // backRise
  points.backRise = points.underbustCB.shift(90, store.get('backRise'))
  points.backRiseCp1 = points.backRise.shift(180, wid * 0.4)
  points.topSideCp1 = points.topSide.shift(0, wid * 0.2)

  // Paths
  paths.help1 = new Path()
    .move(points.underbustCF)
    .line(points.hipsCF)
    .line(points.hipsCB)
    .line(points.underbustCB)
    .close()
  paths.help2 = new Path()
    .move(points.topSide)
    .line(points.bottomSide)
    .line(points.waistCF)
    .line(points.waistCB)
  paths.help1.hide()
  paths.help2.hide()

  paths.outline = new Path()
    .move(points.bottomCF)
    .curve(points.bottomCFCp2, points.hipRiseCp1, points.hipRise)
    .curve(points.hipRiseCp2, points.backDropCp1, points.backDrop)
    .line(points.backRise)
    .curve(points.backRiseCp1, points.topSideCp1, points.topSide)
    .line(points.frontRiseStart)
    .curve(points.frontRiseStartCp2, points.topCFCp1, points.topCF)
    .line(points.bottomCF)
    .close() //.hide() //jm changed, not what was here, not hidden.

  return part
}

export const base = {
  name: 'cathrin.base',
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
  draft: draftCathrinBase,
}
