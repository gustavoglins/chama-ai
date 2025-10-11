<p align="center">
  <img src="assets/in-dev.gif" alt="In Development GIF" width="1000"/>
</p>

<p align="center">
  <img src="/assets/chamaai-banner.png" alt="Landing Page Preview" width="800"/>
</p>

<p align="center">
  <a href="https://chamaai.cloud" target="_blank">
    <img src="/assets/open-demo-btn.png" alt="Open Live Demo" width="400"/>
  </a>
  <a href="https://docs.chamaai.cloud" target="_blank">
    <img src="/assets/open-doc-btn.png" alt="Open Documentation" width="400"/>
  </a>
</p>

## Summary

- <a href="#overview">Overview</a>
- <a href="#technologies">Technologies</a>

## Overview

Chama Aí is an innovative on-demand services platform designed to simplify the way customers find and connect reliable service providers. Built for scalability and performance, it allows for registration, service scheduling, online payments, and real-time communication, all within the Chama Aí app. With a modern UI and a focus on UX, the app offers a practical, fast, and reliable experience for all users.

## Key Features

- Customer and service provider registration (compatible with CNPJ)
- Secure online payments directly in the app, supporting multiple methods
- Real-time communication between clients and providers
- Smart recommendations and matching based on location and user preferences
- Comprehensive service tracking and history for both clients and providers
- Integrated dashboards with performance metrics for service providers
- Unified experience across web and mobile, ensuring consistency and reliability

## Repository Structure

<details>
<summary>📁 chama-ai (click to expand)</summary>
├─ 📂 apps/ <br>
│  ├─ ⚛️ frontend/      # Web UI (App & Doc) + Mobile App (iOS & Android)<br>
│  └─ ☕ backend/       # API Gateway + Service Discovery + Microsservices<br>
├─ 📂 assets/<br>
│  └─ 🖼️...             # README Images<br>
├─ 📂 infra/<br>
│  └─ 📂 kafka/         # Kafka files<br>
│  └─ 🐳 docker-compose/         # Application docker compose<br>
├─ 📄 LICENSE.md         # Chama Aí License<br>
├─ 📄 README.md         # You are here!<br>
└─ ⚙️ .github/<br>
│   └─ 🔄 workflows/    # CI/CD<br>
</details>

## Technologies

#### Frontend:

- React + NextJS
- Tailwind CSS
- Framer Motion
- Zustand

#### Backend:

- Java
- Spring Framework
  - Boot
  - Web
  - JPA
  - Security
  - Cloud (Netflix Eureka)
  - WebFlux
  - Actuator
- Kafka
- OpenFeign
- OAuth2
- MapStruct

#### Mobile:

- Swift (iOS)
- Kotlin (Android)

#### Data:

- PostgreSQL
- Redis

#### External APIs

- Resend.com (email)

## Screenshots

##### Landing Page

![Landing Page Preview](/assets/landing-page.png)

##### App home Page

![App Home Preview](/assets/app-home.png)

##### API Documentation Page

![API Documentation Preview](/assets/api-documentation.png)

##### API Reference Page

![API Reference Preview](/assets/api-reference.png)
