import fp from "fastify-plugin"
import { FastifyPluginAsync } from "fastify"
import { PrismaClient } from "@prisma/client"

// TS module augmentation to declare type of server.prisma
declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (fastify, options) => {
  const prisma = new PrismaClient()
  await prisma.$connect()
  fastify.decorate("prisma", prisma)
  fastify.addHook("onClose", async (fastify) => {
    await fastify.prisma.$disconnect()
  })
})

export default prismaPlugin
