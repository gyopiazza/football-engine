const Realm = require("realm");

// Define your models and their properties
const TeamSchema = {
  name: "Team",
  properties: {
    name: "string",
    league: "League"
  }
};

const PlayerSchema = {
  name: "Player",
  properties: {
    name: "string",
    birthday: "date",
    teams: "Team[]"
  }
};

const LeagueSchema = {
  name: "League",
  properties: {
    name: "string"
  }
};

const DB = realm => ({
  create: (schema, data) => {
    realm.write(() => realm.create(schema, data))
  },

})

Realm.open({ schema: [TeamSchema, PlayerSchema, LeagueSchema] })
  .then(realm => {
    const db = DB(realm)
    
    const leagues = realm.objects("League")
    db.create('League', {
      ''
    })
    console.log('Leagues:', leagues)

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
