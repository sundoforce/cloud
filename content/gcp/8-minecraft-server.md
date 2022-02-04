---
title: "Minecraft server"
---

# Minecraft server
## VM 생성

![image](https://user-images.githubusercontent.com/16316626/152310620-491119e0-fe24-43ae-ac4c-0b1c6b7b79f5.png)
![image](https://user-images.githubusercontent.com/16316626/152310705-1cd559b9-2282-455b-bdc7-b4793ae499c9.png)
![image](https://user-images.githubusercontent.com/16316626/152311127-3f6f8054-6d96-4649-93e3-73b0ea9a36f9.png)

## 2: Prepare the data disk

```
sudo mkdir -p /home/minecraft
sudo mkfs.ext4 -F -E lazy_itable_init=0,\
lazy_journal_init=0,discard \
/dev/disk/by-id/google-minecraft-disk

```

### Result
```
sudo mkfs.ext4 -F -E lazy_itable_init=0,\
> lazy_journal_init=0,discard \
> /dev/disk/by-id/google-minecraft-disk
mke2fs 1.43.4 (31-Jan-2017)
Discarding device blocks: done                            
Creating filesystem with 13107200 4k blocks and 3276800 inodes
Filesystem UUID: b7c787e3-4996-4c22-a21b-2a7fc266f091
Superblock backups stored on blocks: 
        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 
        4096000, 7962624, 11239424
Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (65536 blocks): done
Writing superblocks and filesystem accounting information: done   
```

### Mount 
``` 
sudo mount -o discard,defaults /dev/disk/by-id/google-minecraft-disk /home/minecraft
```


## 3. Install and run the application
### Java 설치
```
sudo apt-get update

sudo apt-get install -y default-jre-headless

cd /home/minecraft

sudo apt-get install wget

sudo wget https://launcher.mojang.com/v1/objects/d0d0fe2b1dc6ab4c65554cb734270872b72dadd6/server.jar

```

### Initialize the Minecraft server



```
sudo apt-get update
sudo apt-get install -y default-jre-headless
cd /home/minecraft
sudo apt-get install wget
sudo wget https://launcher.mojang.com/v1/objects/d0d0fe2b1dc6ab4c65554cb734270872b72dadd6/server.jar
sudo java -Xmx1024M -Xms1024M -jar server.jar nogui
```


### 트러블슈팅
**eula.txt**
`eula=true`

## Create a virtual terminal screen to start the Minecraft server

sudo apt-get install -y screen
sudo screen -S mcs java -Xmx1024M -Xms1024M -jar server.jar nogui


## Detach from the screen and close your SSH session
sudo screen -r mcs

## Allow client traffic
### Create a firewall rule

![image](https://user-images.githubusercontent.com/16316626/152447704-4698265e-be5b-40f1-9ab9-50c3ab5754b7.png)


![image](https://user-images.githubusercontent.com/16316626/152447853-614cd71a-29e2-4834-8dc3-1206b6538508.png)

## 5: Schedule regular backups
 gsutil mb gs://$YOUR_BUCKET_NAME-minecraft-backup
  gsutil mb gs://$YOUR_BUCKET_NAME-minecraft-backup
  
**Backup.sh**

```
#!/bin/bash
screen -r mcs -X stuff '/save-all\n/save-off\n'
/usr/bin/gsutil cp -R ${BASH_SOURCE%/*}/world gs://${YOUR_BUCKET_NAME}-minecraft-backup/$(date "+%Y%m%d-%H%M%S")-world
screen -r mcs -X stuff '/save-on\n'
```

sudo chmod 755 /home/minecraft/backup.sh
. /home/minecraft/backup.sh

sudo crontab -e
```
0 */4 * * * /home/minecraft/backup.sh
```

# Server maintenance

## 정지
sudo screen -r -X stuff '/stop\n'

## Automate server maintenance with startup and shutdown scripts

![image](https://user-images.githubusercontent.com/16316626/152448645-26dc95ae-b4ca-4ac1-b3c6-fb54cfdfe9ee.png)

https://storage.googleapis.com/cloud-training/archinfra/mcserver/startup.sh

https://storage.googleapis.com/cloud-training/archinfra/mcserver/shutdown.sh



