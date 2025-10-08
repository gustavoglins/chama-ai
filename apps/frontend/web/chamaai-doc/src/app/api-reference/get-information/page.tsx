import SectionTitle from '@/components/typography/section-title';
import { TypographyH2 } from '@/components/typography/TypographyH2';
import RequestCard from '@/components/ui/request-card';

export default function GetInformationPage() {
  return (
    <div className="w-full">
      <div className="space-y-2 w-full">
        <SectionTitle>Start</SectionTitle>
        <TypographyH2 className="text-3xl font-semibold tracking-tight">
          Get Information
        </TypographyH2>
        <p className="text-sm text-muted-foreground">
          Get information about API Status.
        </p>
        <RequestCard method="get" endpoint="/" />
        <RequestCard
          method="post"
          endpoint="/user-service/api/v1/users/signup"
        />
        <RequestCard
          method="put"
          endpoint="/notification-service/api/v1/notifications/email/send"
        />
        <RequestCard method="delete" endpoint="/auth-service/api" />
      </div>
    </div>
  );
}
