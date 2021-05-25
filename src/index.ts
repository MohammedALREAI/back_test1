require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer ,gql} from "apollo-server-express";
import {  resolvers } from "./graphql";
import fs from'fs'
import mongoose from'mongoose'
const typeDefs = gql`${fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}`;

const mount = async (app: Application) => {

  app.use(express.json());




const url=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });


  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB Connected!'))
  .catch(err => {
  console.log(`DB Connection Error: ${err.message}`);
  }); 

  server.applyMiddleware({ app, path: "/api" });
  app.listen(process.env.PORT,()=>{
    console.log(`[app] : http://localhost:${process.env.PORT}`)
    
  });
}
 mount(express())
