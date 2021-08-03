import { FastifyPluginAsync } from "fastify"

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
      return { message: `Success! Category ${title} created.` }
    } catch (err) {
      reply.code(400)
      return { message: err.message }
    }
  })

  fastify.delete<{ Body: DeleteCategoryInput }>("/", async (req, reply) => {
    try {
      const { id } = req.body
      if (!id) {
        reply.code(400)
        return { message: "Invalid request" }
      }
      await fastify.prisma.category.delete({
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
