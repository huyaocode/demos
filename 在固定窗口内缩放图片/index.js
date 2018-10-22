const wrapper = document.getElementsByClassName('wrapper')[0]
const sight = document.getElementById('sight')

const pWidth = 2000,
  pHeight = 940
let scale = 0.5

//Firefox
if (document.addEventListener) {
  document.addEventListener('DOMMouseScroll', scrollFunc, false)
}
//IE及其他浏览器
window.onmousewheel = document.onmousewheel = scrollFunc

const offLeft = wrapper.offsetLeft
const offTop = wrapper.offsetTop

let p_x = 0,
  p_y = 0

function scrollFunc(e) {
  let eX = e.clientX - offLeft,
    eY = e.clientY - offTop
  if (e.deltaY < 0) {
    if (scale > 2) {
      return
    }
    p_x += (eX / 1000) * (pWidth * 0.1)
    p_y += (eY / 470) * (pHeight * 0.1)
    scale += 0.1
  } else {
    if (scale <= 0.5) {
      scale = 0.5
      p_x = 0
      p_y = 0
      changeBgSizePos(p_x, p_y)
      return
    }

    p_x -= (eX / 1000) * (pWidth * 0.1)
    p_y -= (eY / 470) * (pHeight * 0.1)
    scale -= 0.1
    if (p_x + 1000 > pWidth * scale) {
      p_x = pWidth * scale - 1000
    }
    if (p_y + 470 > pHeight * scale) {
      p_y = pHeight * scale - 470
    }
    if (p_x < 0) {
      p_x = 0
    }
    if (p_y < 0) {
      p_y = 0
    }
  }

  changeBgSizePos(p_x, p_y)
  changeMinSizePos(p_x, p_y)
}

function changeBgSizePos(x, y) {
  wrapper.style.backgroundSize = `${pWidth * scale}px ${pHeight * scale}px`
  wrapper.style.backgroundPosition = `${-x}px ${-y}px`
}
function changeMinSizePos(x, y) {
  sight.style.width = `${200 * 1 / ( scale) / 2}px`
  sight.style.height = `${96 * 1 /( scale) / 2}px`
  sight.style.top = y / 20 + 'px';
  sight.style.left = x / 20+ 'px';
}
