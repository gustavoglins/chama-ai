<p align="center">
  <img src="/assets/in-dev-pt.gif" alt="In Development GIF" width="800"/>
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

## Tradução

- [🇺🇸 English](README.md)

## Sumário

- [Visão Geral](#visão-geral)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Estrutura do Repositório](#estrutura-do-repositório)
- [Tecnologias](#tecnologias)
- [Screenshots](#screenshots)
- [Licença](#licença)

## Visão Geral

Chama Aí é uma plataforma inovadora de serviços sob demanda, projetada para simplificar a maneira como os clientes encontram e se conectam com prestadores de serviços confiáveis. Construída para escalabilidade e desempenho, ela permite cadastro, agendamento de serviços, pagamentos online e comunicação em tempo real, tudo dentro do aplicativo Chama Aí. Com uma interface de usuário moderna e foco em UX, o aplicativo oferece uma experiência prática, rápida e confiável para todos os usuários.

## Principais Funcionalidades

- Cadastro de clientes e prestadores de serviços (compatível com CNPJ)
- Pagamentos online seguros diretamente no aplicativo, com suporte a diversos métodos
- Comunicação em tempo real entre clientes e prestadores
- Recomendações inteligentes e correspondências com base na localização e nas preferências do usuário
- Rastreamento e histórico abrangentes de serviços para clientes e prestadores
- Painéis integrados com métricas de desempenho para prestadores de serviços
- Experiência unificada na web e em dispositivos móveis, garantindo consistência e confiabilidade

## Estrutura do Repositório

<details>
<summary>📁 chama-ai (clique para expandir)</summary>
├─ 📂 apps/ <br>
│  ├─ ⚛️ frontend/      # Web UI (App & Doc) + Mobile App (iOS & Android)<br>
│  └─ ☕ backend/       # API Gateway + Service Discovery + Microsserviços<br>
├─ 📂 assets/<br>
│  └─ 🖼️...             # README imagens<br>
├─ 📂 infra/<br>
│  └─ 📂 kafka/         # Arquivos do Kafka<br>
│  └─ 🐳 docker-compose/         # Docker compose da aplicação<br>
├─ 📄 LICENSE.md         # Licença do Chama Aí<br>
├─ 📄 README.md         # Você está aqui<br>
└─ ⚙️ .github/<br>
│   └─ 🔄 workflows/    # CI/CD<br>
</details>

## Tecnologias

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

#### Dados:

- PostgreSQL
- Redis

#### APIs Externas

- Resend.com (email)

## Screenshots

<p align="center">
  <img src="/assets/landing-page.png" alt="Landing Page Preview" width="45%" style="margin-right: 5%"/>
  <img src="/assets/app-home.png" alt="App Home Preview" width="45%"/>
</p>

<p align="center">
  <img src="/assets/api-documentation.png" alt="API Documentation Preview" width="45%" style="margin-right: 5%"/>
  <img src="/assets/api-reference.png" alt="API Reference Preview" width="45%"/>
</p>

## Licença

Este projeto está licenciado sob os termos descritos no arquivo [LICENÇA](./LICENÇA.pt.md).
