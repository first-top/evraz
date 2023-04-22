window.addEventListener("DOMContentLoaded", () => {

  function setCloseModalPosition(modal) {
    const body = modal.querySelector(".k1-modal__body")
    const close = modal.querySelector(".k1-modal__close")
    const r = body.getBoundingClientRect()
    close.style.top = `${r.top - 35}px`
  }

  const tabTitles = document.querySelectorAll(".more-tabs__title")
  const tabContents = document.querySelectorAll(".more-tabs__content")
  tabTitles.forEach((elem, index) => {
    elem.addEventListener("click", () => {
      tabTitles.forEach(el => el.classList.remove("current"))
      tabContents.forEach(el => el.classList.remove("current"))
      elem.classList.add("current")
      tabContents[index].classList.add("current")
    })
  })

  const spoilerButtons = document.querySelectorAll(".more-tabs__open-text")
  spoilerButtons.forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.closest(".more-tabs__content")
      const contents = parent.querySelectorAll(".more-tabs__open-text + div")
      const currentContent = button.nextElementSibling
      contents.forEach(content => {
        if (currentContent !== content) {
          content.classList.remove("current")
          content.style.maxHeight = `0px`
          content.previousElementSibling.classList.remove("opened")
        } else {
          currentContent.classList.toggle("current")
          if (currentContent.classList.contains("current")) {
            currentContent.style.maxHeight = `${currentContent.scrollHeight}px`
            button.classList.add("opened")
          } else {
            currentContent.style.maxHeight = `0px`
            button.classList.remove("opened")
          }
        }
      })


    })
  })

  const inputs = document.querySelectorAll(".form-input input")
  inputs.forEach(input => {
    if (input.value) input.classList.add("k1-has-value")
    input.addEventListener("input", () => {
      if (input.value) input.classList.add("k1-has-value")
      else input.classList.remove("k1-has-value")
    })
  })

  const formListToggle = document.querySelectorAll(".form-chosen")
  formListToggle.forEach(elem => {
    elem.addEventListener("click", () => {
      elem.classList.toggle("opened")
      const elements = elem.nextElementSibling.querySelectorAll("li")
      elements.forEach(li => {
        li.addEventListener("click", () => {
          if (elem.classList.contains("opened")) {
            elem.textContent = li.textContent
            elem.classList.remove("opened")
          }
        })
      })
    })
  })

  const openModalButtons = document.querySelectorAll(".k1-open-modal")
  openModalButtons.forEach(button => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(".k1-academy-modal")
      modal.style.display = "flex"
      document.body.style.overflowY = "hidden"
      setCloseModalPosition(modal)
      modal.addEventListener("click", ({target}) => {
        if (!target.closest(".k1-modal__body")) {
          modal.style.display = "none"
          document.body.style.overflowY = "scroll"
        }
      })
      // modal.querySelector(".k1-modal__close")
    })
  })

  const mask = new PhoneMask({ })

})

// class PhoneMask {
//   mask
//   result = ''
//   caretPosition
//   constructor(param) {
//     this.mask = param.mask || '+7 (9xx) xxx xx xx'
//     if (param.nodes)
//       this.inputs = param.nodes
//     else
//       this.inputs = document.querySelectorAll(".k1-phone-input")
//
//     this.init()
//   }
//
//   init() {
//     for (let node of this.inputs) {
//       let input = node
//       if (node.type !== 'input') input = node.querySelector("input")
//       const value = input.value
//
//       input.value = this.mask.replace(/x/gi, "_")
//       input.addEventListener("focus", function ({target}) {
//         const value = target.value
//         const caretPosition = value.indexOf("_")
//         target.setSelectionRange(caretPosition, caretPosition)
//       })
//       input.addEventListener("input", this.setValue.bind(this))
//     }
//   }
//
//   setValue({data, target}) {
//     this.result = ''
//     let value = target.value
//     // let caretPosition
//     for (let i in this.mask) {
//       if (this.mask[i] === 'x')
//         if (value[i] && value[i].match(/\d/)) this.result += value[i]
//         else this.result += "_"
//       else this.result += this.mask[i]
//     }
//     target.value = this.result
//     if (data) this.caretPosition = this.result.indexOf("_")
//      else {
//       const symbolsArray = this.result.match(/\d/g)
//       const lastSymbol = symbolsArray[symbolsArray.length - 1]
//       this.caretPosition = this.result.lastIndexOf(lastSymbol) + 1
//     }
//     target.setSelectionRange(this.caretPosition, this.caretPosition)
//   }
// }