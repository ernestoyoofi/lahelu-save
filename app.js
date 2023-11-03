async function _ScrapId(post_id) {
  const its = document.querySelector('button.btn-start')
  its.innerText = "Memuat..."
  try {
    const data = await (await fetch(`https://serv-fc.vercel.app/lahelu-get-post/${post_id}`)).json()
    its.innerText = "Mulai permintaan"
    if(!data.media) {
      return alert(data.message || "Error but no message")
    }
    const urlMedia = data.media.slice(0, 4) === "http"? data.media: `https://cache.lahelu.com/${data.media}`
    let mediaPost = `<video src="${urlMedia}" autoplay loop controls></video>`
    if(data.mediaType === 0) {
      mediaPost = `<img src="${urlMedia}" width="100%" />`
    }
    document.querySelectorAll('video').forEach(z => {
      z.pause()
    })
    const dataDiv = document.createElement("div")
    dataDiv.className = "post-box"
    dataDiv.innerHTML = `<h3>${data.title}</h3>${mediaPost}<div class="control-fake"><div class="btn-quick"><span class="material-symbols-outlined" style="font-size: 16px;">thumb_up</span><span class="text">${data.totalUpvotes}</span></div><div class="btn-quick"><span class="material-symbols-outlined" style="font-size: 16px;">thumb_down</span><span class="text">${data.totalDownvotes}</span></div><div class="btn-quick"><span class="material-symbols-outlined" style="font-size: 16px;">comment</span><span class="text">${data.totalComments}</span></div><a href="${urlMedia}" download="${urlMedia}" target="_blank" class="btn-quick"><span class="material-symbols-outlined" style="font-size: 17px;">download</span></a></div>`
    document.querySelector('.post-result').prepend(dataDiv)
  } catch(err) {
    its.innerText = "Mulai permintaan"
  }
}
function _MainApp() {
  const input = document.querySelector('input[name="url-post"]')
  const button = document.querySelector('button.btn-start')
  const barQuick = document.querySelector('.url-input')
  input.addEventListener("focus", () => {
    barQuick.setAttribute("select-input", "2")
  })
  input.addEventListener("blur", () => {
    if(input.value.length > 0) {
      return barQuick.setAttribute("select-input", "2")
    }
    barQuick.setAttribute("select-input", "1")
  })
  button.addEventListener("click", (e) => {
    if(!input.value.match("lahelu.com/post/")) {
      return alert("Silahkan masukan url yang benar !")
    }
    _ScrapId(input.value.split("lahelu.com/post/")[1])
  })
}
_MainApp()