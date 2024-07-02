# A Daten hinzufuegen
[script](a.txt)
![](1_created.JPG)

# B Daten abfragen
![](2_match.JPG)
### Statement zum alle Knoten und Kanten lesen
```
MATCH (n)-[r]->(m) RETURN n;
```
#### Dieses Statement sucht und returns alle patterns, die alle Verbindingen die wie (Knoten)-[Kanten]->(Knoten auf der anderen Seite) aussehen.
![](2_matchh.JPG)
### optional match
```
MATCH (n) OPTIONAL MATCH (n)-[r]->(m) RETURN n, r, m;
```
#### Dieses Statment sucht alle patterns wie (n)-[r]->(m), returns aber trotzdem alle Knoten und Kanten auch wenn solche Kanten nicht existieren.
![](2_matchhh.JPG)

## Szenarien:
### Alle Schiffe returnen, die in der Mission Desert Storm beteilligt sind
MATCH (m:Mission {MissionName: "Operation Desert Storm"})-[:INCLUDES]->(s:Ship) RETURN s;

### Alle Sailors returnen, die auf USS Missouri sind
MATCH (s:Ship {ShipName: "USS Missouri"})<-[:ASSIGNED_TO]-(sailor:Sailor) RETURN sailor;

### Alle Missionen returnen, die Battleships involviert sind
MATCH (m:Mission)-[:INCLUDES]->(s:Ship {Type: "Battleship"}) RETURN m;
