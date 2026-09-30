
// ─────────────────────────────────────────────────────────────────────────────
// portfolio.ts — Enrichment Data Only
//
// This file does NOT define which projects exist.
// All projects come from GitHub automatically (see lib/github.ts).
//
// Add an entry here ONLY if you want a rich case-study page for a repo.
// The key is the exact GitHub repo name (e.g. "patient-management-system").
// Any repo without an entry still shows as a GitHub card on the projects page.
// ─────────────────────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "Sushant Raj",
  title: "Systems, Signals & Decisions",
  headline: "Turning raw signals into reliable systems.",
  subtext: "I build backend-first systems that observe imperfect real-world signals and convert them into reliable, privacy-aware decisions.",
  bio: [
    "I am a backend-first engineer who looks at software through the lens of Systems, Signals, and Decisions.",
    "Real-world data is noisy. Events are asynchronous. Networks are unreliable. My work focuses on building architectures that acknowledge these constraints rather than wishing them away.",
    "From parsing ambiguous SMS signals to architecting event-driven financial systems, I obsess over correctness, trade-offs, and the 'why' behind every engineering decision.",
    "My background in Java, Spring Boot, and machine learning allows me to bridge the gap between deterministic logic and probabilistic real-world inputs."
  ],
  socials: {
    github: "https://github.com/Sushant0999",
    linkedin: "https://www.linkedin.com/in/sushant0999",
    email: "sushantr3999@gmail.com",
    resume: "/resume.pdf",
  },
};

export type ProjectCategory = 'signal' | 'decision' | 'system' | 'trust';

export interface ProjectEnrichment {
  /** Override the display title (defaults to humanName(repo.name)) */
  title?: string;
  /** One-line elevator pitch (defaults to repo.description) */
  shortDescription?: string;
  category: ProjectCategory;
  featured: boolean;
  /** Rich case-study breakdown. Required for /projects/[id] detail page. */
  details: {
    signal: string;
    decision: string;
    system: string;
    trust: string;
    challenges: string;
  };
}

