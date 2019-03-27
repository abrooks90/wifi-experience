# wifi-experience
Application for gauging the user experience on wifi.
Documentation Project 12 - KSU WiFi Monitoring

Linux Server Install (Debian - latest command line only)
SSH for server
sudo apt-get install -y openssh-server openssh-client

```
FTP setup
sudo apt install vsftpd ftp
```
Update distribution - sudo apt-get dist-upgrade
sudo apt install curl

```
Working Program 
Node.js (apt-get install nodejs)
sudo curl -sL https://deb.nodesource.com/setup_11.x | bash -
sudo apt-get install -y nodejs
Socket.io (npm install socket.io)
sudo npm install socket.io
PostgreSQL Dashboard program
sudo apt update
sudo apt upgrade
sudo apt-get install postgresql
sudo systemctl start postgresql (commands)
sudo systemctl stop postgresql (commands)
sudo systemctl restart postgresql (commands)
Postgres password
su - postgres
```
```
Database
create database (wifi_experience)
create schema (wifi_experience)
create table (ID, ssid) ID is primary key that's auto generated and ssid is jsonb
```
```
Raspbian Image
  *FTP setup
  *Working Program 
    *Node.js (apt-get install nodejs)
    *Socket.io client (npm install socket.io-client)
```
```
The client needs socket.io-client.
The server needs node.js and socket.io.
```
