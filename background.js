var isPlaying = false
var isInit = false
var audio
var isClicked = false

function play() {
  return new Promise(function (resolve, reject) {
    if (!isInit) {
      audio = new Audio('http://play.zw.lt:8000/zw128')
      audio.play()
      isInit = true
      audio.onerror = reject
      audio.onplaying = resolve
    } else {
      if (isPlaying) {
        audio.pause()
        audio.onpause = resolve
      } else {
        audio.load()
        audio.play()
        audio.onerror = reject
        audio.onplaying = resolve
      }
    }
  })
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === "init") {
      sendResponse({ message: "loading" })
      if (!isClicked) {
        isClicked = true
        play().then(function () {
          isPlaying = !isPlaying
          chrome.runtime.sendMessage(
            { message: isPlaying },
            // function (response) {
            //   console.log(response)
            // }
          )
          isClicked = false
        })
      }
    }
  })


