const { Router } = require("express")
const axios = require('axios')
const { Type } = require('../db')
const url = "https://pokeapi.co/api/v2/type";

const typeId = Router()

const getTypesApi = async () => {
    try {
      const getApi = await axios.get(url);
      const results = getApi.data.results;
      results.forEach((r) => {
        Type.findOrCreate({
          where: { name: r.name },
        });
      });
      return await Type.findAll();
    } catch (error) {
      console.log(error);
    }
  };
  

typeId.get('/', async (req, res) => {
    try {
        const typesAll = await getTypesApi();
        res.send(typesAll);
      } catch (error) {
        console.log(error);
      }
});


module.exports = typeId