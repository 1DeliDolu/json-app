const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend URL
  credentials: true
}))

// ...existing code...

app.get('/sensors', (req, res) => {
  // Your sensors endpoint logic
})

// ...existing code...
