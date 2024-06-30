db.ships.deleteOne({ _id: ObjectId("60d5ec45f0fdbe001dbba230") });

db.docks.deleteMany({
  $or: [
    { _id: ObjectId("60d5ec45f0fdbe001dbba22f") },
    { _id: ObjectId("60d5ec45f0fdbe001dbba232") }
  ]
});
