# JobFindHub — Full-Stack Job Search Aggregator Portal

JobFindHub is an enterprise-grade, production-ready **Three-Tier Full-Stack Application** engineered to aggregate, filter, and track job opportunities across various career platforms into a centralized database. The architecture is intentionally decoupled into isolated Presentation, Logic, and Data persistent tiers to emulate highly scalable cloud architectures used by modern software organizations.

---

## 🏗️ System Architecture Overview

The system is built using an asynchronous decoupled monolithic architecture pattern, adhering to a strict **Separation of Concerns (SoC)**.

```text
  [ PRESENATION TIER ]            [ LOGIC PROCESSING TIER ]            [ DATA PERSISTENCE TIER ]
   React + Vite + TS          ──>    Spring Boot REST API          ──>       PostgreSQL 16
(Client UI Framework Loop)         (Enterprise Core Engine)            (Persistent Storage Engine)
   Port Range: 5173                   Port Range: 8080                    Port Range: 5432
```

| Architectural Tier | Technical Stack | Primary Strategic Responsibility | Analogy |
| :--- | :--- | :--- | :--- |
| **Presentation Tier** | React 18, Vite, TypeScript, Material UI (MUI) | Serves responsive components, captures client routing requests, and renders atomic components asynchronously. | *The Digital Menu Board* |
| **Logic Processing Tier** | Java 21, Spring Boot 3.3.x, Apache Maven | Intercepts HTTP requests, enforces API data formatting constraints, runs operational workflows, and handles database mappings. | *The Restaurant Chef* |
| **Data Persistence Tier** | PostgreSQL 16, Hibernate ORM, HikariCP | Guarantees transactional ACID durability, indexes structured data entities, and serves relation loops safely. | *The Locked Cold Storage Fridge* |

---

## 🎯 Master Implementation Roadmap & Project Goals

### 🏁 Core Architecture Goals
* **True Separation of Concerns:** Develop completely autonomous UI and backend processing loops that connect exclusively via contract-based HTTP REST endpoints.
* **Type & Data Integrity Validation:** Eliminate application runtime errors by leveraging strict TypeScript typing rules on the frontend, alongside Java Jakarta structural constraints on the backend database schemas.
* **Production Security Alignment:** Enforce granular Least Privilege access by blocking default administrative database roles and applying Cross-Origin Resource Sharing (CORS) clearance lists across distinct network interfaces.

---

## 🛠️ Phase-Wise Development Breakdown

### 📦 Phase 1: Core Foundation & Full-Stack Baseline (COMPLETED ✅)
* **Virtualization Infrastructure Optimization:** Provisioned an agile Ubuntu Server development node utilizing a **Dual-Adapter Network Pattern (NAT + Host-Only)**. This separates global network downloads from local browser interface streams.
* **Relational Database Engineering:** Cleanly containerized a PostgreSQL 16 database instance. Generated a specialized user credential pipeline (`portal_user`) possessing isolated schema read-write roles to secure transactional bounds.
* **Spring Boot REST Engine Construction:** Bootstrapped a modular backend code layout structured into decoupled layers:
  * `Model`: Relates properties to persistent tables using Hibernate annotations.
  * `Repository`: Controls persistent data pipelines via default JPA automated queries.
  * `Service`: Handles processing rules and keeps operations isolated from network configurations.
  * `Controller`: Exposes secure REST endpoints with `@CrossOrigin` permissions.
* **Reactive User Interface Construction:** Created a high-speed React web template initialized by Vite. Structured custom state workflows using `useEffect` and `useState` to asynchronously pull network data strings, formatting data inside components using Material-UI elements.

### 📝 Phase 2: Web Form Management & Dynamic Content Creation (UPCOMING ⏳)
* Integrate an interactive graphical submission card module into the React interface.
* Construct secure backend POST payload endpoints supported by automated `@Valid` payload checking loops.
* Enable instant front-to-back automated updates without forcing hard browser reloads.

### 🤖 Phase 3: Distributed Automated Data Harvesters (UPCOMING ⏳)
* Design an automated multi-threaded tracking task to fetch active listings from target search networks.
* Build automated sorting models inside the service layer to eliminate duplicate entries before they hit storage.
* Include advanced search inputs to filter listings by technology keywords and geographic tags.

---

## 🔀 System Data Flow Lifecycle

```text
[Step 1] Client Accesses Browser UI (5173) ➡️ React Renders Blueprint Components
                                                      |
[Step 2] Asynchronous Network Trigger     ➡️ React dispatches non-blocking Fetch API to Port 8080
                                                      |
[Step 3] Controller Handles Routing       ➡️ JobController interceptor clears CORS security parameters
                                                      |
[Step 4] Repository Database Extraction   ➡️ Hibernate ORM maps physical table records into active Java Class Entities
                                                      |
[Step 5] Network Serialization Broadcast  ➡️ Spring Boot formats entities into clean JSON strings and responds
                                                      |
[Step 6] UI Component State Transformation➡️ React catches JSON, updates UI state arrays, and dynamically builds components
```

---

## ⚡ Key Technical Problems Solved & Engineering Wins

### 🛡️ 1. Resolving Cross-Origin Resource Sharing (CORS) Blocks
Because the user interface runs directly within a client browser pane on Port `5173` while the backend API core processes network data on Port `8080`, browsers automatically drop data packets due to structural browser security protocols. 
* **The Engineering Solution:** Rather than disabling general firewalls, I injected targeted `@CrossOrigin` configuration matrices into the REST endpoints. This grants precise, verified communication clearance exclusively to the active dev domains.

### 🔒 2. Database Least-Privilege Optimization
Connecting applications via default `postgres` administrative superuser pipelines creates critical vulnerabilities where application injection bugs could wipe out database partitions.
* **The Engineering Solution:** Configured a secure relational database schema matching strict corporate compliance. Restricted database access layers entirely behind a dedicated runtime application account (`portal_user`) bound exclusively to the target database instance.

### ⚙️ 3. Handling Case-Sensitive Compilation Corruptions
During directory setups on case-sensitive Linux filesystems, unmatched capitalization naming loops within nested directory scopes (`Model` vs `model`) will cause Spring Boot's internal `@ComponentScan` scanners to completely skip files on startup, generating `HTTP 404 - Not Found` errors.
* **The Engineering Solution:** Audited and corrected the directory structure to strict all-lowercase Java packaging layout specifications. This ensures perfect integration between the compiler paths and runtime classes.

---

## 💻 Quick Start & Deployment Guide

To spin up the system stack locally in a sandboxed execution terminal, replicate these operational paths:

### 🚀 Running the Backend API Engine
```bash
cd ~/projects/job-portal/backend
mvn clean spring-boot:run
```
*API Endpoint Route:* `http://localhost:8080/api/v1/jobs`

### 💻 Running the Frontend React UI
```bash
cd ~/projects/job-portal/frontend
npm run dev -- --host
```
*Visual Browser Interface Link:* `http://localhost:5173/`
