/**
 * The goal of this canvas is to support other canvases,
 * by making your canvas art pixel perfect. This will help the OCDs. Including me ;D.
 * 
 * You can simply use it two ways.
 * You simply just have to run the `drawGridlines` function the last to create the grid lines
 * This way it will read the canvas `width` and `height` if you resize in your code.
 * My recommendation is keep the canvas `width` and `height` in the form of multiplication by 5
 * 
 * Then you can draw the things you wanted.
 * Or if you have your own flow just copy the function to your code and just tinker around with it.
 * 
 * --- ONCE YOU'RE DONE
 * Once you're done with your art, just remove the whole `drawGridlines` function
 * and submit it. Why?
 * 1. It could make your canvas art ugly. Hence you will probably comment the code.
 * 2. If you just keep it in the script, maintainers will tell you to remove unused code.
 *    Because maintainers doesn't accept unused code.
 */

 function start () {
  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    draw(canvas)
    drawGridlines(canvas, {
      guides: {
        lineWidth: 1,
        vertical: [30, 300, 570],
        horizontal: [30, 300, 420, 570],
        strokeStyle: 'white'
      },
      grid: {
        size: 10,
        lineWidth: .5,
        strokeStyle: 'rgba(255,255,255,1)',
        axis: {
          font: "10px serif",
          x: {
            every: 30 // Every 30px
          },
          y: {
            every: 30 // Every 30px
          }
        }
      }
    })
  }
}

/** Do your actual drawings here! */
function draw(canvas) {
  const ctx = canvas.getContext('2d');

  // Digital Ocean Logo
  ctx.beginPath()
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 70
  ctx.arc(300, 300, 150, Math.PI, Math.PI / 2)
  ctx.stroke()

  ctx.fillStyle = 'white'
  ctx.fillRect(230, 350, 70, 70)
  ctx.fillRect(180, 420, 50, 50)
  ctx.fillRect(135, 375, 45, 45)
}


/**
 * Expect to get `canvas`
 * @param {*} canvas 
 * @param {Object} options  
 * @param {*} options.padding number 
 * @param {*} options.guides object
 * @param {number} options.guides.lineWidth object
 * @param {string=} [options.guides.grid.strokeStyle=black] For colors like hex, rgb, rgba
 * @param {*} options.guides.vertical array [x, x1, x2]
 * @param {*} options.guides.horizontal array [y, y1, y2]
 * @param {*} options.grid object 
 * @param {*} options.grid.size number 
 * @param {*} options.grid.lineWidth number
 * @param {string=} [options.grid.strokeStyle=black] For colors like hex, rgb, rgba
 * @param {*} options.grid.axis object 
 * @param {*} options.grid.axis.x object 
 * @param {number} options.grid.axis.x.every Shows X axis every {number}px 
 * @param {*} options.grid.axis.y object 
 * @param {number} options.grid.axis.y.every Shows Y axis every {number}px 
 */
function drawGridlines (canvas, options) {
  const {
    guides = {
      lineWidth: 1,
      vertical: [30, 270],
      horizontal: [30, 270],
      strokeStyle: 'navy'
    },
    grid
  } = options
  const { axis } = grid

  const ctx = canvas.getContext('2d');

  ctx.strokeStyle = grid.strokeStyle
  ctx.lineWidth = grid.lineWidth

  if ('x' in axis || 'y' in axis) {
    ctx.font = axis.font ? axis.font : "8px serif"
    ctx.fillStyle = 'white'
  }

  // Draw vertical line & Y axis if true
  for(let x=grid.size; x < canvas.width; x+=grid.size) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()

    // Draw the Y axis
    if ('x' in axis
      && 'every' in axis.x
      && x%axis.x.every === 0
    ) {
      ctx.beginPath()
      ctx.arc(x, grid.size, 1.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillText(x, x, grid.size)
    } 
  }
  // Draw horizontal line
  for(let y=grid.size; y < canvas.width; y+=grid.size) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
    ctx.stroke()

    // Draw the Y axis
    if ('y' in axis
      && 'every' in axis.y
      && y%axis.y.every === 0
    ) {
      ctx.beginPath()
      ctx.arc(grid.size, y, 1.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillText(y, grid.size, y)
    } 
  }
  ctx.stroke()

  // Draw guides
  ctx.beginPath()
  ctx.strokeStyle = guides.strokeStyle
  ctx.lineWidth = guides.lineWidth
  for(let i=0; i < guides.vertical.length; i++) {
    ctx.moveTo(guides.vertical[i], 0)
    ctx.lineTo(guides.vertical[i], canvas.height)
  }
  for(let i=0; i < guides.horizontal.length; i++) {
    ctx.moveTo(0, guides.horizontal[i])
    ctx.lineTo(canvas.width, guides.horizontal[i])
  }
  ctx.stroke()
}