const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length === 4) {
    console.log('give 3 three arguments: password, name, phone number')
    process.exit(1)
  }

const password = process.argv[2]


const url =
`mongodb+srv://fs_2021:${password}@cluster0.lwlno.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length===3) {

    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            const obj = person.toObject()
            console.log(obj.name, obj.number)
        })
        mongoose.connection.close()
    })

} else {

    const person_name = process.argv[3]
    const person_pn = process.argv[4]

    const person = new Person({
        name: person_name,
        number: person_pn
    })

    person.save().then(() => {
        console.log(`added ${person_name} number ${person_pn} to phonebook`)
        mongoose.connection.close()
    })
}

// const person = new Person({
//   content: 'HTML is Easy',
//   date: new Date(),
//   important: true,
// })

// person.save().then(response => {
//   console.log('person saved!')
//   mongoose.connection.close()
// })
