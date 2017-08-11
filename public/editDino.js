const editWrapper = document.querySelector('.editWrapper')
const url = document.URL
const urlsplit = url.split('/')
const last = urlsplit[urlsplit.length-1]
const id = parseInt(last)



function fetchinstein() {
  let myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  fetch(`/api/dinosaurs/${id}`, {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify({
      name: document.querySelector('input[name=name]').value,
      color: document.querySelector('input[name=color]').value,
      Habitats: document.querySelector('input[name=Habitats]').value,
      weight: document.querySelector('input[name=weight]').value
    })
  }).then(response => response.json())
  .then(json => {
    if (json.status === "ok") {
      window.location = `/dinosaur/${id}`
    }
    if (json.status === "error") {
      const errorH3 = document.querySelector('.error')
      // console.log(json.error)
      errorH3.innerText = `Sorry, couldn't update that dino`
    }
  })
}

fetch(`/api/dinosaurs/${id}`).then(response => response.json()).then(data => {
  // console.log(data);
    markup = `
    <form class="editform">
      <p>Name: </p><input type="text" name="name" value="${data.name}">
      <p>Color: </p><input type="text" name="color" value="${data.color}">
      <p>Habitats: </p><input type="text" name="Habitats" value="${data.Habitats}">
      <p>Weight:</p><input type="text" name="weight" value="${data.weight}">
      <button type="button" name="button" onclick="fetchinstein()">Save</button>
    </form>
    `
  editWrapper.innerHTML += markup
})
