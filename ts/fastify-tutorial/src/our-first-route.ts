import { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance, options: Object) {
  if (!fastify.mongo || !fastify.mongo.db) {
    throw new Error("MongoDB is not connected");
  }
  const collection = fastify.mongo.db.collection("test_collection");

  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  fastify.get("/animals", async (request, reply) => {
    const result = await collection.find().toArray();
    if (result.length === 0) {
      throw new Error("No documents found");
    }
    return result;
  });

  fastify.get("/animals/:animal", async (request, reply) => {
    const params = request.params as { animal: string };
    const result = await collection.findOne({ animal: params.animal });
    if (!result) {
      throw new Error("Invalid value");
    }
    return result;
  });

  const animalBodyJsonSchema = {
    type: "object",
    required: ["animal"],
    properties: {
      animal: { type: "string" },
    },
  };

  const schema = {
    body: animalBodyJsonSchema,
  };

  fastify.post("/animals", { schema }, async (request, reply) => {
    // we can use the `request.body` object to get the data sent by the client
    const body = request.body as { animal: string };
    const result = await collection.insertOne({ animal: body.animal });
    return result;
  });
}

export default routes;
