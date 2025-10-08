'use client';

import { useEffect } from 'react';
import SectionTitle from '@/components/typography/section-title';
import { TypographyH2 } from '@/components/typography/TypographyH2';
import { TypographyP } from '@/components/typography/TypographyP';
import HeroCard from '@/app/docs/components/hero-card';
import { TypographyList } from '@/components/typography/TypographyList';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function DocsPage() {
  useEffect(() => {
    document.title = 'Documentation | Chama Aí';
  }, []);

  return (
    <main className="flex flex-col flex-1 gap-12">
      <section>
        <HeroCard
          title="Chama Aí. On-demand services platform."
          description="Find freelancers, hire services, and deliver incredible results. Or organize your work or project easily today."
          buttonText="Visit our app"
        />
      </section>

      <section>
        <SectionTitle>Introduction</SectionTitle>
        <div className="section-content space-y-8">
          <div>
            <TypographyH2>Welcome to Chama Aí!</TypographyH2>
            <TypographyP>
              Thank you for your interessent in Chama Aí. Let&#39;s get you
              started.
            </TypographyP>
          </div>

          <div>
            <TypographyH2>What’s it even about?</TypographyH2>
            <TypographyP>
              Chama Aí is a modern on-demand services platform that connects
              users with local service providers in real-time. Our platform
              offers a complete ecosystem for service discovery, booking,
              communication, and payment processing.
            </TypographyP>
            <TypographyP className="mt-2">
              <strong>Key Features:</strong>
            </TypographyP>
            <TypographyList>
              <li>
                <strong>User & Provider Management</strong>: Complete profile
                and account management
              </li>
              <li>
                <strong>Authentication</strong>: Secure OAuth2 + JWT
                authentication system
              </li>
              <li>
                <strong>Service Requests</strong>: Real-time service matching
                and booking
              </li>
              <li>
                <strong>Messaging</strong>: In-app chat between users and
                providers
              </li>
              <li>
                <strong>Notifications</strong>: Multi-channel notifications
                (Email, SMS, Whatsapp)
              </li>
              <li>
                <strong>Payment Integration</strong>: Secure payments via Stripe
              </li>
            </TypographyList>
          </div>

          <div>
            <TypographyH2>Technology Stack</TypographyH2>
            <TypographyP>
              Chama Aí is built with modern, industry-standard technologies to
              ensure scalability, reliability, and performance. Check out our{' '}
              <Link
                href="/docs/architecture"
                className="text-emerald-600 hover:underline"
              >
                Architecture page
              </Link>{' '}
              for detailed information.
            </TypographyP>

            <div className="space-y-3 mt-4">
              <div>
                <h3 className="font-semibold text-sm mb-1">Backend</h3>
                <p className="text-sm text-muted-foreground">
                  Java, Spring Boot, Spring Cloud, PostgreSQL, Redis, Kafka,
                  OAuth2, JWT
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-1">Frontend</h3>
                <p className="text-sm text-muted-foreground">
                  Next.js, React, TypeScript, Tailwind CSS, Zustand
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-1">Mobile</h3>
                <p className="text-sm text-muted-foreground">
                  Swift (iOS), Kotlin (Android)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-1">Infrastructure</h3>
                <p className="text-sm text-muted-foreground">
                  Docker, AWS, Terraform, Grafana, GitHub Actions
                </p>
              </div>
            </div>
          </div>

          <div>
            <TypographyH2>Quick Links</TypographyH2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Link href="/docs/getting-started">
                <div className="p-4 border rounded-lg hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
                    Getting Started <ArrowRight className="size-4" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Quick start guide to integrate with Chama Aí
                  </p>
                </div>
              </Link>

              <Link href="/docs/authentication">
                <div className="p-4 border rounded-lg hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
                    Authentication <ArrowRight className="size-4" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Learn about OAuth2, JWT, and API keys
                  </p>
                </div>
              </Link>

              <Link href="/docs/architecture">
                <div className="p-4 border rounded-lg hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
                    Architecture <ArrowRight className="size-4" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Understand our microservices architecture
                  </p>
                </div>
              </Link>

              <Link href="/api-reference">
                <div className="p-4 border rounded-lg hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
                    API Reference <ArrowRight className="size-4" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Complete API documentation and examples
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div>
            <TypographyH2>Need Help?</TypographyH2>
            <TypographyP>If you have questions:</TypographyP>
            <TypographyList>
              <li>
                Check our{' '}
                <Link
                  href="/api-reference"
                  className="text-emerald-600 hover:underline"
                >
                  API Reference
                </Link>{' '}
                for detailed endpoint documentation
              </li>
              <li>
                Email at{' '}
                <a
                  href="mailto:gustavoglins05@gmail.com"
                  className="text-emerald-600 hover:underline"
                >
                  gustavoglins05@gmail.com
                </a>
              </li>
              <li>
                Check our{' '}
                <a
                  href="https://github.com/gustavoglins/chama-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  GitHub repository
                </a>
              </li>
            </TypographyList>
          </div>
        </div>
      </section>
    </main>
  );
}
