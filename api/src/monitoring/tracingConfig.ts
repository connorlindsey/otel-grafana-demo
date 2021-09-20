import { TraceIdRatioBasedSampler } from "@opentelemetry/core"
import { JaegerExporter } from "@opentelemetry/exporter-jaeger"
import { NodeTracerProvider } from "@opentelemetry/node"
import { Resource } from "@opentelemetry/resources"
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions"
import { BatchSpanProcessor } from "@opentelemetry/tracing"

/**
 * Fastify plugin: https://github.com/autotelic/fastify-opentelemetry
 */

// Configure a tracer provider.
const provider = new NodeTracerProvider({
  sampler: new TraceIdRatioBasedSampler(1),
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "api",
  }),
})

// Add a span exporter.
provider.addSpanProcessor(
  new BatchSpanProcessor(
    new JaegerExporter({
      tags: [{ key: "tag", value: "value" }],
      host: "jaeger",
      port: 6832,
    }),
  ),
)

// Register a global tracer provider.
provider.register()
