var heroes = document.querySelectorAll(".hero")

for (var h of heroes) {
  h.addEventListener("click", async function() {
    var selectedHero = this.dataset.hero
    localStorage.setItem("selectedHero", selectedHero)


    // Load HTML
    var response = await fetch("spider_game.html")
    var tttHtml = await response.text()
    document.querySelector("#app").innerHTML = tttHtml


    // Load CSS
    var link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "spider_game.css"
    document.head.appendChild(link)


    // Load JS
    var script = document.createElement("script")
    script.src = "spider_game.js"
    document.body.appendChild(script)
  })
}
