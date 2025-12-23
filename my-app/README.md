## AquaSafe – IoT‑driven Water Quality Monitoring Platform

AquaSafe is a full‑stack web application for monitoring surface‑water quality using deployed IoT sensor devices.  
It combines a Node.js/Express backend, a MySQL database, and a React + Material‑UI frontend to give operators a single place to manage projects, devices, parameters, and real‑time readings.

### High‑level capabilities

- **Projects & Sites**
  - Manage monitoring projects (name, location, country, description, coordinates).
  - Visualize project locations on an interactive Leaflet map.
  - Jump from a site directly into its device dashboard.

- **IoT Device Management**
  - Deploy devices at specific coordinates via the **Device Deployment** page.
  - Configure sensing frequency and time units.
  - Attach one or more sensors (parameters + units) to each device.

- **Water Quality Parameters**
  - Define and manage water‑quality parameters (e.g., pH, DO, Temperature).
  - Configure acceptable min/max thresholds and units for each parameter.
  - View a catalog of all parameters and their descriptions.

- **Readings & Dashboard**
  - Visualize readings per device / station on the **Dashboard**.
  - Filter readings by date range with a date picker.
  - Show line and bar charts (Recharts) for sensor values against configured thresholds.
  - Display summary “Average Readings” cards that highlight whether parameters are within range.
  - Show deployed devices on a map and select a device from either the map or a dropdown.

- **Notifications**
  - Persist notifications in MySQL when parameters breach thresholds or device events occur.
  - Show **Sensor** vs **Device** notifications with a toggle.
  - Track per‑user notification read state and mark notifications as viewed.

- **User Management & Auth**
  - JWT‑based authentication with login, signup and password‑reset endpoints.
  - Role/Designation support (e.g., Local Admin) with route‑level protection for admin pages.
  - Users can be linked to projects (via the backend `WorksOn` table).

- **Frontend UX**
  - Responsive layout using Material‑UI and a custom `MainLayout` (fixed top navbar + left sidebar).
  - Modern, card‑based project grid with embedded mini‑maps.
  - Clean, centered partner logos (AsiaConnect, TEIN, NUST) in the navbar.

### Tech stack

- **Frontend**
  - React (Create React App)
  - React Router
  - Material‑UI (MUI)
  - React‑Leaflet + Leaflet (maps)
  - Recharts (graphs)

- **Backend**
  - Node.js + Express (`backend/index.js`)
  - MySQL (local dev; originally compatible with AWS RDS)
  - JWT authentication, bcrypt for password hashing

### Running the project

From the `backend` folder:

- `npm install`
- Start the API server:

```bash
node index.js
```

From the `my-app` folder:

- `npm install`
- Start the React app (the project is commonly run on port `3001` in development):

```bash
PORT=3001 npm start
```

Make sure MySQL is running and the `AquaSafe` schema has been created and seeded using the provided SQL files (`Schema.sql`, `InitialData.sql`).
