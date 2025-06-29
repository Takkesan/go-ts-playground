import Fastify from "fastify";
import dbConnecter from "./our-db-connector";
import firstRoute from "./our-first-route";

const fastify = Fastify({
  logger: true,
});

fastify.register(dbConnecter);
fastify.register(firstRoute);

// サーバーを起動するための関数
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
