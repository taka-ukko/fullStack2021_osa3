require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
// const { response } = require('express')

app.use(express.json())

app.use(cors())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('build'))


// let persons = [
//     {
//         id: 1,
//         name: "Arto Hellas",
//         number: "040-123456"
//     },
//     {
//         id: 2,
//         name: "Reiska",
//         number: "123345124"
//     },
//     {
//         id: 3,
//         name: "Teppo Tulppa",
//         number: "313"
//     }
// ]

app.get('/info', (req, res) => {
	Person.find({}).then(p => {
		res.send(`
            <p>Phonebook has info for ${p.length} people</p>
            <p>${Date()}</p>
        `)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(p => {
      response.json(p)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(p => {
        if (p) {
            response.json(p)
          } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
  })

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id).then(() => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

// const generateId = () => {
//     return Math.floor(Math.random()*10e10)
// }

// app.post('/api/persons', (req, res) => {
//     const body = req.body

//     if (!body.name || !body.number) {
//         return res.status(400).json({
//             error: 'name or number missing'
//         })
//     } else if (persons.find(p => p.name === body.name)) {
//         return res.status(400).json({
//             error: 'name must be unique'
//         })
//     }

//     const person = {
//         id: generateId(),
//         name: body.name,
//         number: body.number,
//     }

//     persons = persons.concat(person)

//     res.json(person)
// })

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    // if (body.name === undefined || body.number === undefined) {
    //     return response.status(400).json({
    //         error: 'name or number missing'
    //     })
    // }

    Person.find({ name: body.name }).then(() => {
        const person = new Person({
            name: body.name,
            number: body.number,
        })

        person.save().then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))

    })

    // Person.find({ name: body.name }).then(p => {
    //     if (p.length !== 0) {
    //         return response.status(400).json({
    //             error: 'name must be unique'
    //         })
    //     }
    //     const person = new Person({
    //         name: body.name,
    //         number: body.number,
    //     })

    //     person.save().then(savedPerson => {
    //         response.json(savedPerson)
    //     })

    // })

})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
      name: body.name,
      number: body.number,
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})