import { base } from './base.mjs'

function draftCathrinPanels({ measurements, options, store, points, paths, Point, Path, part }) {
  paths.side = new Path()
    //.move(points.a)
    .move(points.X)
    .line(points.Y)
    .line(points.Z)
    .line(points.LHip)
    .line(points.A)
    .curve(points.A, points.B, points.C) // needs to be fixed too, actually pretty good at this point.
    .attr('class', 'fabric')
    .hide()

  paths.side1 = new Path()
    // this one is done
    .move(points.X)
    .line(points.U)
    .line(points.S)
    .line(points.O)
    .line(points.Z)
    .line(points.Y)
    //	  .line(points.LHip)
    .line(points.X)
    .hide()
  //
  //	  .curve(points.A, points.B, points.C)// needs to be fixed too, actually pretty good at this point.
  //	.attr('class', 'fabric').translate(30, 30).hide()

  paths.side2 = new Path()
    // this one too
    .move(points.T)
    .line(points.R)
    .line(points.LHip)
    .line(points.O)
    .line(points.S)
    .line(points.T)
    .attr('class', 'fabric') //.translate(-30, 30).hide()

  points.Mold = points.M.clone()
  /*   let add_dart = ['M', 'I', 'l', 'IWaist', 'P', 'bdl', 'bdll', 'V', 'K']//, 'G', 'D', 'C', 'B', 'A', 'b']
    let ang3 = points.L.angle(points.M) - points.L.angle(new Point (points.M.x, points.M.y +store.shoulder_dart))
    for (let p of add_dart) {
//	points[p] = points[p].rotate(-ang3, points.L)
    }*/

  paths.side3 = new Path()
    // and this one
    .move(points.A)
    .line(points.Mold)
    .line(points.IWaist)
    .line(points.P)
    .curve(points.P, points.bdll, points.V)
    .move(points.V)
    .line(points.L)
    .line(points.G)
    .line(points.C)
    .curve(points.C, points.B, points.A)
    .attr('class', 'fabric')
    .hide()

  paths.side3p = new Path()
    .move(points.Mold)
    .line(points.L)
    //	.line(points.M)
    .line(points.oldDart)
    .attr('class', 'fabric')
    .hide()
  /*
    // Now we want to fold away the darts from the chest and shoulder, and add one to the chest from L
    
    
    
    }


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
    }*/

  paths.side4 = new Path()
    .move(points.F)
    .line(points.H)
    .line(points.L)
    .line(points.V)
    .curve(points.V, points.bdrr, points.Q)
    .line(points.Q)
    .line(points.X)
    ._curve(points.sideguide, points.a)
    ._curve(new Point(points.h.x - 30, points.h.y), points.g)
    .line(points.F)
    //	  .join(paths.armhole).reverse()
    .attr('class', 'fabric')
    .hide() //translate(20, -30).hide()

  return part
}

export const panels = {
  name: 'cathrin.panels',
  from: base,
  hide: true,
  draft: draftCathrinPanels,
}
