'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioCardGroup } from '@/components/ui/radio-card';
import { AccountType } from '@/types/AccountType';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export default function ServiceProviderSignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <h1></h1>
    </>
  );
}
