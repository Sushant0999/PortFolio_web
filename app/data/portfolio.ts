
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

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  category: ProjectCategory;
  tags: string[];
  featured: boolean;
  link?: string;
  details: {
    signal: string;
    decision: string;
    system: string;
    trust: string;
    challenges: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: "image-processing-suite",
    title: "Image Processing Suite",
    shortDescription: "A curated collection of algorithms for analyzing and transforming raw visual signals.",
    category: "signal",
    tags: ["Scilab", "Computer Vision", "Algorithms"],
    featured: true,
    link: "https://github.com/Sushant0999/image_processing_scilab",
    details: {
      signal: "Raw pixel matrices containing noisy visual data, requiring enhancement and feature extraction.",
      decision: "Applying mathematical kernels (Sobel, Prewitt, Gaussian) to decide edge boundaries and filter out noise.",
      system: "Modular Scilab environment designed for batch processing and algorithmic experimentation.",
      trust: "Deterministic output for morphological operations, ensuring reproducible results for scientific analysis.",
      challenges: "Optimizing matrix operations for performance while maintaining mathematical precision in filter implementation."
    }
  },
  // {
  //   id: "dry-fruits-shop",
  //   title: "Dry Fruits Inventory & Billing",
  //   shortDescription: "A production-grade offline-first Flutter application for managing retail inventory and billing.",
  //   category: "system",
  //   tags: ["Flutter", "SQLite", "Riverpod", "Offline-First"],
  //   featured: true,
  //   details: {
  //     signal: "Inventory state changes and high-frequency billing transactions in unreliable network environments.",
  //     decision: "Local conflict resolution logic to handle stock deduction and sales logging without server connectivity.",
  //     system: "MVVM architecture with SQLite persistence. Synchronizes with remote backend only when stable connection is signaled.",
  //     trust: "Transactional integrity prevents data corruption during app crashes or battery failures. Automated invoice generation ensures auditability.",
  //     challenges: "Implementing a robust synchronization queue that handles partial failures and retries without duplicating financial records."
  //   }
  // },
  {
    id: "map-my-spend",
    title: "MapMySpend Financial Intelligence",
    shortDescription: "An automated tracking system that correlates SMS financial alerts with geospatial contexts.",
    category: "signal",
    tags: ["Android", "SMS Parsing", "Geo-tagging", "Privacy"],
    featured: false,
    details: {
      signal: "Unstructured SMS transaction alerts + GPS coordinates at the moment of transaction.",
      decision: "Matches cryptic merchant codes (e.g., 'UPI-Paytm-123') to real-world locations to categorize spending behavior.",
      system: "Background service using `flutter_sms_inbox` and location APIs. Uses TFLite for on-device categorization.",
      trust: "Privacy-by-design: Financial data and location history never leave the device. Analysis happens locally.",
      challenges: "Parsing thousands of varying SMS templates across different banks and extracting accurate merchant names and amounts."
    }
  },
  {
    id: "movie-recommendation-system",
    title: "Movie Recommendation Engine",
    shortDescription: "Machine Learning system that converts viewing history into personalized content decisions.",
    category: "decision",
    tags: ["Python", "Machine Learning", "Collaborative Filtering"],
    featured: false,
    link: "https://github.com/Sushant0999/movie-recommed-system",
    details: {
      signal: "User ratings, viewing history, and content metadata (genres, actors, directors).",
      decision: "Predicts user preference for unseen movies using collaborative filtering and content-based logic.",
      system: "Python-based ML pipeline handling data preprocessing, model training, and inference.",
      trust: "Addresses cold-start problems to ensure recommendations remain relevant even with sparse data.",
      challenges: "Balancing exploration (new genres) vs exploitation (known preferences) in the recommendation algorithm."
    }
  },
  {
    id: "temperature-cli",
    title: "Temperature CLI Tool",
    shortDescription: "A robust command-line interface for real-time monitoring and unit conversion.",
    category: "system",
    tags: ["Java", "CLI", "System Tool"],
    featured: false,
    link: "https://github.com/Sushant0999/temprature_cli_java",
    details: {
      signal: "User input streams and system-level environmental variables.",
      decision: "Validates input formats and determines appropriate conversion logic based on target units.",
      system: "Pure Java application structured for portability and ease of integration into larger shell scripts.",
      trust: "Type-safe implementation with rigorous error handling to prevent runtime crashes during invalid input.",
      challenges: "Designing a stateless interactive interface that handles user interrupts and edge cases gracefully."
    }
  },
  {
    id: "leetcode-solutions",
    title: "LeetCode Solutions Repository",
    shortDescription: "Optimized algorithmic solutions demonstrating mastery over time and space complexity.",
    category: "trust",
    tags: ["Java", "C++", "Competitive Programming"],
    featured: false,
    link: "https://github.com/Sushant0999/LeetCode_Problems",
    details: {
      signal: "Algorithmic problem constraints (Input size N, Time limit T).",
      decision: "Choosing algorithm class (Greedy vs Dynamic Programming vs Divide & Conquer) based on constraints.",
      system: "Organized library pattern with clear complexity analysis for each solution.",
      trust: "Code proven correct against thousands of test cases including boundary conditions.",
      challenges: "Refining initial brute-force approaches into optimal solutions to pass strict execution time limits."
    }
  },
  {
    id: "zenith-dsa",
    title: "Zenith Placement Prep",
    shortDescription: "A comprehensive repository of advanced Java problems and solutions.",
    category: "trust",
    tags: ["Java", "Data Structures", "Algorithms"],
    featured: false,
    link: "https://github.com/Sushant0999/PrepBytes-Zenith-Placement-Program-Question-JAVA",
    details: {
      signal: "Complex problem statements with strict time and space complexity constraints.",
      decision: "Selecting the optimal data structure (Trees, Graphs, DP tables) to solve the problem within limits.",
      system: "Structured repository pattern organizing solutions by pattern (Sliding Window, Two Pointers, etc.).",
      trust: "Proven correctness through exhaustive test cases, focusing on edge case coverage and memory safety.",
      challenges: "Optimizing solutions from O(n²) to O(n) or O(log n) to meet execution time limits of competitive programming judges."
    }
  },
  {
    id: "journal-sheets",
    title: "Cloud Journal (Google Sheets)",
    shortDescription: "A minimalist, completely serverless journaling application that synchronizes entries directly to Google Sheets for ubiquitous access.",
    category: "system",
    tags: ["React", "Google Sheets API", "OAuth"],
    featured: true,
    link: "https://journal-seven-pink.vercel.app",
    details: {
      signal: "User-generated journal entries and authentication tokens from Google OAuth.",
      decision: "Validates OAuth tokens and securely routes journal payloads to a designated Google Sheet.",
      system: "React frontend integrated directly with the Google Sheets API, bypassing the need for a custom database backend.",
      trust: "Leverages Google's infrastructure for data persistence and identity management, ensuring zero data loss and secure access.",
      challenges: "Handling token expiration, stale auth states, and robust error recovery during 403 Forbidden scenarios."
    }
  }
];

