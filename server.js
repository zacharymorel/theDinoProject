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
      console.log(dino);
      response.json(dino)
    })
})

app.get('/api/dinosaurs/:id/Habitats', (request, response) => {
  const dinoId = parseInt(request.params.id)
  database.one(`SELECT "Habitats" FROM "dinotable" WHERE id = $1`, [dinoId])
    .then(dino => {
      response.json(dino)
    })
})

app.post('/api/dinosaurs', (request, response) => {
  database.none(`INSERT INTO "dinotable" ("name", "color", "Habitats", "weight")
    VALUES ('oldDinoOnTheBlock', 'blue', 'jungle', '4000')`)
    response.json()
})

app.put('/api/dinosaurs/:id', (request, response) => {
  const dinoId = parseInt(request.params.id)
  database.result(`UPDATE "dinotable" SET "weight"=4000 WHERE "id"=1`, dinoId)
    .then(dinoId => {
      response.json(dinoId)
    })
})

app.delete('/api/dinosaurs/:id', (request, response) => {
  const dinoId = parseInt(request.params.id)
  database.result(`DELETE FROM "dinotable" WHERE "id"=$1`, [dinoId])
    .then(() => {
      response.json({success:true})
    })
})

app.listen(3000, () => {
  console.log('May the force be with you');
})
