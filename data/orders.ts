export type OrderStatus = "Pending" | "In Progress" | "Completed" | "Cancelled";

export interface Order {
  id: string;
  clientName: string;
  projectType: string;
  status: OrderStatus;
  deadline: string;
  amount: number;
}

export interface OrderDetail extends Order {
  clientEmail: string;
  description: string;
  createdAt: string;
  notes: string;
}

export const orders: Order[] = [
  {
    id: "ORD-001",
    clientName: "Acme Corp",
    projectType: "Web Application",
    status: "In Progress",
    deadline: "2025-11-20",
    amount: 5500,
  },
  {
    id: "ORD-002",
    clientName: "TechStart Inc",
    projectType: "Mobile App",
    status: "Completed",
    deadline: "2025-11-15",
    amount: 8200,
  },
  {
    id: "ORD-003",
    clientName: "Digital Solutions",
    projectType: "API Development",
    status: "In Progress",
    deadline: "2025-11-25",
    amount: 3400,
  },
  {
    id: "ORD-004",
    clientName: "Global Systems",
    projectType: "Database Design",
    status: "Pending",
    deadline: "2025-11-18",
    amount: 2800,
  },
  {
    id: "ORD-005",
    clientName: "Innovation Labs",
    projectType: "E-commerce Site",
    status: "In Progress",
    deadline: "2025-12-01",
    amount: 12000,
  },
  {
    id: "ORD-006",
    clientName: "CloudTech Solutions",
    projectType: "Cloud Migration",
    status: "Pending",
    deadline: "2025-11-22",
    amount: 9500,
  },
  {
    id: "ORD-007",
    clientName: "Startup Ventures",
    projectType: "MVP Development",
    status: "In Progress",
    deadline: "2025-12-05",
    amount: 15000,
  },
  {
    id: "ORD-008",
    clientName: "Enterprise Corp",
    projectType: "System Integration",
    status: "Completed",
    deadline: "2025-11-10",
    amount: 22000,
  },
];

export const orderDetails: Record<string, OrderDetail> = {
  "ORD-001": {
    id: "ORD-001",
    clientName: "Acme Corp",
    clientEmail: "contact@acmecorp.com",
    projectType: "Web Application",
    status: "In Progress",
    deadline: "2025-11-20",
    amount: 5500,
    description:
      "Full-stack web application with user authentication, dashboard, and payment integration.",
    createdAt: "2025-11-01",
    notes: "Client requested modern UI with React and TypeScript",
  },
  "ORD-002": {
    id: "ORD-002",
    clientName: "TechStart Inc",
    clientEmail: "hello@techstart.io",
    projectType: "Mobile App",
    status: "Completed",
    deadline: "2025-11-15",
    amount: 8200,
    description:
      "Cross-platform mobile app for iOS and Android with React Native.",
    createdAt: "2025-10-20",
    notes: "Successfully delivered ahead of schedule",
  },
  "ORD-003": {
    id: "ORD-003",
    clientName: "Digital Solutions",
    clientEmail: "solutions@digital.com",
    projectType: "API Development",
    status: "In Progress",
    deadline: "2025-11-25",
    amount: 3400,
    description:
      "RESTful API development with authentication and rate limiting.",
    createdAt: "2025-11-05",
    notes: "API documentation required",
  },
  "ORD-004": {
    id: "ORD-004",
    clientName: "Global Systems",
    clientEmail: "info@globalsystems.com",
    projectType: "Database Design",
    status: "Pending",
    deadline: "2025-11-18",
    amount: 2800,
    description:
      "PostgreSQL database design and optimization for high-traffic application.",
    createdAt: "2025-11-08",
    notes: "Waiting for requirements finalization",
  },
  "ORD-005": {
    id: "ORD-005",
    clientName: "Innovation Labs",
    clientEmail: "contact@innovationlabs.io",
    projectType: "E-commerce Site",
    status: "In Progress",
    deadline: "2025-12-01",
    amount: 12000,
    description:
      "Complete e-commerce platform with shopping cart, payment gateway, and inventory management.",
    createdAt: "2025-10-25",
    notes: "Client wants Stripe integration",
  },
  "ORD-006": {
    id: "ORD-006",
    clientName: "CloudTech Solutions",
    clientEmail: "admin@cloudtech.com",
    projectType: "Cloud Migration",
    status: "Pending",
    deadline: "2025-11-22",
    amount: 9500,
    description:
      "Migrate on-premise infrastructure to AWS with Docker and Kubernetes.",
    createdAt: "2025-11-10",
    notes: "Need security audit before migration",
  },
  "ORD-007": {
    id: "ORD-007",
    clientName: "Startup Ventures",
    clientEmail: "hello@startupventures.co",
    projectType: "MVP Development",
    status: "In Progress",
    deadline: "2025-12-05",
    amount: 15000,
    description:
      "Minimum viable product for social networking platform with real-time features.",
    createdAt: "2025-10-28",
    notes: "Focus on user engagement features",
  },
  "ORD-008": {
    id: "ORD-008",
    clientName: "Enterprise Corp",
    clientEmail: "projects@enterprise.com",
    projectType: "System Integration",
    status: "Completed",
    deadline: "2025-11-10",
    amount: 22000,
    description:
      "Integration of CRM, ERP, and marketing automation systems with unified dashboard.",
    createdAt: "2025-10-15",
    notes: "Project completed successfully with bonus payment",
  },
};

export const getOrderById = (id: string): OrderDetail => {
  return (
    orderDetails[id] || {
      id,
      clientName: "Unknown Client",
      clientEmail: "N/A",
      projectType: "Unknown",
      status: "Pending" as OrderStatus,
      deadline: "N/A",
      amount: 0,
      description: "No description available",
      createdAt: "N/A",
      notes: "No notes",
    }
  );
};
