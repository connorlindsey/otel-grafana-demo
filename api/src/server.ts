require("./monitoring/tracingConfig")
require("./monitoring/metricsConfig")
const openTelemetryPlugin = require("@autotelic/fastify-opentelemetry")

import fastify from "fastify"
import prismaPlugin from "./db/prisma"
import { routes as indexRoutes } from "./routes/index"
import categoryRoutes from "./routes/category"
import transactionRoutes from "./routes/transaction"
import overviewRoutes from "./routes/overview"
import fastifyCors from "fastify-cors"
import { countAllRequests } from "./monitoring/metricsConfig"
import moment from "moment"

const PORT = process.env.PORT || 8080

const server = fastify({
  logger: {
    level: "info",
    file: `/usr/api/data/${moment().format("YYYY-MM-DD")}.log`,
  },
})

// Hooks
server.addHook("onRequest", countAllRequests)

// Plugins
server.register(fastifyCors), { origin: [/localhost/] }
server.register(prismaPlugin)
server.register(openTelemetryPlugin, { wrapRoutes: true })

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
    console.log((err as Error).message)
    server.log.error(err)
    process.exit(1)
  }
}
start()
