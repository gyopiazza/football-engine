const Realm = require("realm");
const hyperid = require('hyperid')
const uuid = hyperid(true)

// Define your models and their properties
const TeamSchema = {
  name: "Team",
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: "string",
    league: "League"
  }
};

const PlayerSchema = {
  name: "Player",
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: "string",
    teams: "Team[]"
  }
};

const LeagueSchema = {
  name: "League",
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: "string"
  }
};

const DB = realm => ({
  create: (schema, data) => {
    realm.write(() => realm.create(schema, data.id ? data : { id: uuid(), ...data }))
  },

})

Realm.open({ schema: [TeamSchema, PlayerSchema, LeagueSchema] })
  .then(realm => {
    const db = DB(realm)
    
    const leagues = realm.objects("League")
    // db.create('League', {
    //   name: 'Serie A'
    // })
    console.log('Leagues:', leagues)
    // console.log('League[0]:', leagues[0].name)
  
    const teams = realm.objects("Team")
    // db.create('Team', {
    //   name: 'Napoli',
    //   league: leagues[0]
    // })
    console.log('Teams:', teams)
  
    // const players = realm.objects("Player")
    // db.create('Player', {
    //   name: 'Alfredo Canale',
    // })
    // console.log('Players:', players)

    //     // Create Realm objects and write to local storage
    //     realm.write(() => {
    //       const myCar = realm.create("Car", {
    //         make: "Honda",
    //         model: "Civic",
    //         miles: 1000
    //       });
    //       myCar.miles += 20; // Update a property value
    //     });

    //     // Query Realm for all cars with a high mileage
    //     const cars = realm.objects("Car").filtered("miles > 1000");

    //     // Will return a Results object with our 1 car
    //     cars.length; // => 1

    //     console.log(cars);

    //     // Add another car
    //     realm.write(() => {
    //       const myCar = realm.create("Car", {
    //         make: "Ford",
    //         model: "Focus",
    //         miles: 2000
    //       });
    //     });

    //     // Query results are updated in realtime
    //     cars.length; // => 2
  })
  .catch(error => {
    console.log(error);
  });
