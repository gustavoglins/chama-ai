'use client';

import { useEffect } from 'react';
import SectionTitle from '@/components/typography/section-title';
import { TypographyH2 } from '@/components/typography/TypographyH2';
import { TypographyH3 } from '@/components/typography/TypographyH3';
import { TypographyP } from '@/components/typography/TypographyP';
import { TypographyList } from '@/components/typography/TypographyList';
import { TypographyCode } from '@/components/typography/TypographyCode';
import { dedent } from '@/components/typography/code-builder';

export default function BestPracticesPage() {
  useEffect(() => {
    document.title = 'Best Practices | Chama Aí Docs';
  }, []);

  return (
    <main className="flex flex-col flex-1 gap-12">
      <section>
        <SectionTitle>Best Practices</SectionTitle>
        <div className="section-content space-y-8">
          <div>
            <TypographyH2>API Integration</TypographyH2>
            <TypographyP>
              Follow these best practices to ensure your integration with Chama
              Aí is secure, efficient, and maintainable.
            </TypographyP>
          </div>

          <div>
            <TypographyH3>Security</TypographyH3>

            <div className="space-y-4 mt-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">
                  Store API Keys Securely
                </h4>
                <TypographyP>
                  Never hardcode API keys in your source code. Use environment
                  variables or secure vaults:
                </TypographyP>
                <TypographyCode
                  language="bash"
                  title=".env"
                  code={dedent`
                    CHAMAAI_API_KEY=your_api_key_here
                    CHAMAAI_API_URL=https://api.chamaai.cloud/v1
                  `}
                />
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Use HTTPS Only</h4>
                <TypographyP>
                  Always use HTTPS for API requests. HTTP requests will be
                  rejected.
                </TypographyP>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">
                  Implement Token Refresh
                </h4>
                <TypographyP>
                  Handle token expiration gracefully by implementing automatic
                  token refresh:
                </TypographyP>
                <TypographyCode
                  language="typescript"
                  title="Token Refresh Example"
                  code={dedent`
                    async function refreshAccessToken(refreshToken: string) {
                      const response = await fetch('https://api.chamaai.cloud/v1/auth/refresh', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refreshToken })
                      });
                      
                      if (!response.ok) throw new Error('Token refresh failed');
                      
                      const { accessToken, expiresIn } = await response.json();
                      return { accessToken, expiresIn };
                    }
                  `}
                />
              </div>
            </div>
          </div>

          <div>
            <TypographyH3>Rate Limiting</TypographyH3>
            <TypographyP>
              Respect rate limits to avoid being throttled:
            </TypographyP>
            <TypographyList>
              <li>
                <strong>Default limit</strong>: 100 requests per minute per API
                key
              </li>
              <li>
                <strong>Response headers</strong>: Check{' '}
                <code className="text-sm">X-RateLimit-Remaining</code> and{' '}
                <code className="text-sm">X-RateLimit-Reset</code>
              </li>
              <li>
                <strong>Backoff strategy</strong>: Implement exponential backoff
                for rate limit errors (HTTP 429)
              </li>
            </TypographyList>

            <TypographyCode
              language="typescript"
              title="Rate Limit Handling"
              code={dedent`
                async function apiCall(url: string, options: RequestInit) {
                  const response = await fetch(url, options);
                  
                  if (response.status === 429) {
                    const retryAfter = response.headers.get('Retry-After');
                    const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 60000;
                    
                    console.log(\`Rate limited. Waiting \${waitTime}ms...\`);
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                    
                    return apiCall(url, options); // Retry
                  }
                  
                  return response;
                }
              `}
            />
          </div>

          <div>
            <TypographyH3>Error Handling</TypographyH3>
            <TypographyP>
              Implement comprehensive error handling for all API calls:
            </TypographyP>

            <TypographyCode
              language="typescript"
              title="Error Handling Example"
              code={dedent`
                try {
                  const response = await fetch('https://api.chamaai.cloud/v1/user/profile', {
                    headers: { 
                      'Authorization': \`Bearer \${accessToken}\`,
                      'Content-Type': 'application/json'
                    }
                  });
                  
                  if (!response.ok) {
                    const error = await response.json();
                    
                    switch (response.status) {
                      case 401:
                        // Token expired or invalid - refresh and retry
                        await refreshAndRetry();
                        break;
                      case 403:
                        // Insufficient permissions
                        console.error('Access denied:', error.message);
                        break;
                      case 404:
                        // Resource not found
                        console.error('Not found:', error.message);
                        break;
                      case 429:
                        // Rate limited
                        await handleRateLimit(response);
                        break;
                      case 500:
                        // Server error - retry with backoff
                        await retryWithBackoff();
                        break;
                      default:
                        console.error('API error:', error);
                    }
                    
                    throw new Error(error.message);
                  }
                  
                  const data = await response.json();
                  return data;
                } catch (error) {
                  console.error('Request failed:', error);
                  throw error;
                }
              `}
            />
          </div>

          <div>
            <TypographyH3>Performance Optimization</TypographyH3>

            <div className="space-y-4 mt-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Use Caching</h4>
                <TypographyP>
                  Cache responses when appropriate to reduce API calls:
                </TypographyP>
                <TypographyList>
                  <li>Cache static data (service categories, etc.)</li>
                  <li>
                    Use ETags and If-None-Match headers for conditional requests
                  </li>
                  <li>Respect Cache-Control headers in API responses</li>
                </TypographyList>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">
                  Batch Requests When Possible
                </h4>
                <TypographyP>
                  Use batch endpoints to fetch multiple resources in a single
                  request instead of making multiple individual requests.
                </TypographyP>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Use Pagination</h4>
                <TypographyP>
                  Always use pagination for list endpoints to avoid large
                  payloads:
                </TypographyP>
                <TypographyCode
                  language="bash"
                  code={dedent`
                    GET /v1/services?page=1&limit=20
                  `}
                />
              </div>
            </div>
          </div>

          <div>
            <TypographyH3>Idempotency</TypographyH3>
            <TypographyP>
              Use idempotency keys for write operations to prevent duplicate
              actions:
            </TypographyP>
            <TypographyCode
              language="bash"
              title="Idempotent Request"
              code={dedent`
                curl -X POST https://api.chamaai.cloud/v1/bookings \\
                  -H "Authorization: Bearer \${ACCESS_TOKEN}" \\
                  -H "Content-Type: application/json" \\
                  -H "Idempotency-Key: unique-request-id-12345" \\
                  -d '{
                    "serviceId": "srv_123",
                    "providerId": "prv_456",
                    "scheduledAt": "2025-10-15T14:00:00Z"
                  }'
              `}
            />
          </div>

          <div>
            <TypographyH3>Webhook Best Practices</TypographyH3>
            <TypographyP>When receiving webhooks from Chama Aí:</TypographyP>
            <TypographyList>
              <li>
                <strong>Verify signatures</strong>: Always validate webhook
                signatures to ensure authenticity
              </li>
              <li>
                <strong>Respond quickly</strong>: Return a 200 status code
                within 5 seconds
              </li>
              <li>
                <strong>Process async</strong>: Queue webhook payloads for
                asynchronous processing
              </li>
              <li>
                <strong>Handle duplicates</strong>: Webhooks may be sent
                multiple times, handle them idempotently
              </li>
              <li>
                <strong>Implement retry</strong>: We&apos;ll retry failed
                webhooks up to 3 times
              </li>
            </TypographyList>
          </div>

          <div>
            <TypographyH3>Monitoring & Logging</TypographyH3>
            <TypographyP>
              Implement proper monitoring for your integration:
            </TypographyP>
            <TypographyList>
              <li>
                <strong>Log all API requests</strong>: Include request ID,
                timestamp, endpoint, and response status
              </li>
              <li>
                <strong>Monitor error rates</strong>: Set up alerts for high
                error rates
              </li>
              <li>
                <strong>Track latency</strong>: Monitor response times and set
                alerts for degradation
              </li>
              <li>
                <strong>Use correlation IDs</strong>: Include them in all
                requests for easier debugging
              </li>
            </TypographyList>

            <TypographyCode
              language="typescript"
              title="Logging Example"
              code={dedent`
                import { v4 as uuidv4 } from 'uuid';

                async function apiRequest(endpoint: string, options: RequestInit) {
                  const correlationId = uuidv4();
                  const startTime = Date.now();
                  
                  try {
                    const response = await fetch(\`https://api.chamaai.cloud\${endpoint}\`, {
                      ...options,
                      headers: {
                        ...options.headers,
                        'X-Correlation-ID': correlationId
                      }
                    });
                    
                    const duration = Date.now() - startTime;
                    
                    console.log({
                      correlationId,
                      endpoint,
                      method: options.method || 'GET',
                      status: response.status,
                      duration,
                      timestamp: new Date().toISOString()
                    });
                    
                    return response;
                  } catch (error) {
                    console.error({
                      correlationId,
                      endpoint,
                      error: error.message,
                      duration: Date.now() - startTime,
                      timestamp: new Date().toISOString()
                    });
                    throw error;
                  }
                }
              `}
            />
          </div>

          <div>
            <TypographyH3>Testing</TypographyH3>
            <TypographyP>Test your integration thoroughly:</TypographyP>
            <TypographyList>
              <li>
                <strong>Use sandbox environment</strong>: Test with sandbox API
                keys before going live
              </li>
              <li>
                <strong>Test error scenarios</strong>: Verify handling of all
                error codes
              </li>
              <li>
                <strong>Load testing</strong>: Ensure your implementation can
                handle expected traffic
              </li>
              <li>
                <strong>Security testing</strong>: Test authentication and
                authorization flows
              </li>
            </TypographyList>
          </div>
        </div>
      </section>
    </main>
  );
}
