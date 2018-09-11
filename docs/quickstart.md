# Requirements
* mongodb
* nodemon

# Installation
First, simply clone the project wherever you want to create your app:
```
git clone git@github.com:codeinbrain/cyrex.git your-app
cd your-app
```
Cyrex uses mongodb as database provider so make sure you have an instance of mongodb running before starting the server.
You'll also need nodemon to run the development server.
```
npm install -g nodemon
```
Once everything is installed, run the following commands:
```
yarn install
yarn run dev
```
If no error occurred, you can go to [http://localhost:8000/graphql](http://localhost:8000/graphql).
