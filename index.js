const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
require('./database/conexion')

const PORT = process.env.PORT || 8080;

const app = express();
const PersonaControllers = require('./controllers/persona');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000'
})); 

app.get('/', async (req, res) => {
    /* res.send('Los ususarios están listos') */
    res.json({
        persona: await PersonaControllers.findAll()
    }); 
});

app.post('/crear', async (req, res) => {
    console.log(req.body);
        await PersonaControllers.create(req.body);
    res.json('Usuario Creado')
});

app.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    await PersonaControllers.delete(id);
    res.json('Usuario Eliminado')
});


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el Puerto: ${PORT}`);
})