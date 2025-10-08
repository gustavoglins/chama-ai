'use client';

import { dedent } from '@/components/typography/code-builder';
import { TypographyCode } from '@/components/typography/TypographyCode';
import { TypographyH2 } from '@/components/typography/TypographyH2';
import { TypographyH3 } from '@/components/typography/TypographyH3';
import { TypographyP } from '@/components/typography/TypographyP';
import RequestCard from '@/components/ui/request-card';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TypographyTable } from '@/components/typography/TypographyTable';
import SectionTitle from '@/components/typography/section-title';

export default function UserServiceSignupPage() {
  // Gera timestamp em tempo real no fuso horário do Brasil (UTC-3)
  const getBrazilTimestamp = () => {
    const now = new Date();
    const brazilTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
    );
    const offset = '-03:00'; // Horário de Brasília
    const year = brazilTime.getFullYear();
    const month = String(brazilTime.getMonth() + 1).padStart(2, '0');
    const day = String(brazilTime.getDate()).padStart(2, '0');
    const hours = String(brazilTime.getHours()).padStart(2, '0');
    const minutes = String(brazilTime.getMinutes()).padStart(2, '0');
    const seconds = String(brazilTime.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offset}`;
  };

  return (
    <>
      <SectionTitle>User Service</SectionTitle>
      <section className="section-content">
        <div className="space-y-4">
          <TypographyH2>User Signup</TypographyH2>
          <TypographyP className="text-muted-foreground">
            Create a new user account in the system.
          </TypographyP>
        </div>

        <div className="space-y-4">
          <TypographyH3>Endpoint</TypographyH3>
          <RequestCard method="post" endpoint="/v1/users/signup" />
        </div>

        <div className="space-y-4">
          <TypographyH3>Request Body</TypographyH3>
          <TypographyCode
            languages={['json', 'cURL']}
            language="json"
            showLanguageSelector
            codeByLanguage={{
              json: dedent`
              {
                "email": "user@example.com",
                "password": "SecureP@ssw0rd",
                "name": "John Doe",
                "phone": "+55 11 98765-4321"
              }
            `,
              cURL: dedent`
              curl https://api.example.com/v1/users/signup \\
                --request POST \\
                --header "Content-Type: application/json" \\
                --data '{
                  "email": "user@example.com",
                  "password": "SecureP@ssw0rd",
                  "name": "John Doe",
                  "phone": "+55 11 98765-4321"
                }'
            `,
            }}
          />
        </div>

        <div className="space-y-4">
          <TypographyH3>Body Parameters</TypographyH3>
          <TypographyTable>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Parameter</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Required</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-sm">email</TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                  >
                    yes
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  User&apos;s email address (must be valid and unique)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">password</TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                  >
                    yes
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  User&apos;s password (minimum 8 characters, must include
                  uppercase, lowercase, number and special character)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">name</TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                  >
                    yes
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  User&apos;s full name
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">phone</TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                  >
                    no
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  User&apos;s phone number (optional)
                </TableCell>
              </TableRow>
            </TableBody>
          </TypographyTable>
        </div>

        <div className="space-y-4">
          <TypographyH3>Responses</TypographyH3>

          <TypographyCode
            languages={['201', '400', '409']}
            language="201"
            showLanguageSelector
            codeByLanguage={{
              '201': dedent`
          {
            "status": "success",
            "code": "201",
            "message": "User created successfully",
            "data": {
              "userId": "usr_1a2b3c4d5e6f",
              "email": "user@example.com",
              "name": "John Doe",
              "phone": "+55 11 98765-4321",
              "createdAt": "${getBrazilTimestamp()}",
              "verified": false
            },
            "errors": null
          }
              `,
              '400': dedent`
          {
            "status": "error",
            "error": {
              "code": "INVALID_REQUEST",
              "message": "Invalid request parameters",
              "details": {
                "field": "password",
                "reason": "Password must be at least 8 characters and include uppercase, lowercase, number and special character"
              }
            }
          }
              `,
              '409': dedent`
          {
            "status": "error",
            "error": {
              "code": "USER_ALREADY_EXISTS",
              "message": "User with this email already exists",
              "details": {
                "email": "user@example.com"
              }
            }
          }
              `,
            }}
          />
        </div>
      </section>
    </>
  );
}
