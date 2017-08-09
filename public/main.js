
fetch('/api/dinosaurs')
  .then(response => response.json())
  .then(json => {
    let dinoSection = document.querySelector('.dinoList ')
    json.forEach(dino => {
      let a = document.createElement('a')
      a.href = `/dinosaur/${dino.id}`
      a.textContent = `dino.name`

      let li = document.createElement('li')
      let img = document.createElement('img')
      img.src = `${dino.ImageUrl}`
      li.appendChild(a)
      li.appendChild(img)
      dinoSection.appendChild(li)
    })
  })
