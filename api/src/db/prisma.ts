import fp from "fastify-plugin"
import { FastifyPluginAsync } from "fastify"
import { PrismaClient } from "@prisma/client"
import { trace } from "@opentelemetry/api"

// TS module augmentation to declare type of server.prisma
declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const wait = (ms) => new Promise((res) => setTimeout(res, ms))

const callWithRetry = async (fn, depth = 0) => {
  try {
    console.log(`Trying to connect: ${depth}`)
    return await fn()
  } catch (e) {
    if (depth > 3) {
      throw e
    }
    await wait(2 ** depth * 10)

    return callWithRetry(fn, depth + 1)
  }
}

const setupPrisma = async (fastify, prisma) => {
  await prisma.$connect()
  console.log("Connected to prisma")

  // Trace Prisma requests
  prisma.$use(async (params, next) => {
    // Get tracer
    const tracer = trace.getTracer("api")
    const span = tracer.startSpan(`${params.model}.${params.action}`, {
      attributes: {
        operation: `${params.model}.${params.action}`,
      },
    })

    const result = await next(params)

    span.end()

    return result
  })

  // Add prisma client to fastify object
  fastify.decorate("prisma", prisma)

  // Disconnect from Prisma on fastify close
  fastify.addHook("onClose", async (fastify) => {
    await fastify.prisma.$disconnect()
  })
}

const prismaPlugin: FastifyPluginAsync = fp(async (fastify, options) => {
  const prisma = new PrismaClient()
  await callWithRetry(() => setupPrisma(fastify, prisma))
})

export default prismaPlugin
