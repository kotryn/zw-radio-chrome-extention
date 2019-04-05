chrome.runtime.sendMessage(
  { message: "init" },
  function (response) {
    console.log(response.message)
    setStatus(response.message)
  }
)

function setStatus(msg) {
  var status = document.querySelector('.status')
  status.innerHTML = msg
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === true) {
      sendResponse({ message: "play" })
      setStatus('play')
    }

    if (request.message === false) {
      sendResponse({ message: "pause" })
      setStatus('pause')
    }
  })