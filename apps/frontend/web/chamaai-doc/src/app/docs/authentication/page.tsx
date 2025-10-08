'use client';

import { useEffect } from 'react';
import SectionTitle from '@/components/typography/section-title';
import { TypographyH2 } from '@/components/typography/TypographyH2';
import { TypographyH3 } from '@/components/typography/TypographyH3';
import { TypographyP } from '@/components/typography/TypographyP';
import { TypographyList } from '@/components/typography/TypographyList';
import { TypographyCode } from '@/components/typography/TypographyCode';
import { CodeLanguage } from '@/components/typography/TypographyCode';
import { dedent } from '@/components/typography/code-builder';

export default function AuthenticationPage() {
  useEffect(() => {
    document.title = 'Authentication | Chama Aí Docs';
  }, []);

  return (
    <main className="flex flex-col flex-1 gap-12">
      <section>
        <SectionTitle>Authentication</SectionTitle>
        <div className="section-content space-y-8">
          <div>
            <TypographyH2>Overview</TypographyH2>
            <TypographyP>
              Chama Aí uses a combination of JWT tokens and OAuth2 for secure
              authentication. All API requests must include a valid
              authentication token in the Authorization header.
            </TypographyP>
          </div>

          <div>
            <TypographyH2>Authentication Methods</TypographyH2>
            <TypographyP>
              We support two primary authentication methods:
            </TypographyP>
            <TypographyList>
              <li>
                <strong>API Keys</strong>: For server-to-server communication
              </li>
              <li>
                <strong>OAuth2 + JWT</strong>: For user authentication in web
                and mobile apps
              </li>
            </TypographyList>
          </div>

          <div>
            <TypographyH3>API Key Authentication</TypographyH3>
            <TypographyP>
              Use API keys for backend services and server-side applications:
            </TypographyP>

            <TypographyCode
              language="bash"
              title="Using API Key"
              code={dedent`
                curl -X GET https://api.chamaai.cloud/v1/services \\
                  -H "Authorization: Bearer YOUR_API_KEY" \\
                  -H "Content-Type: application/json"
              `}
            />
          </div>

          <div>
            <TypographyH3>OAuth2 + JWT Flow</TypographyH3>
            <TypographyP>
              For user-facing applications, use the OAuth2 flow with JWT tokens:
            </TypographyP>

            <TypographyH3 className="mt-6">1. User Registration</TypographyH3>
            <TypographyP>Register a new user account:</TypographyP>

            <TypographyCode
              language={CodeLanguage.CURL}
              languages={[
                CodeLanguage.CURL,
                CodeLanguage.JAVA,
                CodeLanguage.NODEJS,
                CodeLanguage.PYTHON,
              ]}
              showLanguageSelector
              codeByLanguage={{
                [CodeLanguage.CURL]: dedent`
                  curl -X POST https://api.chamaai.cloud/v1/auth/signup \\
                    -H "Content-Type: application/json" \\
                    -d '{
                      "email": "user@example.com",
                      "password": "SecurePassword123!",
                      "firstName": "John",
                      "lastName": "Doe",
                      "phoneNumber": "+5511999999999"
                    }'
                `,
                [CodeLanguage.JAVA]: dedent`
                  import cloud.chamaai.sdk.ChamaAIClient;
                  import cloud.chamaai.sdk.models.SignupRequest;

                  ChamaAIClient client = new ChamaAIClient();

                  SignupRequest request = SignupRequest.builder()
                      .email("user@example.com")
                      .password("SecurePassword123!")
                      .firstName("John")
                      .lastName("Doe")
                      .phoneNumber("+5511999999999")
                      .build();

                  var response = client.auth().signup(request);
                  System.out.println("User ID: " + response.getUserId());
                `,
                [CodeLanguage.NODEJS]: dedent`
                  import { ChamaAI } from '@chamaai/sdk';

                  const client = new ChamaAI();

                  const response = await client.auth.signup({
                    email: 'user@example.com',
                    password: 'SecurePassword123!',
                    firstName: 'John',
                    lastName: 'Doe',
                    phoneNumber: '+5511999999999'
                  });

                  console.log('User ID:', response.userId);
                `,
                [CodeLanguage.PYTHON]: dedent`
                  from chamaai import ChamaAI

                  client = ChamaAI()

                  response = client.auth.signup(
                      email="user@example.com",
                      password="SecurePassword123!",
                      first_name="John",
                      last_name="Doe",
                      phone_number="+5511999999999"
                  )

                  print(f"User ID: {response.user_id}")
                `,
              }}
            />

            <TypographyH3 className="mt-6">2. Login & Get Tokens</TypographyH3>
            <TypographyP>
              Authenticate with email and password to receive JWT tokens:
            </TypographyP>

            <TypographyCode
              language="bash"
              title="Login Request"
              code={dedent`
                curl -X POST https://api.chamaai.cloud/v1/auth/login \\
                  -H "Content-Type: application/json" \\
                  -d '{
                    "email": "user@example.com",
                    "password": "SecurePassword123!"
                  }'
              `}
            />

            <TypographyCode
              language="json"
              title="Response"
              code={dedent`
                {
                  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  "expiresIn": 3600,
                  "tokenType": "Bearer"
                }
              `}
            />

            <TypographyH3 className="mt-6">3. Using Access Tokens</TypographyH3>
            <TypographyP>
              Include the access token in the Authorization header for
              authenticated requests:
            </TypographyP>

            <TypographyCode
              language="bash"
              title="Authenticated Request"
              code={dedent`
                curl -X GET https://api.chamaai.cloud/v1/user/profile \\
                  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \\
                  -H "Content-Type: application/json"
              `}
            />

            <TypographyH3 className="mt-6">4. Refreshing Tokens</TypographyH3>
            <TypographyP>
              When the access token expires, use the refresh token to get a new
              one:
            </TypographyP>

            <TypographyCode
              language="bash"
              title="Refresh Token Request"
              code={dedent`
                curl -X POST https://api.chamaai.cloud/v1/auth/refresh \\
                  -H "Content-Type: application/json" \\
                  -d '{
                    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  }'
              `}
            />
          </div>

          <div>
            <TypographyH2>Security Best Practices</TypographyH2>
            <TypographyList>
              <li>
                <strong>Never expose API keys</strong>: Keep them in environment
                variables or secure vaults
              </li>
              <li>
                <strong>Use HTTPS only</strong>: All requests must use secure
                connections
              </li>
              <li>
                <strong>Rotate tokens</strong>: Implement token refresh logic in
                your app
              </li>
              <li>
                <strong>Handle expiration</strong>: Check for 401 responses and
                refresh tokens automatically
              </li>
              <li>
                <strong>Store securely</strong>: Use secure storage for tokens
                on mobile/web apps
              </li>
            </TypographyList>
          </div>

          <div>
            <TypographyH2>Error Handling</TypographyH2>
            <TypographyP>Common authentication errors:</TypographyP>

            <TypographyCode
              language="json"
              title="401 Unauthorized"
              code={dedent`
                {
                  "error": "unauthorized",
                  "message": "Invalid or expired token",
                  "statusCode": 401
                }
              `}
            />

            <TypographyCode
              language="json"
              title="403 Forbidden"
              code={dedent`
                {
                  "error": "forbidden",
                  "message": "Insufficient permissions for this resource",
                  "statusCode": 403
                }
              `}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
