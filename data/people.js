import axios from "axios";
import { extractId, getVehiclesId } from "../helper.js";
import { getVehicleById, getStarshipById, getPlanetById } from "./vehicles.js";

const getPeople = async (page=1) => {
  try {
    const { data } = await axios.get(`https://swapi.dev/api/people/?page=${page}`);

    // Getting the page number
    const extractPageNumber = (url) => {
      if (!url) return null; 
      const match = url.match(/page=(\d+)/); 
      return match ? parseInt(match[1], 10) : null; 
    };

    const nextPage = extractPageNumber(data.next); 
    const previousPage = extractPageNumber(data.previous); 

    const people = await Promise.all(
      data.results.map(async (element) => {
        element.homeworldName = await getPlanetName(element);
        element.id = extractId(element.url);
        return element;
      })
    );
    console.log("getPeople data: ");
    console.log(people);
    return {people, nextPage, previousPage};
  } catch (error) {
    console.log(error);
    throw "Could not get the characters";
  }
};

// Getting the planet name from the URL in individual character's data
const getPlanetName = async (person) => {
    if(!person) throw "Please provide character data";
  let planetId = 0;
  if (person.homeworld && person.homeworld.trim().length != 0) {
    planetId = extractId(person.homeworld);
  }
  if (planetId == 0) {
    return "No homeworld";
  }
  return await getPlanetById(planetId);
};

const getPeopleById = async (id) => {
  console.log("getPeopleById");
  console.log(id);
  if (!id) throw "Please provide an ID";
  id = Number(id.trim());
  try {
    const { data } = await axios.get(`https://swapi.dev/api/people/${id}/`);
    const obj = getVehiclesId(data);
    console.log(data);
    const planet = await getPlanetName(data);
    console.log(planet);
    // Getting the homeworld name from the URL
    if (planet) {
      data.homeworld = planet;
    }
    console.log(data.homeworld);
    // Getting the vehicles data from the URLs
    if (obj.vehicles.length != 0) {
      data.vehiclesData = await Promise.all(
        obj.vehicles.map(async (vehicleId) => await getVehicleById(vehicleId))
      );
    }
    // Getting the starship data from the URLs
    if (obj.starships.length != 0) {
      data.starshipsData = await Promise.all(
        obj.starships.map(
          async (starshipId) => await getStarshipById(starshipId)
        )
      );
    }
    console.log("getPersonById data:");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw `Character with ID ${id} not found`;
  }
};

export { getPeople, getPeopleById };
