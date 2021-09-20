import { PrometheusExporter } from "@opentelemetry/exporter-prometheus"
import { MeterProvider } from "@opentelemetry/sdk-metrics-base"
import { FastifyReply, FastifyRequest } from "fastify"

const prometheusPort = PrometheusExporter.DEFAULT_OPTIONS.port
const prometheusEndpoint = PrometheusExporter.DEFAULT_OPTIONS.endpoint
const host = "localhost"

const exporter = new PrometheusExporter(
  {
    port: 9464,
  },
  () => {
    console.log(`prometheus scrape endpoint: http://${host}:${prometheusPort}${prometheusEndpoint}`)
  },
)

const meter = new MeterProvider({
  exporter,
  interval: 1000,
}).getMeter("api")

const requestCounter = meter.createCounter("requests", {
  description: "Count all incoming requests",
})

const boundInstruments = new Map()

export const countAllRequests = (request: FastifyRequest, reply: FastifyReply, done) => {
  if (!boundInstruments.has(request.routerPath)) {
    const labels = { route: request.routerPath }
    const boundCounter = requestCounter.bind(labels)
    boundInstruments.set(request.routerPath, boundCounter)
  }

  boundInstruments.get(request.routerPath).add(1)
  done()
}

export const transactionGauge = meter.createUpDownCounter("transactions", {
  description: "Current transaction count",
})

export const categoryGauge = meter.createUpDownCounter("categories", {
  description: "Current category count",
})

export const balanceGauge = meter.createUpDownCounter("balance", {
  description: "Current balance",
})
