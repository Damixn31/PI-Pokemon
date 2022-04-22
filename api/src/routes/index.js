const { Router } = require('express');
const { route } = require('./pokemonId.js');
const pokemonId = require('./pokemonId.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routePokemon = require('./routePokemon.js')
const typeId = require('./typeId')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemon', routePokemon)
router.use('/pokemonId', pokemonId)
router.use('/typeId', typeId)




module.exports = router;
