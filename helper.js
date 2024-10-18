const extractId = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2]; 
};

const getVehiclesId = (person) => {
    console.log("getVehicleId");
    const obj = {
        vehicles: [],
        starships: [],
    };
    if(person.vehicles.length != 0) {
        obj.vehicles = person.vehicles.map((url) => extractId(url));
    }
    if(person.starships.length != 0) {
        obj.starships = person.starships.map((url) => extractId(url));
    }    
    return obj;
};

export {extractId, getVehiclesId};