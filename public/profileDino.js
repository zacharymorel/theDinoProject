const personalList = document.querySelector('.personalList')
const url = document.URL
const urlsplit = url.split('/')
const last = urlsplit[urlsplit.length-1]
const id = parseInt(last)

fetch(`/api/dinosaurs/${id}`)
  .then(response => response.json())
  .then(json => {
    console.log(json);
    const img = document.createElement('img')
    const name = document.createElement('p')
    const color = document.createElement('p')
    const weight = document.createElement('p')
    const habitats = document.createElement('p')

    img.src = json.ImageUrl
    name.textContent = `Name: ${json.name}`
    color.textContent = `Color(s): ${json.color}`
    weight.textContent = `Relative Weight: ${json.weight}`
    habitats.textContent = `Habitats: ${json.Habitats}`

    personalList.appendChild(img)
    personalList.appendChild(name)
    personalList.appendChild(color)
    personalList.appendChild(weight)
    personalList.appendChild(habitats)
  })
