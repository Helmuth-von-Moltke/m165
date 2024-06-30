use US_Navy_Desert_Storm;

db.docks.drop();
db.missions.drop();
db.ships.drop();

let dock1Id = new ObjectId();
let dock2Id = new ObjectId();
let mission1Id = new ObjectId();
let mission2Id = new ObjectId();
let ship1Id = new ObjectId();
let ship2Id = new ObjectId();
let ship3Id = new ObjectId();

db.docks.insertMany([
  {
    _id: dock1Id,
    DockName: "Naval Station Norfolk",
    Location: "Norfolk, VA",
    Ships: [ship1Id, ship2Id]
  },
  {
    _id: dock2Id,
    DockName: "Pearl Harbor Naval Shipyard",
    Location: "Honolulu, HI",
    Ships: [ship3Id]
  }
]);

db.missions.insertMany([
  {
    _id: mission1Id,
    MissionName: "Operation Desert Storm",
    StartDate: new Date("1991-01-17T00:00:00Z"),
    EndDate: new Date("1991-02-28T00:00:00Z"),
    Ships: [ship1Id, ship3Id]
  },
  {
    _id: mission2Id,
    MissionName: "Operation Enduring Freedom",
    StartDate: new Date("2001-10-07T00:00:00Z"),
    EndDate: new Date("2014-12-28T00:00:00Z"),
    Ships: [ship2Id]
  }
]);

db.ships.insertOne({
  _id: ship1Id,
  ShipName: "USS Missouri",
  Type: "Battleship",
  CommissionDate: new Date("1944-06-11T00:00:00Z"),
  Sailors: [
    { SailorID: new ObjectId(), Name: "John Doe", Rank: "Captain", EnlistmentDate: new Date("1980-01-15T00:00:00Z") },
    { SailorID: new ObjectId(), Name: "Jane Smith", Rank: "Lieutenant", EnlistmentDate: new Date("1985-03-10T00:00:00Z") }
  ]
});

db.ships.insertMany([
  {
    _id: ship2Id,
    ShipName: "USS Wisconsin",
    Type: "Battleship",
    CommissionDate: new Date("1944-04-16T00:00:00Z"),
    Sailors: [
      { SailorID: new ObjectId(), Name: "Alice Johnson", Rank: "Commander", EnlistmentDate: new Date("1983-07-22T00:00:00Z") }
    ]
  },
  {
    _id: ship3Id,
    ShipName: "USS Saratoga",
    Type: "Aircraft Carrier",
    CommissionDate: new Date("1956-04-14T00:00:00Z"),
    Sailors: [
      { SailorID: new ObjectId(), Name: "Bob Brown", Rank: "Captain", EnlistmentDate: new Date("1975-06-17T00:00:00Z") }
    ]
  }
]);
