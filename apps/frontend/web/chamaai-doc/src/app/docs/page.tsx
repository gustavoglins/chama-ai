'use client';

import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { useEffect } from 'react';
import SectionTitle from '@/components/typography/section-title';
import { TypographyH2 } from '@/components/typography/TypographyH2';
import { TypographyP } from '@/components/typography/TypographyP';
import HeroCard from '@/app/docs/components/hero-card';
import DocsSidebar from './components/docs-sidebar';
import { TypographyList } from '@/components/typography/TypographyList';

export default function DocsPage() {
  useEffect(() => {
    document.title = 'Docs | Chama Aí';
  }, []);

  return (
    <SidebarProvider>
      <div className="flex gap-4 w-full">
        <Sidebar
          collapsible="none"
          className="hidden md:block w-[16rem] shrink-0 bg-transparent border-r border-sidebar-border"
        >
          <DocsSidebar />
        </Sidebar>

        <main className="flex flex-col flex-1 gap-12 p-4 md:p-6">
          <section>
            <HeroCard
              title="Chama Aí. On-demand services platform."
              description="Find freelancers, hire services, and deliver incredible results. Or organize your work or project easily today."
              buttonText="Visit Chama Aí"
              buttonHref="https://chamaai.cloud"
            />
          </section>
          <section>
            <SectionTitle>Introduction</SectionTitle>
            <div className="section-content">
              <div>
                <TypographyH2>Welcome!</TypographyH2>
                <TypographyP>
                  Thank you for your interessent in Chama Aí. Let&#39;s get you
                  started.
                </TypographyP>
              </div>
              <div>
                <TypographyH2>What’s it even about?</TypographyH2>
                <TypographyP>
                  Chama Aí is a platform that connects users with local service
                  providers in real-time. The system offers authentication,
                  service requests, notifications, messaging, and an
                  administration panel for managing the platform.
                </TypographyP>
              </div>
              <div>
                <TypographyH2>Under the Hood</TypographyH2>
                <TypographyP>
                  Check the tech stack used to build the Chama Aí.
                </TypographyP>
                <TypographyList>
                  <li>
                    Backend: Java, Spring Boot/Cloud (MVC/WebFlux, Security,
                    OpenFeign), JPA/Hibernate, PostgreSQL, Redis, Caffeine,
                    Kafka, Eureka, Spring Cloud Gateway, JWT, OAuth2, MapStruct,
                    Actuator, Micrometer (Prometheus), Resilience4j, OpenAPI
                    (Swagger).
                  </li>
                  <li>
                    Frontend: Next.js, React, Tailwind CSS, Zustand, Zod, Lucide
                    Icons, framer-motion, react-syntax-highlighter, npm.
                  </li>
                  <li>
                    Infrastructure: Docker, AWS (EC2, S3, SES, RDS), Terraform,
                    Grafana, Github Actions, Vercel.
                  </li>
                  <li>External APIs: Stripe, Resend.</li>
                </TypographyList>
              </div>
            </div>
          </section>
          <section>
            <SectionTitle>Overview</SectionTitle>
            <TypographyH2>Getting Started</TypographyH2>
            <TypographyP>
              Chama Aí is a platform that connects users with local service
              providers in real-time. The system offers authentication, service
              requests, notifications, messaging, and an administration panel
              for managing the platform.
            </TypographyP>
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
}
