const axios = require("axios");
const { Router } = require('express')
const routePokemon = Router();
const { Pokemon, Type } = require('../db');
const url = 'http://pokeapi.co/api/v2/pokemon';
const urlQ = `http://pokeapi.co/api/v2/pokemon`;

const getPokeApi = async () => {
    try{
        const pokeApi = await axios.get(url)
        const next = await axios.get(pokeApi.data.next);
        const onlyForty = pokeApi.data.results.concat(next.data.results).slice(0, 40);
        
        const infoForty = onlyForty.map(async (d) => await axios.get(d.url));
        // console.log(infoForty)
        let pokeForty = await Promise.all(infoForty).then((promise) => {
            let pokeData = promise.map((e) => e.data);
            let pokemons = pokeData.map((poke) => ({
                id: poke.id,
                name: poke.name,
                hp: poke.stats[0].base_stat,
                force: poke.stats[1].base_stat,
                defending: poke.stats[2].base_stat,
                speed: poke.stats[5].base_stat,
                height: poke.height,
                weight: poke.weight,
                types: poke.types.map((t) => t.type.name),
                img: poke.sprites.other.home.front_default,
            }))
            return pokemons;
        })
        return pokeForty;
    } catch (err) {
        console.log(err)
    }
};

const getPokemonsDb = async () => {
    try {
        const pokeDb = await Pokemon.findAll({
            //Busco todos los pokemon de los modelos
            include: {
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        const findPoke = pokeDb.map((e) => ({
            id: e.id,
            name: e.name,
            attack: e.attack,
            types: e.types.map((t) => t.name),
            img: e.img,
            createdByUser: e.createdByUser,
        }));
        return findPoke;
    } catch (error) {
        console.log(error)
    }
};

//QUERY
const getApiName = async (name) => {
    try {
      const apiName = await axios.get(`${urlQ}/${name}`);
      const names =  await apiName.data
      //console.log(apiName.data, 'soy apinamedata')
      return [{
          id: names.id,
          name: names.name,
          types: names.types.map((t) => t.type.name),
                    img: names.sprites.other.home.front_default,
                    force: names.stats[1].base_stat,
                }]
            } catch (error) {
                console.log(error);
            }
        };
        //console.log(getApiName(), 'SOY API NAME')
        


//QUERY DB
const getPokemonsName = async (name) => {
    try {
      const dbNames = await Pokemon.findAll({
        where: { name: name },
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      const filtroName = dbNames.map((n) => {
        return {
          id: n.id,
          name: n.name,
          types: n.types.map((t) => t.name),
          img: n.img,
          force: n.force,
          createdByUser: n.createdByUser,
        };
      });
      return filtroName;
    } catch (error) {
      console.log(error);
    }
  };
  


 //RUTA POR QUERY
 routePokemon.get("/", async (req, res) => {
    try {
      const { name } = req.query;
      if (name) {
        const lowerName = name;
        const apiPokeQ = await getApiName(lowerName);
        // console.log(apiPokeQ, 'ESTOS SON LOS NOMBRES DE LA POKE')
        if (!apiPokeQ) {
          const dbPokeQ = await getPokemonsName(lowerName);
          if (!dbPokeQ) {
            // console.log(dbPokeQ);
            res.status(404).json({ error: 'Pokemon not found' });
          } else res.json(dbPokeQ);
        } else res.json(apiPokeQ)
      } else {
        //union db -api
        const apiP = await getPokeApi();
        const dataB = await getPokemonsDb();
        const pokeAll = apiP.concat(dataB);
        //console.log(pokeAll, 'ESTOS SON TODOS LOS POKEMONES')
        if (dataB.length > 0) {
          res.json(pokeAll);
        } else res.json(apiP);
      }
    }catch (error) {
    console.log(error)
  }
  });
  

module.exports = routePokemon