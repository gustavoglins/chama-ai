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

export default function GetInformationPage() {
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
      <SectionTitle>Start</SectionTitle>
      <section className="section-content">
        {/* <section className="space-y-8"> */}
        <div className="space-y-4">
          <TypographyH2>Get Information</TypographyH2>
          <TypographyP className="text-muted-foreground">
            Get information about the API status and health.
          </TypographyP>
        </div>

        <div className="space-y-4">
          <TypographyH3>Endpoint</TypographyH3>
          <RequestCard method="get" endpoint="/" />
        </div>

        <div className="space-y-4">
          <TypographyH3>Request Body</TypographyH3>
          <TypographyCode
            languages={['json', 'cURL']}
            language="json"
            showLanguageSelector
            codeByLanguage={{
              json: dedent`
              {}
            `,
              cURL: dedent`
              curl --request GET \\
                --url https://{server-url}/ \\
              }
            `,
            }}
          />
        </div>

        <div className="space-y-4">
          <TypographyH3>Path Parameters</TypographyH3>
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
                <TableCell className="font-mono text-sm"></TableCell>
                <TableCell className="text-muted-foreground"></TableCell>
                <TableCell></TableCell>
                <TableCell className="text-muted-foreground"></TableCell>
              </TableRow>
            </TableBody>
          </TypographyTable>
        </div>
        <div className="space-y-4">
          <TypographyH3>Responses</TypographyH3>

          <TypographyCode
            languages={['200', '404', '400']}
            language="200"
            showLanguageSelector
            codeByLanguage={{
              '200': dedent`
          {
            "status": "success",
            "code": "200",
            "message": "API is running smoothly",
            "data": {
              "name": "Chama Aí API",
              "version": "1.0.0",
              "timestamp": "${getBrazilTimestamp()}"
            },
            "errors": null
          }
              `,
              '404': dedent`
          {
            "status": "error",
            "error": {
              "code": "BATCH_NOT_FOUND",
              "message": "Batch job with the specified ID was not found",
              "details": {
                "batchId": "batch_invalid_id"
              }
            }
          }
              `,
              '400': dedent`
          {
            "status": "error",
            "error": {
              "code": "INVALID_REQUEST",
              "message": "Invalid configuration parameters",
              "details": {
                "field": "language",
                "reason": "Unsupported language code"
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
