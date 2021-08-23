import { FastifyPluginAsync } from "fastify"

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async (_, reply) => {
    try {
      const transactions = await fastify.prisma.transaction.findMany()
      let income = 0,
        expenses = 0
      transactions.forEach((t) => {
        if (t.amount > 0) {
          income += t.amount
        } else {
          expenses += t.amount * -1
        }
      })
      return {
        net: income - expenses,
        income,
        expenses,
      }
    } catch (err) {
      reply.code(400)
      return { message: err.message }
    }
  })
}

export default routes
