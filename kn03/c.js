db.docks.drop();
db.missions.drop();
db.ships.drop();

var dock1Id = new ObjectId();
var dock2Id = new ObjectId();
var mission1Id = new ObjectId();
var mission2Id = new ObjectId();
var ship1Id = new ObjectId();
var ship2Id = new ObjectId();
var ship3Id = new ObjectId();

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


print("Docks:");
printjson(db.docks.find().toArray());

print("Missions starting after 2000:");
printjson(db.missions.find({ StartDate: { $gte: new Date("2000-01-01T00:00:00Z") } }).toArray());

print("Battleships and Aircraft Carriers:");
printjson(db.ships.find({ $or: [{ Type: "Battleship" }, { Type: "Aircraft Carrier" }] }).toArray());

print("Ships with sailors named 'John Doe' and 'Jane Smith':");
printjson(db.ships.find({ "Sailors.Name": { $all: ["John Doe", "Jane Smith"] } }).toArray());

print("Ships with sailors having 'John' in their name:");
printjson(db.ships.find({ "Sailors.Name": { $regex: /John/ } }).toArray());

print("Ships with projection including _id:");
printjson(db.ships.find({}, { _id: 1, ShipName: 1, Type: 1 }).toArray());

print("Ships with projection excluding _id:");
printjson(db.ships.find({}, { _id: 0, ShipName: 1, Type: 1 }).toArray());
