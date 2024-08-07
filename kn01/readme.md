```
#cloud-config
users:
  - name: ubuntu
    sudo: ALL=(ALL) NOPASSWD:ALL
    groups: users, admin
    home: /home/ubuntu
    shell: /bin/bash
    ssh_authorized_keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCPIIO8uY8oWIihDv0tCAbX6toyG1RYkaLZyfGD1L+I07K4CnwAVBSU+81vw3Yv5sN9tj2Ccve9kzEeCNMld2mDP/Tt7edkx2MCToVfVx+njqwY/XbMY9bfdRKJLhIoLavuVNLnnkSIXdtlGr3JF71hPHzBDMEo64ofPCQ8hPsGxL1u3efb12jcWcRhudKtv7Qh6cVE47Zj4xImfi6VlLqwzcKZ5oCqR/z1hLLL+/pS3eM5Qsor5wmAqNfH4+z5eE+pOkFm7a0Nkygv9jwXIqtJzFGKYDe6ciBD04pEovdvY0FTyiv2vksQOVgjtu2faG2Iv1HOG0JktCIwJ49OEgjT teacher-key
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC3yb2qz8pGm5Ck10FPJThvX19dXDpehK8aXeewdAVmS8IhScQ9bp3w64UXKceqZHqIE8xUrzxJKQ8MlgeY1IUNpmLSCwYRBVxHPjooTtKN8uEhx5A7x4JoQ13Esw0hk+hJb6SmPV8yMypVB87LQDl3Vlx18uR1KyLw4Q4I05NBHIZFLC9zSjh0sX6D9gYSBZpAR7MYmBU/V48NRPXSf2HxnLDTkUAJ8Kh5aXDzO3IAluz3NXTQxCAJC6d0trPSlBsaVZ+8ehM7PDOzc1Uz9eQGq1xBET2AN5ZoI9ByMqH2HU5Cdq2PlMI1Gi3ZZZNzS6R3nMXiT9d2pNgwbzpnqtfLNapdJ8PHXVatvENDFs5+SN+LLNK2bx2i9P7qfb5B7FMUe3ZAylC3s4v9oQz7Rdy8TzOqJHRmafhkL02HTMinzAt3EX668U2iry5tykFKXolqs35Ypy91gtlQPOwYi4CxgHx78IcZoVwgtj58cSByEhAxuGDLtYio37auB+1FwHa8DjrduR+lkTSABW/WBdnPT4tcuE/Lsle5NGaS4sdqYXhpfYfgulfJM4K0ZEAs5CvjR+DTU7KZwVsZqxNcdXyer5y9s9FpNfaMvE9+nEz59bZazzK1xARFYFfseJufapHhqAdohxxQUbPvBKCsLOz3IxYGoMetdWEM3OhNF54Wkw
ssh_pwauth: false
disable_root: false    
package_update: true 
packages:
  - unzip
  - gnupg
  - curl
write_files:
  - path: /home/ubuntu/mongodconfupdate.sh
    content: |
      sudo sed -i 's/#security:/security:\n  authorization: enabled/g' /etc/mongod.conf
  - path: /home/ubuntu/mongodbuser.txt
    content: |
      use admin;
      db.createUser(
        {
          user: "admin",
          pwd: "Rheinmetall",
          roles: [
            { role: "userAdminAnyDatabase", db: "admin" },
            { role: "readWriteAnyDatabase", db: "admin" }
          ]
        }
      );

runcmd:
  - curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor
  - echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
  - sudo apt-get update -y
  - sudo apt-get install -y mongodb-org
  - sudo sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mongod.conf
  - sudo chmod +x /home/ubuntu/mongodconfupdate.sh
  - sudo /home/ubuntu/mongodconfupdate.sh
  - sudo mongosh < /home/ubuntu/mongodbuser.txt
  - sudo systemctl restart mongod
```

![](2existingdbs.JPG)

```
Dieses Parameter spezifiziert die DB, wo die credentials zu finden sind, von dem Benutzer, womit man sich einloggen will.
```

```
1. sed: ersetzt #security: mit security: authorization: enabled
Damit stellt man sicher, dass nur authorisierte Benutzer Operationen durchfuehren koennen.
2. sed: ersetzt 127.0.0.1 mit 0.0.0.0
Damit erlaubt man eine externe Verbindung aus allen IP-Addressen.
```

![](4sed.JPG)

![](5json.JPG)

![](6compass.JPG)

```
fuer Datum muss man $date verwenden
$date ist eine Representation(?) von dates von MongoDB zu JSON.
Quelle: [stackoverflow](https://stackoverflow.com/questions/26901294/how-to-insert-date-into-mongo-from-json-file)
```

![](7mongoosh.JPG)

![](8mongooshsh.JPG)

```
1. show dbs; - Alle datenbanken anzeigen
2. show databases; - das gleiche aber lang version
3. use lam;	 - DB lam verwenden
4. show collections; - Kollektionen von lam anzeigen
5. show tables; - Tabellen von lam anzeigen
(tables = collections)
```
