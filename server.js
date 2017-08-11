const express = require('express')
const pgPromise = require('pg-promise')()
const bodyParser = require('body-parser')

const mustacheExpress = require('mustache-express')


const app = express()

const database = pgPromise({ database: 'thedinos' })

// console.log(database);

app.engine('mustache', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mustache')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// database.any(`SELECT * FROM "dinotable"`).then(rows => {
//   rows.forEach(row => {
//     console.log(`This user id ${row.id} and it's name is ${row.name}.`);
//   })
// })

app.get('/', (request, response) => {
  response.render('dino')
})


app.get('/api/dinosaurs', (request, response) => {
  database.any('SELECT * FROM "dinotable"').then(rows => {
    response.json(rows)
  })
})

app.get('/dinosaur/:id', (request, response) => {
  response.render('profileDino')
})

app.get('/api/dinosaurs/:id', (request, response) => {
  const dinoId = parseInt(request.params.id)
  database.one(`SELECT * FROM "dinotable" WHERE id = $1`, [dinoId])
    .then(dino => {
      // console.log(dino);
      response.json(dino)
    })
})

app.get('/dinosaurs/edit/:id', (request, response) => {
  response.render('editDino')
})

app.get('/api/dinosaurs/:id/Habitats', (request, response) => {
  const dinoId = parseInt(request.params.id)
  database.one(`SELECT "Habitats" FROM "dinotable" WHERE id = $1`, [dinoId])
    .then(dino => {
      response.json(dino)
    })
})

app.get('/addDinosaur', (request, response) => {
  // get to send main page to create dino form
  response.render('createDino')
})

app.post('/addingDinosaur', (request, response) => {
  // DB data here
  const addDino = {
    name: request.body.name,
    color: request.body.color,
    Habitats: request.body.Habitats,
    weight: request.body.weight
  }

  database.none(`INSERT INTO "dinotable" ("name", "color", "Habitats", "weight")
    VALUES ($(name), $(color), $(Habitats), $(weight))`, addDino)
    .then(addDino => {
      response.render('dino', addDino)
    })
})

app.post('/api/dinosaurs', (request, response) => {
  database.none(`INSERT INTO "dinotable" ("name", "color", "Habitats", "weight")
    VALUES ('oldDinoOnTheBlock', 'blue', 'jungle', '4000')`)
    response.json()
})

app.put("/api/dinosaurs/:id", (request,response) => {
  const dinoid = parseInt(request.params.id)
  const updatedino = {
    id: dinoid,
    name: request.body.name,
    color: request.body.color,
    Habitats: request.body.Habitats,
    weight: parseInt(request.body.weight)
  }

  database.result(`UPDATE "dinotable" SET ("name", "color", "Habitats", "weight") = ($(name), $(color), $(Habitats), $(weight)) WHERE id = $(id)`, updatedino)
    .then(data => {
      response.json({status: "ok"})
    })
    .catch(error => {
      response.json({status: "error", error: error})
    })
})

app.delete('/api/dinosaurs/', (request, response) => {
  const dinoId = parseInt(request.params.id)
  database.result(`DELETE FROM "dinotable" WHERE "id"=$1`, [dinoId])
    .then(() => {
      response.json({success:true})
    })
})

app.listen(3000, () => {
  console.log('May the force be with you');
})
