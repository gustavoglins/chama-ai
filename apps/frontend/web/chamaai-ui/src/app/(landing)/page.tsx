import {Button} from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
    return (
        <section className="flex flex-row w-full items-center justify-between">
            <div className="max-w-2/5">
                <Image
                    src="/logo.png"
                    alt="Chama Ai Logo"
                    width={802}
                    height={222}
                    className="h-10 w-auto object-contain mb-5"
                    priority
                />
                <h1 className="text-5xl text-primary font-bold mb-4">
                    Serviços rápidos e confiáveis ao seu alcance.
                </h1>
                <p className="text-xl text-gray-500 mb-6">
                    Encontre freelancers, contrate serviços e entregue resultados
                    incríveis. Organize seu trabalho ou seu projeto com facilidade hoje
                    mesmo.
                </p>
                <Link href="/auth/signup">
                    <Button size="2xl">Comece Agora</Button>
                </Link>
            </div>
            <div className="max-w-1/2 w-[36rem] h-[36rem]">
                <Image
                    src="/landingpage-bg-photo.png"
                    alt="Suburb Landscape"
                    width={1920}
                    height={1920}
                    className="w-full h-full rounded-full object-cover"
                    priority
                />
            </div>
        </section>
    );
}
