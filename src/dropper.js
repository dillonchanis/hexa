function magnify(imgID, zoom) {
  const img = document.getElementById(imgID)

  /* Create magnifier glass: */
  const glass = document.createElement('DIV')
  glass.setAttribute('class', 'img-magnifier-glass')

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img)

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')"
  glass.style.backgroundRepeat = 'no-repeat'
  glass.style.backgroundSize =
    img.width * zoom + 'px ' + img.height * zoom + 'px'
  const bw = 3
  const w = glass.offsetWidth / 2
  const h = glass.offsetHeight / 2

  function getCursorPos(e) {
    let x = 0
    let y = 0
    e = e || window.event
    /* Get the x and y positions of the image: */
    const a = img.getBoundingClientRect()
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left
    y = e.pageY - a.top
    /* Consider any page scrolling: */
    x = x - window.pageXOffset
    y = y - window.pageYOffset
    return { x: x, y: y }
  }

  function moveMagnifier(e) {
    let x
    let y
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault()
    /* Get the cursor's x and y positions: */
    const pos = getCursorPos(e)
    x = pos.x
    y = pos.y
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - w / zoom) {
      x = img.width - w / zoom
    }
    if (x < w / zoom) {
      x = w / zoom
    }
    if (y > img.height - h / zoom) {
      y = img.height - h / zoom
    }
    if (y < h / zoom) {
      y = h / zoom
    }
    /* Set the position of the magnifier glass: */
    glass.style.left = x - w + 'px'
    glass.style.top = y - h + 'px'
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition =
      '-' + (x * zoom - w + bw) + 'px -' + (y * zoom - h + bw) + 'px'
  }

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener('mousemove', moveMagnifier)
  img.addEventListener('mousemove', moveMagnifier)

  /*and also for touch screens:*/
  glass.addEventListener('touchmove', moveMagnifier)
  img.addEventListener('touchmove', moveMagnifier)
}

const captureScreen = async (x, y) => {
  const { desktopCapturer } = window

  try {
    const sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: {
        width: 1000,
        height: 1000
      }
    })
    const entireScreenSource = sources.find(
      source => source.name === 'Entire Screen' || source.name === 'Screen 1'
    )

    if (entireScreenSource) {
      const image = entireScreenSource.thumbnail
        .crop({
          x,
          y,
          width: window.innerWidth,
          height: window.innerHeight
        })
        .toDataURL()

      const div = document.getElementById('dropper-app')
      div.style.backgroundImage = `url("${image}")`
      div.style.backgroundRepeat = 'no-repeat'
      div.style.backgroundSize = `${2200}px ${2200}px`
    }
  } catch (e) {
    console.log(e)
  }
}

document.addEventListener('mousemove', e => {
  console.log(e)
  captureScreen(e.offsetX, e.offsetY)
  // magnify('dropper-app', 3)
})
