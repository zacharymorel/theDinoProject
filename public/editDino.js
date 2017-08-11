const editWrapper = document.querySelector('.editWrapper')
const url = document.URL
const urlsplit = url.split('/')
const last = urlsplit[urlsplit.length-1]
const id = parseInt(last)


fetch(`/api/dinosaurs/${id}`)
  .then(response => response.json())
  .then(json => {
    
  })
