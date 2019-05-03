# Capstone Project 12
Application for gauging the user experience on wifi.<br>
Project 12 - KSU WiFi Monitoring<br>

Raspberry Pi's collect wireless data using iw_list and regex. All collected data is sent to the server as a JSON object and inserted into the PostgreSQL database as JSONP.

1. Backend
   * Node.js
   * Socket.io
   * Express.js
   * PostgreSQL
2. Client
   * React.js
   * Chart.js
   * Socket.io-client
   

***
## Installation/Dependencies
### Server OS/Dependencies Installation
All dependencies and their versions can be found in the Package.json files located in the client folder and pi-client folder.
Installation instructions are located in the root of the project under "Server Setup.pdf" and "Raspberry Pi Setup.pdf"
