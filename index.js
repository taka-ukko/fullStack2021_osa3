const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json())

app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Reiska",
        number: "123345124"
    },
    {
        id: 3,
        name: "Teppo Tulppa",
        number: "313"
    }
]

app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${Date()}</p>
    `)
})
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => id === p.id)

    if (person) {
        res.json(person)
    }
     else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => id !== p.id)

    res.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random()*10e10)
}
  
app.post('/api/persons', (req, res) => {
    const body = req.body
  
    if (!body.name || !body.number) {
        return res.status(400).json({ 
            error: 'name or number missing' 
        })
    } else if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({ 
            error: 'name must be unique' 
        })
    }
  
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
  
    persons = persons.concat(person)
  
    res.json(person)
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})   