'use client';

import { useEffect } from 'react';
import SectionTitle from '@/components/typography/section-title';
import { TypographyH2 } from '@/components/typography/TypographyH2';
import { TypographyH3 } from '@/components/typography/TypographyH3';
import { TypographyP } from '@/components/typography/TypographyP';
import { TypographyList } from '@/components/typography/TypographyList';

export default function ArchitecturePage() {
  useEffect(() => {
    document.title = 'Architecture | Chama Aí Docs';
  }, []);

  return (
    <main className="flex flex-col flex-1 gap-12">
      <section>
        <SectionTitle>Architecture</SectionTitle>
        <div className="section-content space-y-8">
          <div>
            <TypographyH2>System Overview</TypographyH2>
            <TypographyP>
              Chama Aí is built on a modern microservices architecture,
              leveraging cloud-native technologies to ensure scalability,
              reliability, and performance. Our platform connects users with
              local service providers in real-time through a robust distributed
              system.
            </TypographyP>
          </div>

          <div>
            <TypographyH2>Core Components</TypographyH2>

            <div className="space-y-6 mt-4">
              <div>
                <TypographyH3>API Gateway (Spring Cloud Gateway)</TypographyH3>
                <TypographyP>
                  The single entry point for all client requests. Handles:
                </TypographyP>
                <TypographyList>
                  <li>Request routing to appropriate microservices</li>
                  <li>Load balancing and circuit breaking</li>
                  <li>Rate limiting and authentication</li>
                  <li>Cross-cutting concerns (logging, metrics)</li>
                </TypographyList>
              </div>

              <div>
                <TypographyH3>Service Discovery (Eureka)</TypographyH3>
                <TypographyP>
                  Manages service registration and discovery:
                </TypographyP>
                <TypographyList>
                  <li>Automatic service registration on startup</li>
                  <li>Health checking and instance management</li>
                  <li>
                    Dynamic service discovery for client-side load balancing
                  </li>
                </TypographyList>
              </div>

              <div>
                <TypographyH3>Microservices</TypographyH3>

                <div className="ml-4 space-y-4 mt-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">User Service</h4>
                    <TypographyP>
                      Manages user profiles, preferences, and account
                      operations. Built with Spring Boot and PostgreSQL.
                    </TypographyP>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      Authentication Service
                    </h4>
                    <TypographyP>
                      Handles OAuth2/JWT authentication, token generation, and
                      session management. Integrates with Spring Security.
                    </TypographyP>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      Service Request Service
                    </h4>
                    <TypographyP>
                      Manages service requests, matching, and booking workflows.
                      Uses reactive programming with WebFlux for real-time
                      updates.
                    </TypographyP>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      Notification Service
                    </h4>
                    <TypographyP>
                      Sends email, SMS, and push notifications using AWS SES and
                      Resend API. Event-driven with Kafka consumers.
                    </TypographyP>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      Messaging Service
                    </h4>
                    <TypographyP>
                      Real-time chat between users and providers using WebSocket
                      connections and Redis pub/sub.
                    </TypographyP>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      Admin Service
                    </h4>
                    <TypographyP>
                      Platform administration, analytics, and monitoring
                      dashboards.
                    </TypographyP>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <TypographyH2>Data Layer</TypographyH2>

            <div className="space-y-4 mt-4">
              <div>
                <TypographyH3>PostgreSQL</TypographyH3>
                <TypographyP>
                  Primary relational database for persistent data. Each
                  microservice has its own database schema for data isolation.
                </TypographyP>
              </div>

              <div>
                <TypographyH3>Redis</TypographyH3>
                <TypographyP>Used for:</TypographyP>
                <TypographyList>
                  <li>Session management and token storage</li>
                  <li>Real-time messaging pub/sub</li>
                  <li>Rate limiting and distributed locks</li>
                  <li>Cache for frequently accessed data</li>
                </TypographyList>
              </div>

              <div>
                <TypographyH3>Caffeine Cache</TypographyH3>
                <TypographyP>
                  In-memory caching for application-level performance
                  optimization and reduced database load.
                </TypographyP>
              </div>
            </div>
          </div>

          <div>
            <TypographyH2>Event-Driven Architecture</TypographyH2>
            <TypographyP>
              We use Apache Kafka for asynchronous communication between
              services:
            </TypographyP>
            <TypographyList>
              <li>
                <strong>Event Publishing</strong>: Services emit events for
                state changes
              </li>
              <li>
                <strong>Event Consumption</strong>: Interested services react to
                events
              </li>
              <li>
                <strong>Benefits</strong>: Loose coupling, scalability, eventual
                consistency
              </li>
            </TypographyList>
          </div>

          <div>
            <TypographyH2>Observability</TypographyH2>

            <div className="space-y-4 mt-4">
              <div>
                <TypographyH3>Metrics (Prometheus + Micrometer)</TypographyH3>
                <TypographyP>
                  Application metrics, JVM statistics, and custom business
                  metrics collected and exposed via Spring Actuator.
                </TypographyP>
              </div>

              <div>
                <TypographyH3>Visualization (Grafana)</TypographyH3>
                <TypographyP>
                  Real-time dashboards for monitoring system health,
                  performance, and business KPIs.
                </TypographyP>
              </div>

              <div>
                <TypographyH3>Health Checks (Actuator)</TypographyH3>
                <TypographyP>
                  Automated health endpoints for service status, database
                  connectivity, and dependency checks.
                </TypographyP>
              </div>
            </div>
          </div>

          <div>
            <TypographyH2>Resilience Patterns</TypographyH2>
            <TypographyP>
              We implement several patterns using Resilience4j:
            </TypographyP>
            <TypographyList>
              <li>
                <strong>Circuit Breaker</strong>: Prevents cascading failures
              </li>
              <li>
                <strong>Retry</strong>: Automatic retry for transient failures
              </li>
              <li>
                <strong>Rate Limiting</strong>: Controls request rates per
                client
              </li>
              <li>
                <strong>Bulkhead</strong>: Isolates thread pools for different
                operations
              </li>
              <li>
                <strong>Timeout</strong>: Prevents indefinite waiting
              </li>
            </TypographyList>
          </div>

          <div>
            <TypographyH2>Infrastructure</TypographyH2>

            <div className="space-y-4 mt-4">
              <div>
                <TypographyH3>Containerization (Docker)</TypographyH3>
                <TypographyP>
                  All services are containerized for consistent deployment
                  across environments.
                </TypographyP>
              </div>

              <div>
                <TypographyH3>Cloud Provider (AWS)</TypographyH3>
                <TypographyList>
                  <li>EC2: Compute instances for services</li>
                  <li>RDS: Managed PostgreSQL databases</li>
                  <li>S3: Object storage for user uploads</li>
                  <li>SES: Email sending service</li>
                </TypographyList>
              </div>

              <div>
                <TypographyH3>Infrastructure as Code (Terraform)</TypographyH3>
                <TypographyP>
                  All infrastructure is defined as code for reproducible and
                  version-controlled deployments.
                </TypographyP>
              </div>

              <div>
                <TypographyH3>CI/CD (GitHub Actions)</TypographyH3>
                <TypographyP>
                  Automated testing, building, and deployment pipelines for
                  rapid and reliable releases.
                </TypographyP>
              </div>
            </div>
          </div>

          <div>
            <TypographyH2>Frontend Architecture</TypographyH2>

            <div className="space-y-4 mt-4">
              <div>
                <TypographyH3>Web (Next.js + React)</TypographyH3>
                <TypographyList>
                  <li>Server-side rendering for SEO and performance</li>
                  <li>Tailwind CSS for responsive design</li>
                  <li>Zustand for state management</li>
                  <li>Zod for runtime type validation</li>
                </TypographyList>
              </div>

              <div>
                <TypographyH3>Mobile Apps</TypographyH3>
                <TypographyList>
                  <li>iOS: Native Swift application</li>
                  <li>Android: Native Kotlin application</li>
                  <li>Shared API client logic</li>
                </TypographyList>
              </div>

              <div>
                <TypographyH3>Deployment (Vercel)</TypographyH3>
                <TypographyP>
                  Web applications deployed on Vercel for edge computing and
                  global CDN distribution.
                </TypographyP>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
