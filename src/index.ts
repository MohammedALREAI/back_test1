require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer ,gql} from "apollo-server-express";
import {  resolvers } from "./graphql";
import fs from'fs'
import mongoose from'mongoose'
const typeDefs = gql`${fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}`;


const PORT=9000
const DB_USER="user_01"
const DB_USER_PASSWORD="tWvqux9mSDig4osq"
const DB_CLUSTER="cluster0.4fc5x"
const NODE_ENV="development"


const mount = async (app: Application) => {

  app.use(express.json());




const url=`mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });


  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB Connected!'))
  .catch(err => {
  console.log(`DB Connection Error: ${err.message}`);
  }); 

  server.applyMiddleware({ app, path: "/api" });
  app.listen(PORT,()=>{
    console.log(`[app] : http://localhost:${PORT}`)
    
  });
}
 mount(express())