export interface Skill {
  name: string;
  category: string;
}

export const SKILLS: Skill[] = [
  // Languages
  { name: "Java", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "C++", category: "Language" },
  { name: "SQL", category: "Language" },
  { name: "TypeScript", category: "Language" },
  // Frameworks & Tools
  { name: "Spring Boot", category: "Framework" },
  { name: "Next.js", category: "Framework" },
  { name: "Flutter", category: "Framework" },
  { name: "TensorFlow", category: "Framework" },
  // Domains
  { name: "Backend Systems", category: "Domain" },
  { name: "Machine Learning", category: "Domain" },
  { name: "Algorithms", category: "Domain" },
  { name: "System Design", category: "Domain" },
  // Infrastructure
  { name: "PostgreSQL", category: "Infrastructure" },
  { name: "SQLite", category: "Infrastructure" },
  { name: "Docker", category: "Infrastructure" },
  { name: "Git", category: "Infrastructure" },
];

// ─── System Flow Definitions ──────────────────────────────────────────────────

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
        id: 'client',
        label: 'Client',
        sublabel: 'REST',
        type: 'client',
        purpose: 'Sends HTTP requests for patient CRUD and appointment scheduling.',
        why: 'REST provides a universal interface decoupled from the backend implementation.',
        benefit: 'Frontend can be swapped independently; clear API contract via OpenAPI.',
      },
      {
        id: 'api-gateway',
        label: 'API Gateway',
        sublabel: 'Spring Boot',
        type: 'api',
        purpose: 'Routes requests, validates JWTs, and applies rate-limiting.',
        why: 'Centralised auth prevents duplicating security logic across services.',
        benefit: 'Single TLS termination point reduces latency vs per-service TLS.',
      },
      {
        id: 'patient-service',
        label: 'Patient Svc',
        sublabel: 'gRPC',
        type: 'service',
        purpose: 'Owns patient domain: creation, retrieval, and medical history.',
        why: 'gRPC gives strongly-typed inter-service contracts and binary serialisation.',
        benefit: 'Protobuf payloads are 5x smaller than JSON, cutting internal latency.',
      },
      {
        id: 'kafka',
        label: 'Kafka',
        sublabel: 'Event bus',
        type: 'queue',
        purpose: 'Publishes PatientCreated and AppointmentBooked events for async consumers.',
        why: 'Decouples services; producers do not wait for slow downstream consumers.',
        benefit: 'Scales to millions of events per second; retained logs allow replaying missed events.',
      },
      {
        id: 'postgresql',
        label: 'PostgreSQL',
        sublabel: 'RDBMS',
        type: 'database',
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
        id: 'user',
        label: 'User',
        sublabel: 'Browser',
        type: 'client',
        purpose: 'Initiates API calls to the gateway for business operations.',
        why: 'Users interact through a single stable hostname, hiding service topology.',
        benefit: 'CORS and TLS handled once; user code never changes on scale-out.',
      },
      {
        id: 'gateway',
        label: 'API Gateway',
        sublabel: 'Spring Cloud',
        type: 'api',
        purpose: 'Reverse-proxies requests to the correct microservice using Eureka lookup.',
        why: 'Prevents hardcoding service IPs; handles auth, logging, and retries centrally.',
        benefit: 'Circuit-breaker pattern prevents cascading failures across services.',
      },
      {
        id: 'eureka',
        label: 'Eureka',
        sublabel: 'Discovery',
        type: 'service',
        purpose: 'Service registry where each microservice registers its IP and port on startup.',
        why: 'Dynamic discovery eliminates manual configuration on every deployment.',
        benefit: 'Health checks auto-deregister crashed instances within seconds.',
      },
      {
        id: 'order-service',
        label: 'Order Svc',
        sublabel: 'Feign',
        type: 'service',
        purpose: 'Handles order lifecycle and calls Inventory via Feign declarative HTTP client.',
        why: 'Feign turns REST calls into simple interface methods, reducing boilerplate by 80%.',
        benefit: 'Built-in load balancing across inventory instances via Ribbon.',
      },
      {
        id: 'inventory',
        label: 'Inventory Svc',
        sublabel: 'Spring Boot',
        type: 'database',
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
        id: 'react-ui',
        label: 'React UI',
        sublabel: 'Frontend',
        type: 'client',
        purpose: 'Accepts a target URL from the user and renders all extracted links.',
        why: 'React component model makes real-time state updates (loading/results) trivial.',
        benefit: 'SPA avoids full page reloads; perceived latency is much lower.',
      },
      {
        id: 'rest-api',
        label: 'REST API',
        sublabel: 'Spring Boot',
        type: 'api',
        purpose: 'Receives the target URL, validates input, and orchestrates extraction.',
        why: 'Spring MVC declarative routing with built-in JSON serialisation.',
        benefit: 'Stateless design allows horizontal scaling behind a load balancer.',
      },
      {
        id: 'extractor',
        label: 'Extractor',
        sublabel: 'Java Streams',
        type: 'service',
        purpose: 'Fetches remote HTML and uses Java Stream API to parse and filter URLs.',
        why: 'Stream pipelines express filter map collect idiomatically without explicit loops.',
        benefit: 'Parallel streams process large DOM trees with zero extra threading code.',
      },
      {
        id: 'cache',
        label: 'Response Cache',
        sublabel: 'In-memory',
        type: 'cache',
        purpose: 'Caches results per URL to avoid re-fetching identical pages.',
        why: 'Repeated queries for popular sites should not make redundant network calls.',
        benefit: 'Cache hit reduces response time from ~800ms to under 5ms.',
      },
    ],
  },
];
