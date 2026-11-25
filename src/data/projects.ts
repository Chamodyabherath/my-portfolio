import type { Project } from "@/types";

export const projects: readonly Project[] = [
  {
    slug: "enterprise-business-systems",
    title: "Enterprise Business Systems",
    category: "Professional engineering",
    status: "Anonymized case study",
    kind: "enterprise",
    overview:
      "Engineering work across ERP, CRM, warehouse operations, and order management.",
    problem:
      "Warehouse and order teams need consistent records as work moves between application screens, integrations, and operational handoffs.",
    contribution:
      "Developed and maintained workflows, integrated REST services, worked on relational schemas and migrations, and troubleshot production issues across application layers.",
    technologies: ["Laravel", "PHP", "MySQL", "REST APIs"],
    diagram: {
      title: "Operational workflow",
      steps: [
        { title: "Orders", detail: "State & permissions" },
        { title: "Inventory", detail: "Records & stock rules" },
        { title: "Fulfillment", detail: "Warehouse handoffs" },
      ],
      caption:
        "Conceptual workflow. This diagram illustrates the business domains at a high level.",
    },
    sections: [
      {
        title: "Architecture overview",
        text: "A conceptual view of the work includes operational interfaces, application logic behind REST integrations, and relational data. Tenant context and role permissions shape how each layer handles records.",
      },
      {
        title: "Key workflows",
        text: "The work covers order and warehouse workflows, service integrations, and business configuration. These areas meet at handoffs where a change to an order can affect what an operator needs to do next.",
      },
      {
        title: "Technical challenges",
        text: "Operational issues can surface away from their cause. Investigation spans the visible UI state, API responses, and related database records.",
      },
      {
        title: "Engineering decisions",
        text: "Use role-based access and tenant-aware features where workflows depend on organizational context. Model relationships explicitly and inspect queries that serve operational screens.",
      },
      {
        title: "Testing and validation",
        text: "Approved validation scenarios and results are pending.",
        pending: true,
      },
      {
        title: "Outcomes and lessons",
        text: "The work reinforced the need to trace state across application boundaries and review data relationships alongside the visible behavior of a workflow.",
      },
    ],
  },
  {
    slug: "vindixshee-web-store",
    title: "Vindixshee Web Store",
    category: "Full-stack e-commerce",
    status: "Work in progress",
    kind: "commerce",
    overview:
      "An e-commerce application with separate administration and customer experiences.",
    problem:
      "Store operators need to maintain a product catalog while customers need a clear path from discovery to purchase.",
    contribution:
      "Developing administrator and customer login, catalog management, and responsive shopping interfaces.",
    technologies: ["Authentication", "Product catalog", "Responsive UI"],
    diagram: {
      title: "Store workflow",
      steps: [
        { title: "Manage", detail: "Administrator access" },
        { title: "Discover", detail: "Customer browsing" },
        { title: "Purchase", detail: "Checkout scope" },
      ],
      caption:
        "Conceptual store flow. Checkout and card payment implementation status is pending confirmation.",
    },
    sections: [
      {
        title: "Architecture overview",
        text: "The project has two functional areas, a management interface and a customer storefront, with the product catalog connecting both.",
      },
      {
        title: "Key workflows",
        text: "The project describes separate logins, adding and deleting catalog entries, and customer product browsing. Purchase and card payment are part of the project scope.",
      },
      {
        title: "Technical challenges",
        text: "The two audiences need different interfaces while working from the same product information.",
      },
      {
        title: "Engineering decisions",
        text: "The administrator and customer experiences are organized around their respective tasks. The storefront emphasizes responsive browsing.",
      },
      {
        title: "Testing and validation",
        text: "A completed checkout flow, gateway integration, and test results are pending confirmation.",
        pending: true,
      },
      {
        title: "Outcomes and lessons",
        text: "Development is ongoing. Release information and a verified project link are pending.",
        pending: true,
      },
    ],
  },
  {
    slug: "ai-news-web-application",
    title: "AI News Web Application",
    category: "React & voice interaction",
    status: "2023 project",
    kind: "voice",
    overview:
      "A React news interface that supports hands-free interactions through Alan AI.",
    problem:
      "Typical news browsing relies on manual input. This project explored how voice interaction could support news discovery.",
    contribution:
      "Built the React interface and mapped Alan AI commands to headline updates, article highlighting, and opening an article by number.",
    technologies: ["React", "JavaScript", "Alan AI API"],
    diagram: {
      title: "Voice interaction",
      steps: [
        { title: "Speak", detail: "Voice command" },
        { title: "Interpret", detail: "Alan AI integration" },
        { title: "Read", detail: "React news interface" },
      ],
      caption:
        "Conceptual interaction flow. The public repository contains the original application.",
    },
    sections: [
      {
        title: "Architecture overview",
        text: "The React interface integrates with Alan AI to handle voice commands and present news content.",
      },
      {
        title: "Key workflows",
        text: "The Alan SDK passes commands into a React handler. A new headline response replaces the article list and resets the highlight. Subsequent commands advance the highlight or open a numbered article.",
      },
      {
        title: "Technical challenges",
        text: "A numbered request needs to resolve against the current set of articles. The command handler looks up the requested article and provides spoken feedback when it cannot open it.",
      },
      {
        title: "Engineering decisions",
        text: "The interface tracks the current highlight separately from the list of headlines. Visual highlighting and spoken feedback help the reader follow what a command did.",
      },
      {
        title: "Testing and validation",
        text: "Formal accessibility checks and current third-party service availability are pending confirmation.",
        pending: true,
      },
      {
        title: "Outcomes and lessons",
        text: "The build demonstrates how a voice integration can complement a React interface. The source is available for review.",
      },
    ],
    links: [
      {
        label: "View GitHub repository",
        url: "https://github.com/CA-Creation/news-ai",
      },
    ],
  },
  {
    slug: "rice-disease-research",
    title: "Rice Disease Machine Learning Research",
    category: "Academic research",
    status: "University research",
    kind: "research",
    overview:
      "Research into rice leaf disease identification and how weather and soil conditions relate to crop yield.",
    problem:
      "Leaf symptoms and growing conditions pose distinct questions for crop research: identifying disease from visible evidence and studying factors associated with yield.",
    contribution:
      "Investigated a machine learning approach through research at Rajarata University of Sri Lanka.",
    technologies: [
      "Machine learning",
      "Image classification",
      "Environmental factors",
    ],
    diagram: {
      title: "Research inputs",
      steps: [
        { title: "Leaf images", detail: "Visible symptoms" },
        { title: "Weather", detail: "Growing conditions" },
        { title: "Soil", detail: "Environmental factors" },
      ],
      caption:
        "Research scope. Input datasets, model specifications, and evaluation results are pending confirmation.",
    },
    sections: [
      {
        title: "Architecture overview",
        text: "The documented research scope includes a machine learning approach to leaf disease identification and a related investigation of weather, soil quality, and crop yield.",
      },
      {
        title: "Research workflow",
        text: "The study considers visual inputs for plant symptoms and environmental inputs for the yield question.",
      },
      {
        title: "Technical challenges",
        text: "A meaningful evaluation requires documenting the inputs, data preparation, and how the data is split for each task.",
      },
      {
        title: "Model approach",
        text: "Model architecture and preprocessing details are pending the research materials.",
        pending: true,
      },
      {
        title: "Testing and validation",
        text: "Evaluation methods and results are pending the research materials.",
        pending: true,
      },
      {
        title: "Outcomes and lessons",
        text: "Publication details and conclusions are pending confirmation.",
        pending: true,
      },
    ],
  },
];
