import { FastifyPluginAsync } from "fastify"

interface CreateTransactionInput {
  title: string
  amount: number
  categoryId?: number
}

interface DeleteTransactionInput {
  id: number
}

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async (_, reply) => {
    try {
      const categories = await fastify.prisma.transaction.findMany()
      return categories
    } catch (err) {
      reply.code(400)
      return { message: err.message }
    }
  })

  fastify.post<{ Body: CreateTransactionInput }>("/", async (req, reply) => {
    try {
      const { title, amount, categoryId } = req.body
      if (!title || !amount) {
        reply.code(400)
        return { message: "Invalid request" }
      }
      await fastify.prisma.transaction.create({
        data: { title, amount, categoryId },
      })
      return { message: `Success! Transaction created.` }
    } catch (err) {
      reply.code(400)
      return { message: err.message }
    }
  })

  fastify.delete<{ Body: DeleteTransactionInput }>("/", async (req, reply) => {
    try {
      const { id } = req.body
      if (!id) {
        reply.code(400)
        return { message: "Invalid request" }
      }
      await fastify.prisma.transaction.delete({
        where: {
          id,
        },
      })
    } catch (err) {
      reply.code(400)
      return { message: err.message }
    }
  })
}

export default routes
