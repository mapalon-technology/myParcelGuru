# ParcelGuru

# GIT
## Clone repository
- git clone https://github.com/mapalontech/ParcelGuru.git
- git pull
- git checkout -b task/initial_design origin/remote/task/initial_design
- git diff
- if new file
  - git add filename
- commit -- local repository
  - add meaning full message over here.
- push
  - push to gihub cloud repository... central repositoyr/origin/remote
------------------------------------------------------------------------
# Dev env setup

## Folder structure
- Parcelguru
  - client
  - server
    - server.js

-------------------------------------------------------------------------

## Setup Server side
  - cd Parcelguru/server
  - npm install

## Modules used
    - express
      - http server
    - body-parser
      - request body to Js object
    - config
      - environment related stuff.


## Setup Client side
  - cd Parcelguru/client
  - npm install

## Modules used
    - angular version ~ 8


## Run UI
  - ng serve

## Run Server
  - cd Parcelguru/client
  - ng build
  - cd ../server
  - node server
  - //npm run startServer
