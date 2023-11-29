This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


    TaskSwift

Overview
    TaskSwift is a web-based application designed to help teams and individuals organize, track, and manage tasks efficiently. It provides a user-friendly interface for creating, updating, and monitoring tasks, facilitating seamless collaboration within your team.


Directory Structure


        project-root
        │   README.md
        │   .env
        │
        └───src
            │    middleware.ts
            │
            └─────app
            │        │   layout.tsx
            │        │   globals.css
            │        │   not-found.tsx
            │        │   page.tsx
            │        │
            │        │
            │        └───api
            │        │     └───Board
            │        │      │     └───AcceptInvite
            │        │      │     │     route.ts
            │        │      │     │
            │        │      │     └───Create
            │        │      │     │     route.ts
            │        │      │     │
            │        │      │     └───Delete
            │        │      │     │     route.ts
            │        │      │     │
            │        │      │     └───Get
            │        │      │     │     route.ts
            │        │      │     │
            │        │      │     └───GetAll
            │        │      │     │     route.ts
            │        │      │     │
            │        │      │     └───RejectInvite
            │        │      │     │     route.ts
            │        │      │     │
            │        │      │     └───RemoveMember
            │        │      │     │     route.ts
            │        │      │     │
            │        │      │     └───SendInvite
            │        │      │     │     route.ts
            │        │      │     │
            │        │      │     └───Tasks
            │        │      │     │      └───Create
            │        │      │     │      │      route.ts
            │        │      │     │      │
            │        │      │     │      └───Delete
            │        │      │     │      │       route.ts
            │        │      │     │      │
            │        │      │     │      └───SubTasks
            │        │      │     │      │       └───Create
            │        │      │     │      │       │       route.ts
            │        │      │     │      │       │
            │        │      │     │      │       └───Delete
            │        │      │     │      │       │       route.st
            │        │      │     │      │       │
            │        │      │     │      │       └───Update
            │        │      │     │      │                route.ts
            │        │      │     │      └───Update
            │        │      │     │              route.ts
            │        │      │     │
            │        │      │     └───Update
            │        │      │           route.ts
            │        │      │     │
            │        │      │     └───ViewInvites
            │        │      │           route.ts
            │        │      │
            │        │      └───User
            │        │             └───ListUserById
            │        │             │        route.ts
            │        │             │
            │        │             └───ListUsers
            │        │             │        route.ts
            │        │             │
            │        │             └───login
            │        │             │        route.ts
            │        │             │
            │        │             └───logout
            │        │             │        route.ts
            │        │             │
            │        │             └───register
            │        │             │        route.ts
            │        │             │
            │        │             └───Session
            │        │             │        route.ts
            │        │             │
            │        │             └───SharedWorkspaces
            │        │             │         route.ts
            │        │             │
            │        │             └───Update
            │        │                    │
            │        │                    └───Details
            │        │                    │          route.ts
            │        │                    │
            │        │                    └───Password
            │        │                    │          route.ts
            │        │                    │
            │        │                    └───ProfilePicture
            │        │                               route.ts
            │        │
            │        └───components
            │        │       └───Auth
            │        │            │  Navbar.tsx
            │        │            │  Sidebar.tsx
            │        │            │  SolitaireRing.tsx
            │        │            │  ToastProvider.tsx
            │        │            │  ViewInvites.tsx
            │        │            │
            │        │            └───Board
            │        │            │      AddMembers.tsx
            │        │            │      InviteMembers.tsx
            │        │            │      ViewBoard.tsx
            │        │            │
            │        │            └───SubTasks
            │        │            │        AddSubTask.tsx
            │        │            │        EditSubTask.tsx
            │        │            │        ViewSubTask
            │        │            │
            │        │            └───Tasks
            │        │            │      AddTask.tsx
            │        │            │      EditTask.tsx
            │        │            │      ViewTask.tsx
            │        │            │
            │        │            └───User
            │        │            │      ChangePassword.tsx
            │        │            │      UpdateImage.tsx
            │        │            │      ViewImage.tsx
            │        │            │
            │        │            │
            │        │           Guest
            │        │               Navbar.tsx
            │        │
            │        └───Dashboard
            │        │       page.tsx
            │        │
            │        └───Login
            │        │       page.tsx
            │        │
            │        └───Profile
            │        │      └────[Id]
            │        │               page.tsx
            │        │
            │        └───Register
            │        │         page.tsx
            │        │
            │        └───ViewBoard
            │        │      └────[Id]
            │        │               page.tsx
            │        │
            │        └───ViewMembers
            │                └────[Id]
            │                        page.tsx
            │ 
            └───Database    
            │       dbConnection.ts
            │       
            │       
            │       
            │       
            └───helpers   
            │       DummyData.ts
            │       getUserData.ts
            │ 
            └───Models
                  Board.ts
                  User.ts
                  Notification.ts



project-root
│   README.md
│   index.html
│
└───src
    │   main.js
    │   styles.css
    │
    └───components
        │   component1.js
        │   component2.js

Features
    User Authentication: Secure user authentication system to protect user accounts and data.
    Task Creation: Easily create new tasks with details such as title, description, due date, 
    Task Management: View, edit, and delete tasks. Mark tasks as completed to track progress.
    User Roles: Assign different roles to users (e.g. admin, team member) with varying levels of access.
    Task Assignment: Assign tasks to specific team members and track responsibility.
    Search and Filter: Quickly find tasks using search and filter options based on various criteria.
    Notifications: Receive notifications for task assignments, due dates, and updates.
    Dashboard: Visualize task status, pending tasks, and completed tasks through an intuitive dashboard.

Technologies Used
    Frontend: Next.js, Tailwind for styling, Axios for connecting the FrontEnd to BackEnd.
    Backend: Node.js, Next.js, MongoDB for data storage.
    Authentication: JSON Web Tokens (JWT) for secure authentication.

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
