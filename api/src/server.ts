import fastify from "fastify"
import prismaPlugin from "./db/prisma"
import { routes as indexRoutes } from "./routes/index"
import categoryRoutes from "./routes/category"
import transactionRoutes from "./routes/transaction"
import overviewRoutes from "./routes/overview"
import fastifyCors from "fastify-cors"

const PORT = process.env.PORT || 8080

const server = fastify({
  logger: true,
})

// Plugins
server.register(fastifyCors), { origin: [/localhost/] }
server.register(prismaPlugin)

// Routes
server.register(indexRoutes)
server.register(categoryRoutes, { prefix: "/category" })
server.register(transactionRoutes, { prefix: "/transaction" })
server.register(overviewRoutes, { prefix: "/overview" })

const start = async () => {
  try {
    await server.listen(PORT, "0.0.0.0")
    console.log(`Server listening on port ${PORT}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
