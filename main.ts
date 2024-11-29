import { MongoClient } from "mongodb";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { FlightModel } from "./types.ts";
import { resolvers } from "./resolvers.ts";
import { schema } from "./schema.ts";


const MONGO_URL = Deno.env.get("MONGO_URL");

if(!MONGO_URL) {
  console.error("MONGO_URL is not set");
  Deno.exit(1);
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const db = mongoClient.db("compañiaAerea");
const FlightsCollection = db.collection<FlightModel>("flights");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ FlightsCollection }),
});

console.info(`Server ready at ${url}`);