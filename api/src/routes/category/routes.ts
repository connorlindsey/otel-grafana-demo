import { FastifyPluginAsync } from "fastify"
import { categoryGauge } from "../../monitoring/metricsConfig"

interface CreateCategoryInput {
  title: string
}

interface DeleteCategoryInput {
  id: number
}

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async (_, reply) => {
    try {
      const categories = await fastify.prisma.category.findMany()
      return categories
    } catch (err) {
      reply.code(400)
      return { message: err.message }
    }
  })

  fastify.post<{ Body: CreateCategoryInput }>("/", async (req, reply) => {
    try {
      const { title } = req.body
      if (!title) {
        reply.code(400)
        return { message: "Invalid request" }
      }
      await fastify.prisma.category.create({
        data: { title },
      })

      categoryGauge.add(1)

      return { message: `Success! Category ${title} created.` }
    } catch (err) {
      reply.code(400)
      return { message: (err as Error).message }
    }
  })

  fastify.delete<{ Body: DeleteCategoryInput }>("/", async (req, reply) => {
    try {
      const { id } = req.body
      if (!id) {
        reply.code(400)
        return { message: "Invalid request" }
      }

      await fastify.prisma.transaction.updateMany({
        data: {
          categoryId: null,
        },
        where: {
          categoryId: id,
        },
      })

      await fastify.prisma.category.delete({
        where: {
          id,
        },
      })

      categoryGauge.add(-1)

      return { message: `Success! Category deleted` }
    } catch (err) {
      reply.code(400)
      return { message: (err as Error).message }
    }
  })
}

export default routes
