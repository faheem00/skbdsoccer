Saskatoon Soccer League 2018
============================

Overview
--------

This is a web application for a football tournament. The application is written in Express Framework. The application displays tournament information such as points table, top goal scorers, player list, match fixture and match results.

How to build database
---------------------

A migration file will be provided in a subsequent update

How to run the script
---------------------
Build the files first <br/>
```node build```

Then start the application </br>
```node start```

Technologies used
-----------------

- **Pug** used for view
- **Redis** used for pubsub
- **VUE js** used for front end view
- **VUEX** used for store management
- **WS** used for websocket management

Directory Structure
-------------------
- ```Controller``` directory stores modules representing controllers of routes
- ```dist``` directory contains the built javascript and css files
- ```models``` directory contains ```Sequelize``` ORM models representing tables and relations of the database
- ```public``` directory contains static files served for the application
- ```routes``` directory contains routes grouped in files
- ```src``` directory contains VUE js files for the front end view
- ```views``` directory contains the view files in ```pug``` format

