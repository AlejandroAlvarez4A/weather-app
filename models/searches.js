const fs = require('fs');
const axios = require('axios');

class Searches {

    history = [];
    dbPath = './db/database.json';

    constructor () {
        this.readDB();
    }

    get historyCapitalLetter () {
        return this.history.map( city => {
            const cities = city.split(" ");
            const citiesCapital = cities.map( place => ( place[0].toUpperCase() + place.slice(1) ));
            return citiesCapital.join(" ");
        })
    }
    get paramsMapbox () {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        };
    }

    get paramsOpenWeatherMap () {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }
    
    async city ( place = '' ){
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramsMapbox
            })
            const response = await instance.get();
            return response.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1],
            }));
        } catch (error) {
            return [];
        }
    }
    async weatherPlace ( lat, lon ) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeatherMap, lat, lon }
            });

            const response = await instance.get();
            const { weather, main } = response.data;
            return {
                description: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log( error );
        }
    }

    addHistory ( place = '' ) {
        if ( this.history.includes( place.toLocaleLowerCase() )) {
            return ;
        }
        this.history = this.history.splice( 0 , 4 );
        this.history.unshift( place.toLocaleLowerCase() );
        this.saveDB();
    }

    saveDB () {
        const payload = {
            history: this.history
        }
        fs.writeFileSync( this.dbPath, JSON.stringify( payload ));
    }

    readDB () {
        if( !fs.existsSync( this.dbPath )){
            return;
        }
        const response = fs.readFileSync( this.dbPath , { encoding: 'utf-8'} );
        const data = JSON.parse( response );
        this.history = data.history;
    }
}

module.exports = Searches;