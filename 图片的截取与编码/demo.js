let isSelecting = 0
let sPos = {}
let ePos = {}
const srcImg = document.getElementById('srcImg')
srcImg.onclick = function(e) {
  const left = document.getElementsByClassName('left')[0]
  const shot = document.getElementById('shot')
  const leftW = srcImg.offsetLeft + left.offsetLeft
  const topPW = srcImg.offsetTop + left.offsetTop

  if (isSelecting === 0) {
    sPos.left = e.clientX - leftW
    sPos.top = e.clientY - topPW
    shot.style.left = sPos.left + 'px'
    shot.style.top = sPos.top + 'px'
    isSelecting = 1
  } else if (isSelecting === 1) {
    ePos.left = e.clientX - leftW
    ePos.top = e.clientY - topPW
    isSelecting = 2
    shot.style.width = ePos.left - sPos.left + 'px'
    shot.style.height = ePos.top - sPos.top + 'px'
    capture()
  }
}

//截图
function capture() {
  let x1 = sPos.left
  let y1 = sPos.top
  let w = parseInt(ePos.left - sPos.left)
  let h = parseInt(ePos.top - sPos.top)
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  ctx.drawImage(srcImg, x1, y1, w, h, 0, 0, w, h, 0)
  isSelecting = 0;
  ctx.clearRe
  codingBtn.disabled = false
}

