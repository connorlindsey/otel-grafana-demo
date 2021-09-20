export async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    return { hello: "World" }
  })

  fastify.get("/error", async (request, reply) => {
    throw new Error("Ahhhhhh 😱")
  })

  fastify.get("/sample", async (request, reply) => {
    return { message: "Success!" }
  })
}
