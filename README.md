PROJECT STRUCTURE

/Kanban-Board  (root directory)
├── .gitignore
├── LICENSE
├── package.json
├── tsconfig.json
├── /Assets
│   ├── 14-00-unauthenticated-page.png
│   ├── 14-01-login-page.png
│   ├── 14-02-main-page.png
│   └── Insomnia_M14_Challenge.json
│
├── /Client
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── index.html
│   ├── /public
│   │   └── vite.svg
│   │
│   ├── /src
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── vite-env.d.ts
│   │   ├── /api
│   │   │   ├── authAPI.tsx
│   │   │   ├── ticketAPI.tsx
│   │   │   └── userAPI.tsx
│   │   │
│   │   ├── /assets
│   │   │   └── react.svg
│   │   │
│   │   ├── /components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Swimlane.tsx
│   │   │   └── TicketCard.tsx
│   │   │
│   │   ├── /interfaces
│   │   │   ├── ApiMessage.tsx
│   │   │   ├── TicketData.tsx
│   │   │   ├── UserData.tsx
│   │   │   └── UserLogin.tsx
│   │   │
│   │   ├── /pages
│   │   │   ├── Board.tsx
│   │   │   ├── CreateTicket.tsx
│   │   │   ├── EditTicket.tsx
│   │   │   ├── ErrorPage.tsx
│   │   │   └── Login.tsx
│   │   │
│   │   └── /utils
│   │       └── auth.ts
│
├── /server
│   ├── .env.EXAMPLE
│   ├── package.json
│   ├── tsconfig.json
│   ├── /db
│   │   └── schema.sql
│   │
│   ├── /src
│   │   ├── server.ts
│   │   │
│   │   ├── /controllers
│   │   │   ├── ticket-controller.ts
│   │   │   └── user-controller.ts
│   │   │
│   │   ├── /middleware
│   │   │   └── auth.ts
│   │   │
│   │   ├── /models
│   │   │   ├── index.ts
│   │   │   ├── ticket.ts
│   │   │   └── user.ts
│   │   │
│   │   ├── /routes
│   │   │   ├── auth-routes.ts
│   │   │   ├── index.ts
│   │   │   ├── /api
│   │   │   │   ├── index.ts
│   │   │   │   ├── ticket-routes.ts
│   │   │   │   └── user-routes.ts
│   │   │
│   │   ├── /seeds
│   │   │   ├── index.ts
│   │   │   ├── ticket-seeds.ts
│   │   │   └── user-seeds.ts
│   │   │
│   │   └── /types
│   │       └── /express
│   │           └── index.d.ts