const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('"../frontend/dist"'))

const cors = require('cors')

app.use(cors())

const morgan = require('morgan')

morgan.token('body', (request) => {
  if (request.method !== 'POST') return '';

  return JSON.stringify({
    name: request.body.name,
    number: request.body.number
  });
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

let notes = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(notes)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;

  const person = notes.find(item => item.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${notes.length} people</p>
    <p>${date}</p>
  `)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  
  if (!notes.some(note => note.id === id)) {
   return response.status(404).json({ error: 'not found' });
  }

  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const person = request.body

  if(!person.name || !person.number){
    return response.status(400).json({ error: 'name or number missing' });
  }
  if (notes.some(note => note.name === person.name)){
    return response.status(400).json({ error: 'name must be unique' });
  }

  const id = Math.floor((Math.random() * 10000000) + 1).toString();

  notes = notes.concat({id, ...person})

  response.json({id, ...person})
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})