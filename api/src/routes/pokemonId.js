const { Router} = require('express')
const { Pokemon, Type } = require('../db')
const pokemonId = Router();
const axios = require('axios')


//ID-DB
const getIdDb = async (id) => {
    try {
      const findIdDb = await Pokemon.findByPk(id, {
        include: Type});
      return {
        id: findIdDb.id,
        hp: findIdDb.hp,
        name: findIdDb.name,
        force: findIdDb.force,
        defending: findIdDb.defending,
        speed: findIdDb.speed,
        height: findIdDb.height,
        weight: findIdDb.weight,
        type: findIdDb.types.map((t) => t.name),
        img: findIdDb.img,
        createdByUser: findIdDb.createdByUser,
      };
    } catch (error) {
      console.log(error);
    }
  };

   // ID API
const getIdApi = async (id) => {
    try {
      const apiId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const IdDetails = await apiId.data;
      const idApiclear =  {
        id: IdDetails.id,
        name: IdDetails.name,
        hp: IdDetails.stats[0].base_stat,
        force: IdDetails.stats[1].base_stat,
        defending: IdDetails.stats[2].base_stat,
        speed: IdDetails.stats[5].base_stat,
        height: IdDetails.height,
        weight: IdDetails.weight,
        type: IdDetails.types.map((t) => t.type.name),
        img: IdDetails.sprites.other.home.front_default,
      };
      return idApiclear

    } catch (error) {
      console.log(error);
    }
  };
  
  
  // ID API DB
  const allPokeByID = async (id) => {
      try {
          if (id.includes('-')) {
              const dbIdInfo = await getIdDb(id);
              return dbIdInfo
          } else {
              const apiInfo = await getIdApi(id);
              return apiInfo;
          }
      } catch (error) {
          console.log(error);
      }
  };

 

//RUTA ID
pokemonId.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
        const fromApiOrDb = await allPokeByID(id);
        if (fromApiOrDb) {
            return res.send(fromApiOrDb);
        } else {
            return res.status(404).json({msg: "Poke Not Found"})
        }
  } catch (error) {
      console.log(error);
    }
  });

//RUTA POST
pokemonId.post("/", async (req, res) => {
  try {
    const {
      name,
      hp,
      img,
      force,
      defending,
      speed,
      height,
      weight,
      types,
      createdByUser,
    } = req.body;
    const newPokemon = await Pokemon.create({
      name,
      hp,
      img:
      img || "http://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG10.png",
      force,
      defending,
      speed,
      height,
      weight,
      createdByUser,
    });
    const typePokemon = await Type.findAll({
      where: { name: types },
    });

    newPokemon.addType(typePokemon);
    return res.send(newPokemon);
  } catch (error) {
    console.log(error);
  }
});



  module.exports =  pokemonId