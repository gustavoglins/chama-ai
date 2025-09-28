import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-8xl text-primary font-bold mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Ops! A página que você está procurando não existe.
      </p>
      <Link href="/">
        <Button size="lg">
          <ArrowLeft /> Voltar para Home
        </Button>
      </Link>
    </div>
  );
}
