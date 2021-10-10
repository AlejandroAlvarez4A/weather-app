require('dotenv').config();

const { pause, inquirerMenu, readInput, placesSelected } = require("./helpers/inquirer");
const Searches = require("./models/searches");
const main = async () => {
    let opt 
    const searches = new Searches();
    do {
        opt = await inquirerMenu();
        switch ( opt ) {
            case 1:
                // input city
                const searchPlace = await readInput('City: ');
                // show places
                const places = await searches.city(searchPlace);
                const idSelected = await placesSelected(places);
                if ( idSelected === '0' ) continue;
                const placeSelected = places.find( idPlace => idPlace.id === idSelected);
                // save in DB
                searches.addHistory( placeSelected.name );
                // weather in that city
                const weather = await searches.weatherPlace( placeSelected.lat, placeSelected.lng );
                console.log('\nCity Information\n'.green);
                console.log('City: ', placeSelected.name)
                console.log('Lat: ', placeSelected.lat);
                console.log('Lng: ', placeSelected.lng);
                console.log('Temperature: ', weather.temp);
                console.log('Min: ', weather.min);
                console.log('Max: ', weather.max);
                console.log('Description', weather.description);
                break;
            case 2:
                searches.historyCapitalLetter.forEach( ( place, index) => {
                    const idx = `${ index + 1}.`.green;
                    console.log( `${ idx } ${ place }`)
                })
                break;
        }
        if ( opt !== 0) await pause();
    } while ( opt !== 0);
}

main(); 