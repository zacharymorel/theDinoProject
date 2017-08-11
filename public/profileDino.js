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
    const Habitats = document.createElement('p')
    const editAnchor = document.createElement('a')

    img.src = json.ImageUrl
    name.textContent = `Name: ${json.name}`
    color.textContent = `Color(s): ${json.color}`
    weight.textContent = `Relative Weight: ${json.weight}`
    Habitats.textContent = `Habitats: ${json.Habitats}`
    editAnchor.textContent = `Edit`
    editAnchor.href = `/dinosaurs/edit/${json.id}`

    personalList.appendChild(editAnchor)
    personalList.appendChild(img)
    personalList.appendChild(name)
    personalList.appendChild(color)
    personalList.appendChild(weight)
    personalList.appendChild(Habitats)
  })
