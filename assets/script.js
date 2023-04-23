const pictureDecor = {

  setDecor(top, bottom) {
    this.removeDecor(bottom)
    const {width, height, left} = this.getDecorPosition(top, bottom)
    if (width && height) {

      const decor = document.createElement("div")
      const container = bottom.closest(".container")

      const styles = getComputedStyle(container)
      const pl = +styles.paddingLeft.replace("px", "")

      const space = pl + container.getBoundingClientRect().x

      decor.classList.add("picture-decor")
      decor.style.width = `${width}px`
      decor.style.height = `${height}px`
      decor.style.left = `${left - space}px`
      bottom.append(decor)

    }
  },

  removeDecor(item) {
    const decor = item.querySelector(".picture-decor")
    if (decor) decor.remove()
  },

  getDecorPosition(top, bottom) {
    const rectTop = top.querySelector("img").getBoundingClientRect()
    const rectBottom = bottom.querySelector("img").getBoundingClientRect()
    const obj = {weight: 0, height: 0, left: 0}

    // const topX = top.querySelector("img").x

    if (rectTop.x < rectBottom.x) {
      obj.width = rectTop.x + rectTop.width - rectBottom.x
      obj.height = rectTop.bottom - rectBottom.y
      obj.left = rectBottom.x
    } else {
      obj.width = rectBottom.right - rectTop.x
      obj.height = rectTop.bottom - rectBottom.y
      obj.left = rectTop.x
    }
    if (obj.width && obj.height) {
      return obj
    }
    return false
  },

  setPictureDecor(node) {
    const picture = node.closest(".p-r").querySelector("img")
    const classes = node.classList
    const rect = picture.getBoundingClientRect()
    console.log(classes)
    const position = {}
    if (node.classList.contains("r")) {
      node.style.left =`${rect.width}px`
    }
    if (node.classList.contains("l")) {
      node.style.right =`${rect.width}px`
    }
  },


  init() {
    const items = document.querySelectorAll(".item")
    const topPicturesDecor = document.querySelectorAll(".img-decor")
    items.forEach(item => {
      const pictureTop = item.querySelector(".item-picture_top")
      const pictureBottom = item.querySelector(".item-picture_bottom")
      if (pictureTop && pictureBottom) this.setDecor(pictureTop, pictureBottom)
    })

    topPicturesDecor.forEach(elem => {
      this.setPictureDecor(elem)
    })
  }
}

window.addEventListener("load", () => {
  pictureDecor.init()
})

window.addEventListener("resize", () => {
  pictureDecor.init()
})
