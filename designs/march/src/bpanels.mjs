import { bbase } from './bbase.mjs'

function draftCathrinPanels({ measurements, options, store, points, paths, Point, Path, part }) {
  paths.three = new Path()
    .move(points.K)
    .line(points.H)
    .line(points.J)
    .line(points.A)
    .curve(points.B, points.C, points.C)
    .line(points.F)
    .line(points.d)
    .line(points.c)
    .close()
    .hide()
  //    .translate(-10, -10)

  /*  paths.armhole = new Path()
	.move(points.Z)
	.curve(points.Z, points.e, points.e)// CRITICAL needs to end up on f, haven't fixed yet
	.curve(points.e, points.arm3, points.xbo)
	.curve(points.xbo, points.D, points.D).hide()*/

  paths.four = new Path()
    .move(points.M)
    .curve(points.M, points.sidec, points.Z)
    .curve(points.Z, points.e, points.e)
    .curve(points.e, points.arm3, points.xbo)
    .curve(points.xbo, points.D, points.D)
    .line(points.D)
    .line(points.E)
    .line(points.c)
    .line(points.L)
    .line(points.M)
    .attr('class', 'fabric')
    .hide()
  //	.translate(20, 40)

  paths.five = new Path()
    .move(points.N)
    .line(points.O)
    .line(points.Q)
    .line(points.R)
    .line(points.I)
    .line(points.LHip)
    .line(points.N)
    .attr('class', 'fabric')
    .hide() //translate(0, 30).hide()

  paths.six = new Path()
    .move(points.P)
    .line(points.O)
    .line(points.N)
    .line(points.LHipOuter)
    .line(points.T)
    .line(points.M)
    .line(points.P)
    .attr('class', 'fabric')
    .hide() //translate(30, 80).hide()

  /*
      paths.side = new Path()
      //.move(points.a)
      .move(points.X) 
      .line(points.Y)
      .line(points.Z)
      .line(points.LHip)
      .line(points.A)
      .curve(points.A, points.B, points.C)// needs to be fixed too, actually pretty good at this point.
      .attr('class', 'fabric').hide()

      paths.side1 = new Path()
      // this one is done
      .move(points.X) 
      .line(points.U)
      .line(points.S)      
      .line(points.O)
      .line(points.Z)
      .line(points.Y)	
      //	  .line(points.LHip)
      .line(points.X).hide()
      // 
      //	  .curve(points.A, points.B, points.C)// needs to be fixed too, actually pretty good at this point.
      .attr('class', 'fabric').translate(30, 30).hide()

      paths.side2 = new Path()
      // this one too
      .move(points.T)		  
      .line(points.R)
      .line(points.LHip)
      .line(points.O)
      .line(points.S)
      .line(points.T)
      .attr('class', 'fabric').translate(-30, 30).hide()


      points.Mold = points.M.clone()
      let add_dart = ['M', 'I', 'l', 'IWaist', 'P', 'bdl', 'bdll', 'V', 'K']//, 'G', 'D', 'C', 'B', 'A', 'b']
      let ang3 = points.L.angle(points.M) - points.L.angle(new Point (points.M.x, points.M.y +store.shoulder_dart))
      for (let p of add_dart) {
      //	points[p] = points[p].rotate(-ang3, points.L)
      }
      
      paths.side3 = new Path()
      

      let rotate = ['d', 'a', 'W', 'k', 'i', 'j', 'h', 'xf', 'g', 'F', 'G', 'H', 'f'   ]
      let ang = points.L.angle(points.d) - points.L.angle(points.e)
      //throw new Error ("angle is " + (-points.L.angle(points.d) + points.L.angle(points.e))) //+ points.e.dist(points.d))
      for (let p of rotate) {
      points[p] = points[p].rotate(-ang, points.L)
      //	  throw new Error ("angle is " + points.e.angle(points.d))
      }
      let rotate2 = ['k', 'xf', 'g', 'F', 'G', 'H', 'f']
      let ang2 = points.L.angle(points.k) - points.L.angle(points.j)
      for (let p of rotate2) {
      points[p] = points[p].rotate(-ang2, points.L)
      }

      paths.side4 = new Path()
      .move(points.F)
      .line(points.H)
      .line(points.L)
      .line(points.V)
      .curve(points.V, points.bdrr , points.Q)
      .line(points.Q)
      .line(points.X)
      ._curve(points.sideguide,  points.a)
      ._curve( new Point(points.h.x-30, points.h.y), points.g)
      .line(points.F)      
      //	  .join(paths.armhole).reverse()
      .attr('class', 'fabric').translate(20, -30).hide()

    */
  return part
}

export const bpanels = {
  name: 'cathrin.bpanels',
  from: bbase,
  hide: true,
  draft: draftCathrinPanels,
}
