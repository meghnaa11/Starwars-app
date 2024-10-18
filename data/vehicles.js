import axios from 'axios';

const getVehicleById = async (id) => {
    if(!id) throw "Please provide an ID";
    if(typeof id != 'number') id = Number(id.trim());
    try {
        const {data} = await axios.get(`https://swapi.dev/api/vehicles/${id}/`);
        return data;
    } catch(error) {
        throw `Vehicle with ID ${id} not found`;
    }
};

const getStarshipById = async (id) => {
    if(!id) throw "Please provide an ID";
    if(typeof id != 'number') id = Number(id.trim());
    try {
        const {data} = await axios.get(`https://swapi.dev/api/starships/${id}/`);
        return data;
    } catch(error) {
        throw `Starship with ID ${id} not found`;
    }
};

const getPlanetById = async (id) => {
    if(!id) throw "Please provide an ID";
    if(typeof id != 'number') id = Number(id.trim());
    try {
        const {data} = await axios.get(`https://swapi.dev/api/planets/${id}/`);
        console.log(data)
        return data.name;
    } catch(error) {
        throw `Planet with ID ${id} not found`;
    }
};

export {getVehicleById, getStarshipById, getPlanetById};