// const clearBtn = document.querySelector(".clear")
// clearBtn.onclick = clear

const colors = document.querySelector(".colors")

const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")

const circles = []

let selectedColor = "black"

let lastTimestamp = 0
let clickX, clickY, clickTime

colors.onclick = (event) => {
  selectedColor = event.target.style.backgroundColor
  ctx.strokeStyle = selectedColor
  colors.hidden = true
}

canvas.onmousedown = (e) => {

  clickX = e.offsetX
  clickY = e.offsetY

  clickTime = Date.now()
  // circles.push(new PulsingCircle(x1, y1, selectedColor, 10, 200, 200))

  // canvas.onmousemove = e => {
  //   x2 = e.offsetX
  //   y2 = e.offsetY
  //   drawLine(x1, y1, x2, y2, e.movementX + e.movementY)
  //   x1 = x2
  //   y1 = y2
  //   console.log(e.movementX + e.movementY)
  // }
}

canvas.onmouseup = (e) => {
  const distance = Math.hypot(clickX - e.offsetX, clickY - e.offsetY)
  const deltaTime = Date.now() - clickTime
  addCircle(clickX, clickY, distance, deltaTime)

  // canvas.onmousemove = null
}


canvas.width = innerWidth
canvas.height = innerHeight

ctx.lineCap = "round"


buildColorPanel(innerWidth, innerHeight, 50, 50)

requestAnimationFrame(animate)


class PulsingCircle {
  constructor(x, y, color, minSize, maxSize, sizeChangeSpeed /* px/s */) {
    this.x = x
    this.y = y
    this.color = color
    this.minSize = minSize
    this.size = minSize
    this.maxSize = maxSize
    this.sizeChangeSpeed = sizeChangeSpeed
  }

  changeSize(time) {
    const fullChange = (this.maxSize - this.minSize) * 2

    let sizeChange = (time * this.sizeChangeSpeed) / 1000
    sizeChange %= fullChange
    if (sizeChange === 0) return
    if (sizeChange > 0) {
      if ((this.size + sizeChange) < this.maxSize) {
        this.size += sizeChange
      } else {
        this.size = this.maxSize * 2 - this.size - sizeChange
        this.sizeChangeSpeed = -this.sizeChangeSpeed
      }

    } else { // sizeChange < 0
      if ((this.size + sizeChange) > this.minSize) {
        this.size += sizeChange
      } else {
        this.size = this.minSize * 2 - this.size - sizeChange
        this.sizeChangeSpeed = -this.sizeChangeSpeed
      }
    }
  }
}

new PulsingCircle(100, 100, "green", 50, 150, 40) // usage example


function buildColorPanel(width, height, rows, columns) {
  colors.style.width = `${width}px`
  colors.style.height = `${height}px`

  const cellCount = rows * columns
  const colorCount = cellCount - columns
  const grayCount = columns

  for (let i = 0; i < cellCount; i++) {

    const color = document.createElement("div")

    color.classList.add("color")
    color.style.width = `${width / columns}px`
    color.style.height = `${height / rows}px`

    if (i < colorCount) {
      color.style.backgroundColor = `hsl(${360 / colorCount * i}, 80%, 50%)`
    } else {
      color.style.backgroundColor = `hsl(0, 0%, ${100 / (grayCount - 1) * (i - colorCount)}%)`
    }

    colors.append(color)
  }
}


function clear() {
  ctx.beginPath()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}


function drawLine(beginX, beginY, endX, endY, width) {
  ctx.beginPath()
  ctx.moveTo(beginX, beginY)
  ctx.lineTo(endX, endY)
  ctx.lineWidth = width
  ctx.stroke()
}


function drawCircle(x, y, r, color) {
  ctx.beginPath()
  ctx.fillStyle = color

  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.fill()
}

function addCircle(x, y, r, time) {
  const maxSize = r * 2
  const minSize = r / 2

  const sizeChangeSpeed = (maxSize - minSize) / time * 1000 /* velocity=distance/time(time in sec) */ / 2

  circles.push(new PulsingCircle(x, y, `hsl(${lastTimestamp / 720}, 80%, 50%)`, minSize, maxSize, sizeChangeSpeed))
}

function animate(timestamp) {
  clear()
  const time = timestamp - lastTimestamp
  circles.forEach(circle => {
    circle.changeSize(time)
    drawCircle(circle.x, circle.y, circle.size / 2, circle.color)
  })
  lastTimestamp = timestamp

  console.log(timestamp / 1000 | 0, time | 0)
  requestAnimationFrame(animate)
}

function changeColor() {

}




































































































// function nameM(params) {
// canvas.onmousedown = ({ offsetX, offsetY }) => [beginX, beginY] = [offsetX, offsetY]
// canvas.onmouseup = ({ offsetX, offsetY }) => {
//   [endX, endY] = [offsetX, offsetY]
//   ctx.fillStyle = `hsl( ${Math.random() * 360},70%,20%)`
//   ctx.fillRect(beginX, beginY, endX - beginX, endY - beginY)
//   ctx.fillRect(beginX, beginY, endX - beginX, endY - beginY)
// }
// canvas.onmousemove = ({ offsetX, offsetY }) => {
//   ctx.fillStyle = `hsl( ${Math.random() * 360}, ${Math.random() * 100}%, ${Math.random() * 100}%)`;
//   [beginX, beginY] = [offsetX, offsetY]
//   ctx.fillRect(beginX, beginY, 10, 10)
// }

// // function line()
// canvas.onmousedown = ({ offsetX, offsetY }) => [beginX, beginY] = [offsetX, offsetY]
// canvas.onmouseup = ({ offsetX, offsetY }) => {
//   [endX, endY] = [offsetX, offsetY]
//   ctx.beginPath();
//   ctx.moveTo(beginX, beginY);
//   ctx.lineTo(endX, endY)
//   ctx.fillStyle = `hsl( ${Math.random() * 360}, ${Math.random() * 100}%, ${Math.random() * 100}%)`;
//   ctx.stroke();
//   }

// }
// nameM()        // Отображает_путь