"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("./graphql");
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const typeDefs = apollo_server_express_1.gql `${fs_1.default.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}`;
const PORT = 9000;
const DB_USER = "user_01";
const DB_USER_PASSWORD = "tWvqux9mSDig4osq";
const DB_CLUSTER = "cluster0.4fc5x";
const NODE_ENV = "development";
const mount = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json());
    const url = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers: graphql_1.resolvers,
    });
    mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB Connected!'))
        .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });
    server.applyMiddleware({ app, path: "/api" });
    app.listen(PORT, () => {
        console.log(`[app] : http://localhost:${PORT}`);
    });
});
mount(express_1.default());
