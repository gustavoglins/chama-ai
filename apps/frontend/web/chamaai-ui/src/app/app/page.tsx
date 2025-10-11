import { CategoriesGrid } from '@/components/categories/CategoriesGrid';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { TypographyH2 } from '@/components/typography/TypographyH2';
import { TypographyH4 } from '@/components/typography/TypographyH4';
import { TypographyMuted } from '@/components/typography/TypographyMuted';
import MosaicCards from '@/components/ui/MosaicCards';

export default function AppPage() {
  return (
    <main className="w-full h-full flex flex-col gap-20">
      <section className="flex flex-col gap-8 mb-10">
        <div>
          <TypographyH2>Início</TypographyH2>
          <TypographyMuted>
            Tarefas, consertos ou alguém pra dar uma mão… tá tudo aqui.
          </TypographyMuted>
        </div>
        <div className="h-[520px]">
          <MosaicCards
            imageSrcs={[
              {
                solid: 'emerald',
                title: 'CHAMAAI25',
                subtitle: 'Cupom especial pra o seu 1º pedido!',
                badges: ['Cupom ativo'],
                actionIcon: 'Gift',
                href: '/app/services',
              },
              {
                image: '/images/app-hero/plumber.png',
                title: 'Reparos rápidos',
                subtitle: 'Chaveiros, Encanadores, eletricistas e mais',
                badges: ['Casa & Reparos'],
                actionIcon: 'House',
                href: '/app/services/house-repairs',
              },
              {
                image: '/images/app-hero/ti.png',
                title: 'Serviços de TI',
                badges: [
                  'Designers',
                  'Programadores',
                  'UX/UI',
                  'Marketing',
                  'Técnicos',
                ],
                actionIcon: 'Monitor',
                cta: { label: 'Contratar', href: '/services/ti' },
                href: '/app/services/technology-digital',
              },
              {
                solid: 'emerald',
                title: 'Na correria?',
                subtitle: 'Chama Aí e ta resolvido',
                badges: ['Serviços sob demanda'],
                actionIcon: 'ArrowUpRight',
                href: '/app/services',
              },
              {
                image: '/images/app-hero/personal-trainer.png',
                title: 'Personal Trainer',
                actionIcon: 'Dumbbell',
                badges: ['Treinos'],
                href: '/app/services/classes-training',
              },
              {
                image: '/images/app-hero/logistic.png',
                actionIcon: 'Box',
                title: 'De mudança?',
                subtitle: 'Ajuda rápida pra carregar ou transportar',
                badges: ['Transporte & Entregas'],
                href: '/app/services/transportation-delivery',
              },
            ]}
          />
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div>
          <TypographyH4>Categorias</TypographyH4>
          <TypographyMuted>
            Encontre o serviço que você precisa nas categorias abaixo, de forma
            rápida e fácil.
          </TypographyMuted>
        </div>

        <CategoriesGrid className="mt-0">
          <CategoryCard
            title="Casa & Reparos"
            subtitle="2 mil Serviços"
            iconImages={['/3d-icons/3d-house.png']}
            href="/app/services/house-repairs"
          />
          <CategoryCard
            title="Tecnologia & Digital"
            subtitle="67 Serviços"
            iconImages={['/3d-icons/3d-computer.png']}
            href="/app/services/technology-digital"
          />
          <CategoryCard
            title="Transporte & Entregas"
            subtitle="2 mil Serviços"
            iconImages={['/3d-icons/3d-truck.png']}
            href="/app/services/transportation-delivery"
          />
          <CategoryCard
            title="Saúde & Bem-estar"
            subtitle="1 mil Serviços"
            iconImages={['/3d-icons/heartbeat.png']}
            href="/app/services/health-wellness"
          />
          <CategoryCard
            title="Eventos & Festas"
            subtitle="555 Serviços"
            iconImages={['/3d-icons/036-speakers.png']}
            href="/app/services/events-parties"
          />
          <CategoryCard
            title="Aulas & Treinamento"
            subtitle="980 Serviços"
            iconImages={['/3d-icons/gym.png']}
            href="/app/services/classes-training"
          />
          <CategoryCard
            title="Automóveis & Transportes"
            subtitle="1 mil Serviços"
            iconImages={['/3d-icons/014-silhouette.png']}
            href="/app/services/auto-delivery"
          />
          <CategoryCard
            title="Administrativos"
            subtitle="991 Serviços"
            iconImages={['/3d-icons/approved.png']}
            href="/app/services/adm"
          />
          {/* <CategoryCard
          title="Outros / Diversos"
          subtitle="991 Eventos"
          iconImages={['/3d-icons/dice.png']}
          href="/app/services/others"
        /> */}
        </CategoriesGrid>
      </section>
    </main>
  );
}