/**
 * Enrichment map keyed by GitHub repo name.
 *
 * ─── HOW TO ADD A NEW PROJECT ────────────────────────────────────────────────
 * 1. Push your code to GitHub — it will auto-appear in the GitHub grid.
 * 2. If you want a curated featured card + case-study page, add a key here.
 *    The key MUST match your exact GitHub repo name.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const ENRICHMENTS: Record<string, ProjectEnrichment> = {

  // ── Signal layer projects ──────────────────────────────────────────────────

  'image_processing_scilab': {
    title: "Image Processing Suite",
    shortDescription: "A curated collection of algorithms for analyzing and transforming raw visual signals.",
    category: "signal",
    featured: true,
    details: {
      signal: "Raw pixel matrices containing noisy visual data, requiring enhancement and feature extraction.",
      decision: "Applying mathematical kernels (Sobel, Prewitt, Gaussian) to decide edge boundaries and filter out noise.",
      system: "Modular Scilab environment designed for batch processing and algorithmic experimentation.",
      trust: "Deterministic output for morphological operations, ensuring reproducible results for scientific analysis.",
      challenges: "Optimizing matrix operations for performance while maintaining mathematical precision in filter implementation."
    }
  },

  'MapMySpend': {
    title: "MapMySpend Financial Intelligence",
    shortDescription: "An automated tracking system that correlates SMS financial alerts with geospatial contexts.",
    category: "signal",
    featured: false,
    details: {
      signal: "Unstructured SMS transaction alerts + GPS coordinates at the moment of transaction.",
      decision: "Matches cryptic merchant codes (e.g. 'UPI-Paytm-123') to real-world locations to categorize spending behavior.",
      system: "Background service using `flutter_sms_inbox` and location APIs. Uses TFLite for on-device categorization.",
      trust: "Privacy-by-design: Financial data and location history never leave the device. Analysis happens locally.",
      challenges: "Parsing thousands of varying SMS templates across different banks and extracting accurate merchant names and amounts."
    }
  },

  // ── Decision layer projects ────────────────────────────────────────────────

  'movie-recommed-system': {
    title: "Movie Recommendation Engine",
    shortDescription: "Machine Learning system that converts viewing history into personalized content decisions.",
    category: "decision",
    featured: false,
    details: {
      signal: "User ratings, viewing history, and content metadata (genres, actors, directors).",
      decision: "Predicts user preference for unseen movies using collaborative filtering and content-based logic.",
      system: "Python-based ML pipeline handling data preprocessing, model training, and inference.",
      trust: "Addresses cold-start problems to ensure recommendations remain relevant even with sparse data.",
      challenges: "Balancing exploration (new genres) vs exploitation (known preferences) in the recommendation algorithm."
    }
  },

  'auto_mailer_ai': {
    title: "AutoMailer AI",
    shortDescription: "AI-powered email automation platform using Groq API & Flutter — generates, personalizes, and sends bulk smart emails.",
    category: "decision",
    featured: true,
    details: {
      signal: "Recipient data, email intent prompts, and scheduling triggers from the user.",
      decision: "Groq LLM generates personalized email bodies per recipient based on a shared intent prompt, adapting tone and content dynamically.",
      system: "Flutter frontend + SMTP relay backend. Groq API handles generation; a scheduling queue manages delayed sends and retry logic.",
      trust: "Draft-review mode lets users inspect AI-generated content before sending. No email is dispatched without explicit confirmation.",
      challenges: "Balancing generation speed across large recipient lists while staying within Groq API rate limits using batched async calls."
    }
  },

  'google-script-sheet-automation': {
    title: "Gmail → Google Sheets Automation",
    shortDescription: "Transforms Gmail into a personal productivity assistant — emails automatically become tasks, reminders, and tracked calendar events.",
    category: "decision",
    featured: false,
    details: {
      signal: "Incoming Gmail messages with specific subjects, senders, or label patterns acting as automation triggers.",
      decision: "Extracts key metadata (sender, subject, body snippet) and routes it to the correct Sheet tab, Calendar event, or Task entry.",
      system: "Google Apps Script time-triggered polling loop reads Gmail, writes to Sheets, and calls Google Calendar & Tasks APIs — fully serverless.",
      trust: "Runs entirely within Google's ecosystem — no external server or API key exposure. Permissions are scoped to only required Gmail labels.",
      challenges: "Handling duplicate processing of emails across trigger invocations using a 'processed' label marker to ensure idempotency."
    }
  },

  // ── System layer projects ──────────────────────────────────────────────────

  'patient-management-system': {
    title: "Patient Management System",
    shortDescription: "A production-grade microservices system for healthcare data — built on Spring Boot, Kafka, gRPC, and PostgreSQL.",
    category: "system",
    featured: true,
    details: {
      signal: "HTTP REST requests for patient CRUD and appointment scheduling events from the client.",
      decision: "API Gateway validates JWTs, applies rate-limiting, and routes to correct service via gRPC contracts.",
      system: "Spring Boot microservices communicating over gRPC. Kafka decouples async events (PatientCreated, AppointmentBooked). PostgreSQL for ACID persistence.",
      trust: "ACID guarantees for healthcare data integrity. Kafka retained logs allow replaying missed events. Health checks auto-deregister crashed instances.",
      challenges: "Designing a saga pattern for appointment booking that handles partial failures across the patient and billing services without orphaned records."
    }
  },

  'microservices_example': {
    title: "Spring Cloud Microservices",
    shortDescription: "A reference implementation of Spring Cloud microservices with Eureka discovery, Feign clients, and API Gateway.",
    category: "system",
    featured: false,
    details: {
      signal: "API requests from clients to a single stable hostname, hiding the dynamic service topology.",
      decision: "Spring Cloud Gateway reverse-proxies to correct microservice using Eureka registry lookup at runtime.",
      system: "Eureka service registry, Spring Cloud Gateway, Order Service calling Inventory via Feign declarative HTTP client with Ribbon load balancing.",
      trust: "Circuit-breaker pattern prevents cascading failures. Health checks auto-deregister crashed instances within seconds.",
      challenges: "Implementing consistent distributed tracing across Feign calls so a single user request can be traced end-to-end through all services."
    }
  },

  'url_extarctor_springboot_java': {
    title: "URL Extractor Web App",
    shortDescription: "React + Spring Boot tool that fetches any webpage and extracts all embedded URLs using Java Stream API.",
    category: "system",
    featured: false,
    details: {
      signal: "A target URL submitted by the user via the React frontend.",
      decision: "Spring Boot validates input, fetches remote HTML, and uses Java Stream API pipelines to filter and normalize all embedded URLs.",
      system: "React SPA frontend + stateless Spring Boot REST API. In-memory response cache reduces p99 latency from ~800ms to under 5ms for repeat queries.",
      trust: "Type-safe input validation prevents SSRF vectors. Stateless design allows horizontal scaling behind a load balancer.",
      challenges: "Handling malformed HTML from real-world pages and deduplicating relative vs absolute URLs into a canonical normalized list."
    }
  },

  'local-tunnel': {
    title: "Local Tunnel — Self-Hosted Port Forwarder",
    shortDescription: "A self-hosted port forwarding tool in Go, enabling secure public exposure of localhost services with a local-network mode.",
    category: "system",
    featured: true,
    details: {
      signal: "Incoming TCP connection requests from external clients targeting a registered local port.",
      decision: "Routes tunnel requests to the correct local service using a registered subdomain and port mapping table.",
      system: "Go-based server with a lightweight relay protocol. Clients register ports on startup; the server multiplexes traffic over a persistent control channel.",
      trust: "No third-party cloud dependency — entire infrastructure is self-controlled. MIT licensed and fully auditable.",
      challenges: "Designing a robust keep-alive and reconnection strategy to handle flaky client connections without dropping active tunnels."
    }
  },

  'microservices-manager': {
    title: "Microservices Manager",
    shortDescription: "Spring Boot & React-powered local dev companion — organizes microservices, auto-parses config ports, streams real-time SSE logs.",
    category: "system",
    featured: true,
    details: {
      signal: "Live stdout/stderr streams from multiple locally running Spring Boot microservice processes.",
      decision: "Automatically parses application.yml/properties files to detect port assignments without manual configuration.",
      system: "Spring Boot backend manages child processes and broadcasts log events over Server-Sent Events. Vite + React frontend renders a dark-mode real-time log terminal per service.",
      trust: "Process isolation ensures one crashing service doesn't affect the manager UI. SSE reconnects automatically on connection loss.",
      challenges: "Multiplexing log streams from N independent processes into per-service SSE channels without cross-contamination or memory leaks."
    }
  },

  'local_chat': {
    title: "Local Chat — LAN Messenger",
    shortDescription: "Real-time, zero-configuration LAN chat. No internet or account required — just open and talk.",
    category: "system",
    featured: false,
    details: {
      signal: "Raw WebSocket messages containing user text, join/leave events, and typed indicators over the local network.",
      decision: "Broadcasts messages to all connected peers without a central user database, prioritizing zero-friction UX.",
      system: "Lightweight HTML/JS frontend with a minimal WebSocket server. No accounts, no cloud, no cookies.",
      trust: "Ephemeral by design — no messages are persisted to disk or transmitted outside the local network.",
      challenges: "Auto-discovery of peers on LAN segments without requiring users to manually exchange IP addresses."
    }
  },

  'journal-sheets': {
    title: "Cloud Journal (Google Sheets)",
    shortDescription: "A minimalist serverless journaling app that syncs entries directly to Google Sheets via OAuth.",
    category: "system",
    featured: true,
    details: {
      signal: "User-generated journal entries and authentication tokens from Google OAuth.",
      decision: "Validates OAuth tokens and securely routes journal payloads to a designated Google Sheet.",
      system: "React frontend integrated directly with the Google Sheets API, bypassing the need for a custom database backend.",
      trust: "Leverages Google's infrastructure for data persistence and identity management, ensuring zero data loss and secure access.",
      challenges: "Handling token expiration, stale auth states, and robust error recovery during 403 Forbidden scenarios."
    }
  },

  // ── Trust layer projects ───────────────────────────────────────────────────

  'temprature_cli_java': {
    title: "Temperature CLI Tool",
    shortDescription: "A robust command-line interface for real-time temperature monitoring and unit conversion.",
    category: "trust",
    featured: false,
    details: {
      signal: "User input streams and system-level environmental variables.",
      decision: "Validates input formats and determines appropriate conversion logic based on target units.",
      system: "Pure Java application structured for portability and ease of integration into larger shell scripts.",
      trust: "Type-safe implementation with rigorous error handling to prevent runtime crashes during invalid input.",
      challenges: "Designing a stateless interactive interface that handles user interrupts and edge cases gracefully."
    }
  },

  'LeetCode_Problems': {
    title: "LeetCode Solutions Repository",
    shortDescription: "Optimized algorithmic solutions demonstrating mastery over time and space complexity.",
    category: "trust",
    featured: false,
    details: {
      signal: "Algorithmic problem constraints (Input size N, Time limit T).",
      decision: "Choosing algorithm class (Greedy vs Dynamic Programming vs Divide & Conquer) based on constraints.",
      system: "Organized library pattern with clear complexity analysis for each solution.",
      trust: "Code proven correct against thousands of test cases including boundary conditions.",
      challenges: "Refining initial brute-force approaches into optimal solutions to pass strict execution time limits."
    }
  },

  'PrepBytes-Zenith-Placement-Program-Question-JAVA': {
    title: "Zenith Placement Prep",
    shortDescription: "A comprehensive repository of advanced Java problems organized by algorithmic pattern.",
    category: "trust",
    featured: false,
    details: {
      signal: "Complex problem statements with strict time and space complexity constraints.",
      decision: "Selecting the optimal data structure (Trees, Graphs, DP tables) to solve the problem within limits.",
      system: "Structured repository pattern organizing solutions by pattern (Sliding Window, Two Pointers, etc.).",
      trust: "Proven correctness through exhaustive test cases, focusing on edge case coverage and memory safety.",
      challenges: "Optimizing solutions from O(n²) to O(n) or O(log n) to meet execution time limits of competitive programming judges."
    }
  },

};

// ─── Legacy system flow data (used by SystemFlow component) ──────────────────

export interface FlowNode {
  id: string;
  label: string;
  sublabel?: string;
  type: 'client' | 'api' | 'service' | 'queue' | 'cache' | 'database';
  purpose: string;
  why: string;
  benefit: string;
}

export interface SystemFlowDef {
  projectId: string;
  title: string;
  subtitle: string;
  githubUrl: string;
  nodes: FlowNode[];
}

export const SYSTEM_FLOWS: SystemFlowDef[] = [
  {
    projectId: 'patient-management',
    title: 'Patient Management System',
    subtitle: 'Spring Boot · gRPC · Kafka · PostgreSQL',
    githubUrl: 'https://github.com/Sushant0999/patient-management-system',
    nodes: [
      {
        id: 'client', label: 'Client', sublabel: 'REST', type: 'client',
        purpose: 'Sends HTTP requests for patient CRUD and appointment scheduling.',
        why: 'REST provides a universal interface decoupled from the backend implementation.',
        benefit: 'Frontend can be swapped independently; clear API contract via OpenAPI.',
      },
      {
        id: 'api-gateway', label: 'API Gateway', sublabel: 'Spring Boot', type: 'api',
        purpose: 'Routes requests, validates JWTs, and applies rate-limiting.',
        why: 'Centralised auth prevents duplicating security logic across services.',
        benefit: 'Single TLS termination point reduces latency vs per-service TLS.',
      },
      {
        id: 'patient-service', label: 'Patient Svc', sublabel: 'gRPC', type: 'service',
        purpose: 'Owns patient domain: creation, retrieval, and medical history.',
        why: 'gRPC gives strongly-typed inter-service contracts and binary serialisation.',
        benefit: 'Protobuf payloads are 5x smaller than JSON, cutting internal latency.',
      },
      {
        id: 'kafka', label: 'Kafka', sublabel: 'Event bus', type: 'queue',
        purpose: 'Publishes PatientCreated and AppointmentBooked events for async consumers.',
        why: 'Decouples services; producers do not wait for slow downstream consumers.',
        benefit: 'Scales to millions of events per second; retained logs allow replaying missed events.',
      },
      {
        id: 'postgresql', label: 'PostgreSQL', sublabel: 'RDBMS', type: 'database',
        purpose: 'Persists patient records, appointments, and audit logs transactionally.',
        why: 'ACID guarantees are non-negotiable for healthcare data integrity.',
        benefit: 'Indexed foreign keys enable complex joins with sub-millisecond p99.',
      },
    ],
  },
  {
    projectId: 'microservices',
    title: 'Spring Cloud Microservices',
    subtitle: 'Eureka · Feign · Spring Cloud Gateway',
    githubUrl: 'https://github.com/Sushant0999/microservices_example',
    nodes: [
      {
        id: 'user', label: 'User', sublabel: 'Browser', type: 'client',
        purpose: 'Initiates API calls to the gateway for business operations.',
        why: 'Users interact through a single stable hostname, hiding service topology.',
        benefit: 'CORS and TLS handled once; user code never changes on scale-out.',
      },
      {
        id: 'gateway', label: 'API Gateway', sublabel: 'Spring Cloud', type: 'api',
        purpose: 'Reverse-proxies requests to the correct microservice using Eureka lookup.',
        why: 'Prevents hardcoding service IPs; handles auth, logging, and retries centrally.',
        benefit: 'Circuit-breaker pattern prevents cascading failures across services.',
      },
      {
        id: 'eureka', label: 'Eureka', sublabel: 'Discovery', type: 'service',
        purpose: 'Service registry where each microservice registers its IP and port on startup.',
        why: 'Dynamic discovery eliminates manual configuration on every deployment.',
        benefit: 'Health checks auto-deregister crashed instances within seconds.',
      },
      {
        id: 'order-service', label: 'Order Svc', sublabel: 'Feign', type: 'service',
        purpose: 'Handles order lifecycle and calls Inventory via Feign declarative HTTP client.',
        why: 'Feign turns REST calls into simple interface methods, reducing boilerplate by 80%.',
        benefit: 'Built-in load balancing across inventory instances via Ribbon.',
      },
      {
        id: 'inventory', label: 'Inventory Svc', sublabel: 'Spring Boot', type: 'database',
        purpose: 'Manages stock levels and responds to Feign calls synchronously.',
        why: 'Isolated domain lets teams deploy independently without coupling releases.',
        benefit: 'Can scale horizontally without affecting the order service deployment.',
      },
    ],
  },
  {
    projectId: 'url-extractor',
    title: 'URL Extractor Web App',
    subtitle: 'React · Spring Boot · Java Stream API',
    githubUrl: 'https://github.com/Sushant0999/url_extarctor_springboot_java',
    nodes: [
      {
        id: 'react-ui', label: 'React UI', sublabel: 'Frontend', type: 'client',
        purpose: 'Accepts a target URL from the user and renders all extracted links.',
        why: 'React component model makes real-time state updates (loading/results) trivial.',
        benefit: 'SPA avoids full page reloads; perceived latency is much lower.',
      },
      {
        id: 'rest-api', label: 'REST API', sublabel: 'Spring Boot', type: 'api',
        purpose: 'Receives the target URL, validates input, and orchestrates extraction.',
        why: 'Spring MVC declarative routing with built-in JSON serialisation.',
        benefit: 'Stateless design allows horizontal scaling behind a load balancer.',
      },
      {
        id: 'extractor', label: 'Extractor', sublabel: 'Java Streams', type: 'service',
        purpose: 'Fetches remote HTML and uses Java Stream API to parse and filter URLs.',
        why: 'Stream pipelines express filter map collect idiomatically without explicit loops.',
        benefit: 'Parallel streams process large DOM trees with zero extra threading code.',
      },
      {
        id: 'cache', label: 'Response Cache', sublabel: 'In-memory', type: 'cache',
        purpose: 'Caches results per URL to avoid re-fetching identical pages.',
        why: 'Repeated queries for popular sites should not make redundant network calls.',
        benefit: 'Cache hit reduces response time from ~800ms to under 5ms.',
      },
    ],
  },
];

export interface Skill {
  name: string;
  category: string;
}

export const SKILLS: Skill[] = [
  { name: "Java", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "C++", category: "Language" },
  { name: "SQL", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "Spring Boot", category: "Framework" },
  { name: "Next.js", category: "Framework" },
  { name: "Flutter", category: "Framework" },
  { name: "TensorFlow", category: "Framework" },
  { name: "Backend Systems", category: "Domain" },
  { name: "Machine Learning", category: "Domain" },
  { name: "Algorithms", category: "Domain" },
  { name: "System Design", category: "Domain" },
  { name: "PostgreSQL", category: "Infrastructure" },
  { name: "SQLite", category: "Infrastructure" },
  { name: "Docker", category: "Infrastructure" },
  { name: "Git", category: "Infrastructure" },
];
