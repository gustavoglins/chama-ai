'use client';

import { useEffect } from 'react';
import SectionTitle from '@/components/typography/section-title';
import { TypographyH2 } from '@/components/typography/TypographyH2';
import { TypographyH3 } from '@/components/typography/TypographyH3';
import { TypographyP } from '@/components/typography/TypographyP';
import { TypographyList } from '@/components/typography/TypographyList';
import { TypographyCode } from '@/components/typography/TypographyCode';
import { dedent } from '@/components/typography/code-builder';

export default function GettingStartedPage() {
  useEffect(() => {
    document.title = 'Getting Started | Chama Aí Docs';
  }, []);

  return (
    <main className="flex flex-col flex-1 gap-12">
      <section>
        <SectionTitle>Getting Started</SectionTitle>
        <div className="section-content space-y-8">
          <div>
            <TypographyH2>Quick Start</TypographyH2>
            <TypographyP>
              Get up and running with Chama Aí in just a few minutes. Follow
              these steps to start integrating our platform into your
              application.
            </TypographyP>
          </div>

          <div>
            <TypographyH3>Prerequisites</TypographyH3>
            <TypographyP>Before you begin, make sure you have:</TypographyP>
            <TypographyList>
              <li>A Chama Aí account (sign up at chamaai.cloud)</li>
              <li>Your API key from the dashboard</li>
              <li>Basic knowledge of REST APIs</li>
              <li>
                Development environment with your preferred language (Java,
                Python, Node.js, etc.)
              </li>
            </TypographyList>
          </div>

          <div>
            <TypographyH3>1. Get Your API Key</TypographyH3>
            <TypographyP>
              First, you&apos;ll need to obtain your API key from the Chama Aí
              dashboard:
            </TypographyP>
            <TypographyList>
              <li>Log in to your Chama Aí account</li>
              <li>Navigate to Settings → API Keys</li>
              <li>Click &quot;Generate New Key&quot;</li>
              <li>
                Copy your key and store it securely (you won&apos;t be able to
                see it again)
              </li>
            </TypographyList>
          </div>

          <div>
            <TypographyH3>2. Make Your First Request</TypographyH3>
            <TypographyP>
              Test your API key by making a simple request to get system
              information:
            </TypographyP>

            <TypographyCode
              language="bash"
              title="cURL Example"
              code={dedent`
                curl -X GET https://api.chamaai.cloud/v1/info \\
                  -H "Authorization: Bearer YOUR_API_KEY" \\
                  -H "Content-Type: application/json"
              `}
            />

            <TypographyCode
              language="json"
              title="Response"
              code={dedent`
                {
                  "status": "success",
                  "version": "1.0.0",
                  "message": "Chama Aí API is running"
                }
              `}
            />
          </div>

          <div>
            <TypographyH3>3. Install SDK (Optional)</TypographyH3>
            <TypographyP>
              For easier integration, you can use our official SDKs:
            </TypographyP>

            <TypographyCode
              language="bash"
              title="Java (Maven)"
              code={dedent`
                <dependency>
                  <groupId>cloud.chamaai</groupId>
                  <artifactId>chamaai-sdk</artifactId>
                  <version>1.0.0</version>
                </dependency>
              `}
            />

            <TypographyCode
              language="bash"
              title="Node.js"
              code={dedent`
                npm install @chamaai/sdk
              `}
            />

            <TypographyCode
              language="bash"
              title="Python"
              code={dedent`
                pip install chamaai-sdk
              `}
            />
          </div>

          <div>
            <TypographyH3>4. Next Steps</TypographyH3>
            <TypographyP>
              Now that you&apos;re set up, explore these resources:
            </TypographyP>
            <TypographyList>
              <li>Check out the Authentication guide to learn about OAuth2</li>
              <li>
                Browse the API Reference for detailed endpoint documentation
              </li>
              <li>Read about best practices and rate limits</li>
              <li>Join our developer community for support</li>
            </TypographyList>
          </div>
        </div>
      </section>
    </main>
  );
}
