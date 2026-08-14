# Jenkins Blueprint — Zero to Hero

> **Factory Analogy:** If software delivery is manufacturing, Jenkins is the **Factory Foreman**. The Pipeline is the **Conveyor Belt**, Agents are **Workers** at stations, and the Jenkinsfile is the **Instruction Manual** taped to every product.

Master Jenkins CI/CD from zero to production-grade hero. 15 chapters, 10 hands-on labs, and 1 capstone project — pure HTML/CSS/JS, no build step needed.

Live Site: `index.html` — open it, or deploy to GitHub Pages.

## Theme
- **Category:** CI/CD
- **Color:** #D24939 (Brick Red — factory brick)
- **Analogy:** Factory Assembly Line
  - Jenkins (Controller) = Foreman in the office
  - Pipeline = Conveyor Belt moving product
  - Agent/Node = Worker + Workbench
  - Executor = Worker's Hands (1 worker can do 2 things at once)
  - Jenkinsfile = Instruction Manual
  - Stage = Station on the line (Build, Test, Paint)
  - Step = Tool action at that station
  - Artifacts = Finished boxed product
  - Credentials = Locked tool cabinet

## What You Will Learn
- Declarative & Scripted Pipelines
- Jenkinsfile (Groovy) anatomy: pipeline, agent, stages, steps, post
- Agents, Labels, Docker and Kubernetes agents
- Parameters, Triggers, Webhooks, Cron
- Env vars, Credentials, Secrets with Credentials Binding
- Plugins ecosystem & Blue Ocean visualization
- Shared Libraries for DRY pipelines
- Testing, parallel execution, archiving, fingerprinting
- Security: RBAC with Matrix, folders, audit
- Multibranch & GitHub Organization folders
- Production operation: backup, scaling, monitoring, HA

## Course Structure (15 Chapters)
1. The Factory Foreman — What is Jenkins?
2. Setting Up the Factory — Install & Run Jenkins
3. Freestyle vs Pipeline — Manual Bench vs Conveyor
4. Your First Conveyor — Jenkinsfile Anatomy
5. The Instruction Language — Groovy DSL, Stages, Steps, Post
6. Workers & Workbenches — Agents, Nodes, Executors, Labels
7. Orders & Signals — Parameters, Triggers, Webhooks, Cron
8. Locked Cabinets — Env Vars, Credentials, Secrets
9. Upgrades & Glass Walls — Plugins & Blue Ocean
10. The SOP Library — Shared Libraries
11. Mobile Workers — Docker & Kubernetes Agents
12. Quality Control — Tests, Parallel, Artifacts, Fingerprints
13. Factory Security — RBAC, Folders, Credentials Scoping
14. Mass Production — Multibranch & Organization Folders
15. Running a Real Factory — Production, Scaling, Backup & Capstone

## Labs (10) + Capstone
- Lab 1: Install Jenkins with Docker (Chapter 2)
- Lab 2: Freestyle to Pipeline conversion (Chapter 3)
- Lab 3: Build-Test-Deploy Jenkinsfile (Chapter 4)
- Lab 4: Parameterized deployment with approval (Chapter 7)
- Lab 5: Secure secrets with Credentials (Chapter 8)
- Lab 6: Custom Docker agent (Chapter 11)
- Lab 7: Create & consume Shared Library (Chapter 10)
- Lab 8: Parallel tests + archive artifacts (Chapter 12)
- Lab 9: Multibranch with GitHub webhook (Chapter 14)
- Lab 10: Harden & backup production Jenkins (Chapter 13/15)
- Capstone: Full Microservice Factory — PR → Build image → Parallel tests → Security scan → Push → Staging → Manual approval → Prod, with shared lib, Docker agent, notifications.

## How to Use This Site
1. Open `index.html` locally or host on GitHub Pages.
2. Progress is saved in localStorage.
3. Each chapter ends with "Mark Complete" → updates progress bar & sidebar check.
4. Copy code blocks with one click.
5. Toggle dark/light for workshop vs office lighting.

## Pure Static Stack
- No npm, no bundler. Just HTML, CSS, vanilla JS.
- `js/chapters.js` → `window.CHAPTERS` array.
- `js/app.js` → rendering, progress, theme.
- `css/style.css` → all styling with CSS vars, accent #D24939.

Built for global learners — analogies use cars, kitchens, houses, factories, not location-specific slang.

## Deploy to GitHub Pages
- Push `/` to `main` branch, enable Pages → Source: main / root, or `/docs`.
- Or copy contents of `jenkins-blueprint-site/` to repo root.

## License
MIT — use, remix, teach.

Built by nkydigitech — part of DevOps Blueprint Series.
