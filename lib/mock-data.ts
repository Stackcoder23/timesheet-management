import type { User, TimesheetEntry } from "./types";

export const users: User[] = [
  {
    id: "1",
    email: "user@gmail.com",
    name: "Test User",
    password: "password123",
  },
];

export let timesheetEntries: TimesheetEntry[] = [
  {
    id: "1",
    week: "1",
    date: "1 - 5 January, 2024",
    timesheetData: [
      {
        date: "Jan 01",
        data: [
          {
            projectName: "Project Alpha",
            time: 4,
            type: "Development",
            description: "Implemented product listing component",
          },
          {
            projectName: "Project Beta",
            time: 4,
            type: "Development",
            description: "API development for user authentication",
          },
        ],
      },
      {
        date: "Jan 02",
        data: [
          {
            projectName: "Project Alpha",
            time: 6,
            type: "Development",
            description: "Shopping cart functionality",
          },
          {
            projectName: "Project Gamma",
            time: 2,
            type: "Testing",
            description: "Unit testing for payment module",
          },
        ],
      },
      {
        date: "Jan 03",
        data: [
          {
            projectName: "Project Beta",
            time: 5,
            type: "Development",
            description: "Database optimization",
          },
          {
            projectName: "Project Alpha",
            time: 3,
            type: "Code Review",
            description: "Checkout page redesign",
          },
        ],
      },
      {
        date: "Jan 04",
        data: [
          {
            projectName: "Project Gamma",
            time: 7,
            type: "Development",
            description: "Dashboard implementation",
          },
          {
            projectName: "Project Beta",
            time: 1,
            type: "Documentation",
            description: "API documentation update",
          },
        ],
      },
      {
        date: "Jan 05",
        data: [
          {
            projectName: "Project Alpha",
            time: 4,
            type: "Testing",
            description: "Integration testing",
          },
          {
            projectName: "Project Beta",
            time: 4,
            type: "Bug fixes",
            description: "Fixed login issues",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    week: "2",
    date: "8 - 12 January, 2024",
    timesheetData: [
      {
        date: "Jan 08",
        data: [
          {
            projectName: "Project Gamma",
            time: 6,
            type: "Development",
            description: "Customer dashboard",
          },
          {
            projectName: "Project Beta",
            time: 2,
            type: "Code Review",
            description: "Wireframe creation",
          },
        ],
      },
      {
        date: "Jan 09",
        data: [
          {
            projectName: "Project Gamma",
            time: 5,
            type: "Development",
            description: "Customer data API",
          },
          {
            projectName: "Project Alpha",
            time: 3,
            type: "Development",
            description: "Profile screen updates",
          },
        ],
      },
      {
        date: "Jan 10",
        data: [
          {
            projectName: "Project Beta",
            time: 4,
            type: "Development",
            description: "Landing page development",
          },
          {
            projectName: "Project Gamma",
            time: 2,
            type: "Testing",
            description: "Performance testing",
          },
        ],
      },
      {
        date: "Jan 11",
        data: [
          {
            projectName: "Project Alpha",
            time: 6,
            type: "Development",
            description: "Email integration",
          },
        ],
      },
      {
        date: "Jan 12",
        data: [
          {
            projectName: "Project Beta",
            time: 4,
            type: "Development",
            description: "Responsive design fixes",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    week: "3",
    date: "15 - 19 January, 2024",
    timesheetData: [
      {
        date: "Jan 15",
        data: [
          {
            projectName: "Project Gamma",
            time: 8,
            type: "Development",
            description: "Chart implementation with D3.js",
          },
        ],
      },
      {
        date: "Jan 16",
        data: [
          {
            projectName: "Project Gamma",
            time: 6,
            type: "Development",
            description: "Data aggregation service",
          },
          {
            projectName: "Project Beta",
            time: 2,
            type: "Code Review",
            description: "Reviewed pull requests",
          },
        ],
      },
      {
        date: "Jan 17",
        data: [
          {
            projectName: "Project Alpha",
            time: 5,
            type: "Bug fixes",
            description: "Payment gateway issues",
          },
          {
            projectName: "Project Gamma",
            time: 3,
            type: "Testing",
            description: "User acceptance testing",
          },
        ],
      },
      {
        date: "Jan 18",
        data: [
          {
            projectName: "Project Gamma",
            time: 7,
            type: "Development",
            description: "Reporting system enhancement",
          },
          {
            projectName: "Project Beta",
            time: 1,
            type: "Documentation",
            description: "Updated README",
          },
        ],
      },
      {
        date: "Jan 19",
        data: [
          {
            projectName: "Project Alpha",
            time: 4,
            type: "Development",
            description: "User interface polishing",
          },
          {
            projectName: "Project Beta",
            time: 4,
            type: "Development",
            description: "Database query optimization",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    week: "4",
    date: "22 - 26 January, 2024",
    timesheetData: [
      {
        date: "Jan 22",
        data: [
          {
            projectName: "Project Gamma",
            time: 3,
            type: "Development",
            description: "Product management interface",
          },
          {
            projectName: "Project Alpha",
            time: 2,
            type: "Bug fixes",
            description: "Contact form validation",
          },
        ],
      },
      {
        date: "Jan 23",
        data: [
          {
            projectName: "Project Gamma",
            time: 6,
            type: "Development",
            description: "Stock tracking API",
          },
          {
            projectName: "Project Beta",
            time: 2,
            type: "Code Review",
            description: "Color scheme updates",
          },
        ],
      },
      {
        date: "Jan 24",
        data: [
          {
            projectName: "Project Alpha",
            time: 4,
            type: "Development",
            description: "Settings screen implementation",
          },
          {
            projectName: "Project Gamma",
            time: 1,
            type: "Code Review",
            description: "Reviewed team submissions",
          },
        ],
      },
      {
        date: "Jan 25",
        data: [
          {
            projectName: "Project Gamma",
            time: 5,
            type: "Testing",
            description: "End-to-end testing",
          },
        ],
      },
      {
        date: "Jan 26",
        data: [
          {
            projectName: "Project Alpha",
            time: 3,
            type: "Documentation",
            description: "User manual creation",
          },
          {
            projectName: "Project Beta",
            time: 2,
            type: "Development",
            description: "Footer component update",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    week: "5",
    date: "29 January - 2 February, 2024",
    timesheetData: [
      { date: "Jan 29", data: [] },
      { date: "Jan 30", data: [] },
      { date: "Jan 31", data: [] },
      { date: "Feb 01", data: [] },
      { date: "Feb 02", data: [] },
    ],
  },
  {
    id: "6",
    week: "6",
    date: "5 - 9 February, 2024",
    timesheetData: [
      {
        date: "Feb 05",
        data: [
          {
            projectName: "Project Alpha",
            time: 4,
            type: "Meeting",
            description: "Initial project planning and setup",
          },
        ],
      },
      {
        date: "Feb 06",
        data: [
          {
            projectName: "Project Beta",
            time: 6,
            type: "Development",
            description: "New feature development",
          },
        ],
      },
      {
        date: "Feb 07",
        data: [
          {
            projectName: "Project Gamma",
            time: 3,
            type: "Bug fixes",
            description: "Critical bug fixes",
          },
          {
            projectName: "Project Alpha",
            time: 2,
            type: "Meeting",
            description: "Server maintenance",
          },
        ],
      },
      {
        date: "Feb 08",
        data: [],
      },
      {
        date: "Feb 09",
        data: [],
      },
    ],
  },
];
