import SectionTitle from '@/components/typography/section-title';
import { TypographyH3 } from '@/components/typography/TypographyH3';
import { TypographyP } from '@/components/typography/TypographyP';

export default function GetInformationPage() {
  return (
    <div>
      {/* <SectionTitle>Start</SectionTitle>
      <TypographyH3>Get Information</TypographyH3>
      <TypographyP>Get information about Chama Aí API Status</TypographyP> */}

      <div className="space-y-2">
        <SectionTitle>Start</SectionTitle>
        <h1 className="text-3xl font-semibold tracking-tight">
          Get Information
        </h1>
        <p className="text-sm text-muted-foreground">
          Get information about API Status.
        </p>
      </div>
    </div>
  );
}
