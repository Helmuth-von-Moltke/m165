# A Rechte und Rollen

![](1_authsoure.JPG)

Authsource mit einer anderen DB funktioniert nicht.

![](1_authsoureDB.JPG)

(Benutzte DB)

### Benutzer erstellen:
![](2_createuser1.JPG)
![](2_createuser2.JPG)

### Benutzer 1 (obama)
![](3_connectionString1.JPG)
![](3_user1overview.JPG)

#### Operationen: 
![](3_insert.JPG)
![](3.querry.JPG)

### Benutzer 2 (bush)
![](4_connectionString2.JPG)
![](4_user2overview.JPG)

#### Operationen:
![](4_insert.JPG)
![](4_querry.JPG)

# B Backup und Restore

## SNAPSHOT

#### snapshot erstellen
![](5_snapshot.JPG)

#### drop collection
![](5_dropcollection.JPG)
![](5_dropconfirmation.JPG)

#### volume erstellen und attach
![](5_volumecreated.JPG)
![](5_volume.JPG)
![](5_volumeattached.JPG)

#### daten zurueck
![](5_shipsback.JPG)

## MONGODUMP

#### Dump erstellen
![](6_createddump.JPG)

#### DB loeschen
![](6_deleteddb.JPG)

#### mongorestore
![](6_restoredb.JPG)

#### DB zurueck
![](6_restoreddb.JPG)

# Skalierung

### replication
```
Daten zu anderen DBs kopieren.
Wenn Hauptdatenbank absturzt, haben sekundaere DBs immer noch Daten.
Secundaere DBs koennen auch gelesen werden
Ist wie ein aktives Backup.
```
![](7_replication.JPG)

### sharding
```
Daten auf verschiedene Servers geteilt speichern.
Man kann einfach mehr Kapazitaet bekommen indem man mehr Servers einsetzt.
Queries werden schneller parallel bearbeitet.
```
![](7_datasharding.png)
