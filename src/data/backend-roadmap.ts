export interface RoadmapTopic {
  name: string;
  hint: string;
}

export interface RoadmapSection {
  title: string;
  topics: RoadmapTopic[];
}

export interface RoadmapModule {
  id: string;
  number: string;
  name: string;
  why: string;
  sections: RoadmapSection[];
}

export const backendRoadmap: RoadmapModule[] = [
  {
    id: "foundations",
    number: "01",
    name: "Foundations",
    why: "You cannot debug what you cannot name. HTTP is the language the rest of the stack speaks.",
    sections: [
      {
        title: "What is backend engineering?",
        topics: [
          {
            name: "Role of backend in modern systems",
            hint: "The UI is a view. The backend is where the product keeps its promises.",
          },
          {
            name: "Client–server model",
            hint: "One asks. One answers. Everything else is a variation of that.",
          },
          {
            name: "Monolith, microservices, serverless",
            hint: "Pick a shape for the problem you have, not the blog post you read.",
          },
        ],
      },
      {
        title: "Networking basics",
        topics: [
          {
            name: "DNS, IP, TCP vs UDP",
            hint: "Names become numbers. Packets either get a handshake or they don't.",
          },
          {
            name: "OSI and TCP/IP, at a useful height",
            hint: "Seven layers if you like textbooks. Four if you want to ship.",
          },
        ],
      },
      {
        title: "HTTP — the core of web APIs",
        topics: [
          {
            name: "Verbs: GET, POST, PUT, DELETE, PATCH",
            hint: "GET should not change the world. POST might. Remember that at 2am.",
          },
          {
            name: "Headers, body, status codes",
            hint: "The body is the story. The status is how it ended.",
          },
          {
            name: "The request–response cycle",
            hint: "In, through, out. If you cannot draw it, you cannot debug it.",
          },
          {
            name: "HTTPS, TLS, and certificates",
            hint: "Encryption is not optional. Trust is a chain, not a feeling.",
          },
        ],
      },
      {
        title: "Routing",
        topics: [
          {
            name: "Static vs dynamic routes",
            hint: "Some paths are furniture. Some are arguments.",
          },
          {
            name: "Path params and query params",
            hint: "Path says which thing. Query says how to look at it.",
          },
          {
            name: "Nested routing",
            hint: "Nest until the URL still reads like a sentence. Then stop.",
          },
        ],
      },
    ],
  },
  {
    id: "data-flow",
    number: "02",
    name: "Data Flow",
    why: "A request is a story: parse it, check it, decide, then persist. Most bugs live in the seams.",
    sections: [
      {
        title: "Serialization",
        topics: [
          {
            name: "JSON, XML, Protobuf, MessagePack",
            hint: "The envelope matters less than agreeing on one.",
          },
          {
            name: "Why and when to choose one",
            hint: "JSON until it hurts. Binary when the wire is the bottleneck.",
          },
        ],
      },
      {
        title: "Validation and transformation",
        topics: [
          {
            name: "Request validation",
            hint: "Never trust the body. Especially from your own frontend.",
          },
          {
            name: "Schema-based validation (Zod, Joi)",
            hint: "Write the shape once. Let it reject the rest.",
          },
          {
            name: "Transforming data between layers",
            hint: "The database row is not the API. Translate on purpose.",
          },
        ],
      },
      {
        title: "Request lifecycle",
        topics: [
          {
            name: "Middlewares",
            hint: "A hallway of small decisions before the handler even starts.",
          },
          {
            name: "Controllers / handlers",
            hint: "Thin. Parse, call, return. Logic does not live here.",
          },
          {
            name: "Services — the business logic layer",
            hint: "This is where the product actually decides.",
          },
        ],
      },
      {
        title: "CRUD, for real",
        topics: [
          {
            name: "Designing create, read, update, delete",
            hint: "Four verbs. Most products are just these, named nicer.",
          },
          {
            name: "Idempotency in APIs",
            hint: "Retries will happen. The question is whether they double-charge.",
          },
        ],
      },
    ],
  },
  {
    id: "api-design",
    number: "03",
    name: "API Design",
    why: "APIs are how other people — and tired-you next year — meet the product.",
    sections: [
      {
        title: "REST principles",
        topics: [
          {
            name: "Resource modeling",
            hint: "Nouns, not verbs. /users, not /getUser.",
          },
          {
            name: "URI design",
            hint: "If you cannot say the URL out loud, redesign it.",
          },
          {
            name: "Versioning strategies",
            hint: "Change is coming. Decide how clients survive it.",
          },
        ],
      },
      {
        title: "Documentation",
        topics: [
          {
            name: "OpenAPI / Swagger",
            hint: "The spec is the conversation. The code should follow.",
          },
          {
            name: "API documentation as a contract",
            hint: "If it is not written, it is not a promise.",
          },
        ],
      },
      {
        title: "Webhooks",
        topics: [
          {
            name: "Event-driven communication",
            hint: "Don't wait on the other side. Tell them something happened.",
          },
          {
            name: "Signing and verifying webhook payloads",
            hint: "Anyone can POST. Signatures prove it was you.",
          },
        ],
      },
      {
        title: "Real-time APIs",
        topics: [
          {
            name: "WebSockets",
            hint: "When request–response is too slow for the conversation.",
          },
          {
            name: "Server-Sent Events",
            hint: "One-way stream. Cheaper than a socket when you only need to push.",
          },
          {
            name: "gRPC streaming",
            hint: "When JSON over HTTP is the bottleneck, not the feature.",
          },
        ],
      },
    ],
  },
  {
    id: "persistence",
    number: "04",
    name: "Persistence",
    why: "If it forgets, it is not a backend. State is the actual job.",
    sections: [
      {
        title: "Databases",
        topics: [
          {
            name: "SQL vs NoSQL — Postgres, MongoDB",
            hint: "Relations if you have them. Documents if the shape keeps changing.",
          },
          {
            name: "Schema design and indexing",
            hint: "The query you write today is the index you needed yesterday.",
          },
          {
            name: "Transactions, ACID vs BASE",
            hint: "All or nothing, or eventually. Pick which lie you can live with.",
          },
        ],
      },
      {
        title: "Caching",
        topics: [
          {
            name: "When to cache, and when not to",
            hint: "A wrong cache is worse than no cache. Invalidation is the whole problem.",
          },
          {
            name: "Redis, Memcached",
            hint: "Memory is fast. Memory also forgets. Plan for both.",
          },
          {
            name: "Invalidation strategies",
            hint: "TTL, events, or version keys. Guessing is not a strategy.",
          },
        ],
      },
      {
        title: "Object storage",
        topics: [
          {
            name: "S3, GCS, Azure Blob",
            hint: "Files do not belong in Postgres. The blob store is the closet.",
          },
          {
            name: "Presigned URLs",
            hint: "Let the client talk to storage without handing them the keys.",
          },
        ],
      },
      {
        title: "Search",
        topics: [
          {
            name: "Full-text search",
            hint: "LIKE is not search. Search is its own problem.",
          },
          {
            name: "Elasticsearch / OpenSearch basics",
            hint: "Inverted indexes for when the database says no.",
          },
        ],
      },
    ],
  },
  {
    id: "core",
    number: "05",
    name: "Core Concerns",
    why: "Auth, logs, errors. The unglamorous work that production is actually made of.",
    sections: [
      {
        title: "Authentication and authorization",
        topics: [
          {
            name: "Sessions, JWT, OAuth2, OpenID Connect",
            hint: "Who are you, and who said so. Those are different questions.",
          },
          {
            name: "Role-based vs attribute-based access",
            hint: "Roles are simple until they aren't. Attributes scale the policy.",
          },
        ],
      },
      {
        title: "Error handling",
        topics: [
          {
            name: "Standardized error responses",
            hint: "Same shape every time. Clients should not parse your panic.",
          },
          {
            name: "Retries and exponential backoff",
            hint: "Retry the safe ones. Wait longer each time. Give up with a log.",
          },
        ],
      },
      {
        title: "Configuration",
        topics: [
          {
            name: "Environment variables",
            hint: "Config is not code. The same binary, different rooms.",
          },
          {
            name: "Secrets management",
            hint: "If it is in git, it is not a secret anymore.",
          },
        ],
      },
      {
        title: "Logging",
        topics: [
          {
            name: "Structured logging",
            hint: "JSON lines you can grep. Stories, not print statements.",
          },
          {
            name: "Log aggregation — ELK",
            hint: "One box of logs is a hobby. A cluster is how you find 1am.",
          },
        ],
      },
      {
        title: "Observability",
        topics: [
          {
            name: "Metrics, tracing, alerting",
            hint: "Know it is slow. Know which hop. Wake someone only if it matters.",
          },
          {
            name: "Prometheus, Grafana, OpenTelemetry",
            hint: "The usual kit. Learn the questions, then the dashboards.",
          },
        ],
      },
    ],
  },
  {
    id: "scaling",
    number: "06",
    name: "Scaling",
    why: "It will break at 2am. Learn how systems fail before they do it in front of users.",
    sections: [
      {
        title: "Graceful shutdown",
        topics: [
          {
            name: "Signal handling",
            hint: "SIGTERM is a polite knock. Finish the request, then leave.",
          },
          {
            name: "Connection draining",
            hint: "Stop taking new work. Let the old work walk out.",
          },
        ],
      },
      {
        title: "Security",
        topics: [
          {
            name: "OWASP Top 10",
            hint: "The boring list that still pays the ransom.",
          },
          {
            name: "Rate limiting and input sanitization",
            hint: "Assume the internet is hungry. Feed it slowly, and never raw.",
          },
        ],
      },
      {
        title: "Performance",
        topics: [
          {
            name: "Horizontal vs vertical scaling",
            hint: "Bigger box, or more boxes. More boxes, eventually.",
          },
          {
            name: "Load balancing",
            hint: "Spread the pain so one machine does not eat it all.",
          },
        ],
      },
      {
        title: "Concurrency",
        topics: [
          {
            name: "Threading and async I/O",
            hint: "Waiting is not working. Don't block a thread on the network.",
          },
          {
            name: "Worker pools",
            hint: "Cap the chaos. A queue of work, a known number of hands.",
          },
        ],
      },
      {
        title: "Queues and schedules",
        topics: [
          {
            name: "RabbitMQ, Kafka, Celery, BullMQ",
            hint: "Do it later, do it once, do it in order. Pick which.",
          },
        ],
      },
      {
        title: "Business logic",
        topics: [
          {
            name: "Domain-driven design, the useful parts",
            hint: "Name the business in the code. Skip the ceremony.",
          },
          {
            name: "Service decomposition",
            hint: "Split when the seams hurt, not when the org chart does.",
          },
        ],
      },
    ],
  },
  {
    id: "testing",
    number: "07",
    name: "Testing",
    why: "Tests are how you keep the promise after you close the laptop.",
    sections: [
      {
        title: "Testing",
        topics: [
          {
            name: "Unit, integration, and E2E",
            hint: "Fast and small, then together, then through the front door.",
          },
          {
            name: "Mocking and stubbing",
            hint: "Fake the edges. Don't fake the thing you are testing.",
          },
        ],
      },
      {
        title: "Code quality",
        topics: [
          {
            name: "Linters and formatters",
            hint: "Arguments you never want to have again.",
          },
          {
            name: "Static analysis",
            hint: "Catch the dumb bugs before the user does.",
          },
        ],
      },
      {
        title: "12-Factor App",
        topics: [
          {
            name: "Language-agnostic rules for apps that survive production",
            hint: "Config in the environment. Logs as streams. Processes that can die.",
          },
        ],
      },
    ],
  },
  {
    id: "advanced",
    number: "08",
    name: "Advanced",
    why: "The last mile of shipping: email that actually sends, deploys that actually roll forward.",
    sections: [
      {
        title: "Transactional email",
        topics: [
          {
            name: "SMTP basics",
            hint: "From, to, and a server that will actually talk to Gmail.",
          },
          {
            name: "SendGrid, Postmark",
            hint: "Someone else fights deliverability. You send the event.",
          },
        ],
      },
      {
        title: "DevOps for backend",
        topics: [
          {
            name: "CI/CD pipelines",
            hint: "Push, test, ship. If a human has to click, it will be forgotten.",
          },
          {
            name: "Docker",
            hint: "Same bits everywhere. The lie of 'works on my machine' ends here.",
          },
          {
            name: "Infrastructure as code — Terraform",
            hint: "The cloud as a file you can review.",
          },
        ],
      },
      {
        title: "Real-time systems",
        topics: [
          {
            name: "Event-driven architectures",
            hint: "State changes announce themselves. Listeners decide what next.",
          },
          {
            name: "Pub/Sub patterns",
            hint: "Publish once. Let whoever cares subscribe. Don't couple the rooms.",
          },
        ],
      },
    ],
  },
];

export const backendRoadmapSectionStart = backendRoadmap.reduce<number[]>(
  (starts, _module, moduleIndex) => {
    if (moduleIndex === 0) {
      starts.push(0);
      return starts;
    }

    starts.push(
      starts[moduleIndex - 1]! +
        backendRoadmap[moduleIndex - 1]!.sections.length,
    );
    return starts;
  },
  [],
);
