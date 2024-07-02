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
```
MATCH (m:Mission {MissionName: "Operation Desert Storm"})-[:INCLUDES]->(s:Ship) WHERE s.Type = "Battleship" RETURN s;
```
![](21_scenario1.JPG)

### Alle Sailors returnen, die auf USS Missouri sind
```
MATCH (s:Ship {ShipName: "USS Missouri"})<-[:ASSIGNED_TO]-(sailor:Sailor) RETURN sailor;
```
![](21_scenario2.JPG)

### Alle Missionen returnen, die Battleships involviert sind
```
MATCH (m:Mission)-[:INCLUDES]->(s:Ship) WHERE s.Type = "Battleship" RETURN m;
```
![](21_scenario3.JPG)

### Alle Aircraft Carriers returnen die in der Mission Enduring Freedom involviert sind
```
MATCH (m:Mission {MissionName: "Operation Enduring Freedom"})-[:INCLUDES]->(s:Ship {Type: "Aircraft Carrier"}) RETURN s;
```
![](21_scenario4.JPG)

# C Daten loeschen
### Vorher
![](3_vorher.JPG)
```
MATCH (s:Ship {ShipName: "USS Missouri"}) DELETE s;
```
### Nachher
![](3_nachher.JPG)
![](3_nachherr.JPG)
#### Das Loeschen geht nicht weil USS Missouri noch Beziehungen hat
```
MATCH (s:Ship {ShipName: "USS Missouri"}) DETACH DELETE s;
```
### Nachher
![](4_nachher.JPG)
#### USS Missouri und ihre Beziehungen wurden geloescht
![](4_nachherr.JPG)

# D Datenveraendern
#### Fall: Das Schiff USS Wisconsin wird zu einem Cruiser umgebaut
```
MATCH (s:Ship {ShipName: "USS Wisconsin"}) SET s.Type = "Cruiser";
```
![](55_1.JPG)
#### Fall: Ein Sailor wird Promoted
```
MATCH (sailor:Sailor {Name: "Jane Smith"}) SET sailor.Rank = "Captain";
```
![](55_2.JPG)
#### Fall: Ein Sailor wird zum Aircraft Carrier USS Enterprise transferiert
```
MATCH (sailor:Sailor {Name: "Jane Smith"})-[r:ASSIGNED_TO]->(old:Ship) DELETE r WITH sailor MATCH (new:Ship {ShipName: "USS Enterprise"}) CREATE (sailor)-[:ASSIGNED_TO]->(new);
```
![](55_3.JPG)
