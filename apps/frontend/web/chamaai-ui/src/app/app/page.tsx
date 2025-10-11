import { CategoriesGrid } from '@/components/categories/CategoriesGrid';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { TypographyH2 } from '@/components/typography/TypographyH2';
import { TypographyH4 } from '@/components/typography/TypographyH4';
import { TypographyP } from '@/components/typography/TypographyP';
import MosaicCards from '@/components/ui/MosaicCards';

export default function AppPage() {
  return (
    <div className="w-full h-full flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <div>
          <TypographyH2>Início</TypographyH2>
          <TypographyP>
            Tarefas, consertos ou alguém pra dar uma mão… tá tudo aqui.
          </TypographyP>
        </div>
        {/* <div className="h-[500px]"> */}
        <div className="h-[520px]">
          <MosaicCards
            imageSrcs={[
              {
                solid: 'emerald',
                title: 'CHAMAAI25',
                subtitle: 'Cupom especial pra o seu 1º pedido!',
                badges: ['Cupom ativo'],
                actionIcon: 'Gift',
              },
              {
                image: '/images/app-hero/plumber.png',
                title: 'Reparos rápidos',
                subtitle: 'Chaveiros, Encanadores, eletricistas e mais',
                badges: ['Casa & Reparos'],
                actionIcon: 'House',
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
              },
              {
                solid: 'emerald',
                title: 'Na correria?',
                subtitle: 'Chama Aí e ta resolvido',
                badges: ['Serviços sob demanda'],
                actionIcon: 'ArrowUpRight',
              },
              {
                image: '/images/app-hero/personal-trainer.png',
                title: 'Personal Trainer',
                actionIcon: 'Dumbbell',
                badges: ['Treinos'],
              },
              {
                image: '/images/app-hero/logistic.png',
                actionIcon: 'Box',
                title: 'De mudança?',
                subtitle: 'Ajuda rápida pra carregar ou transportar',
                badges: ['Transporte & Entregas'],
              },
            ]}
          />
        </div>
      </div>

      <TypographyH4>Categorias</TypographyH4>

      <CategoriesGrid className="mt-4">
        <CategoryCard
          title="Casa & Reparos"
          subtitle="2 mil Eventos"
          iconImages={['/3d-icons/3d-house.png']}
          href="#"
        />
        <CategoryCard
          title="Tecnologia & Digital"
          subtitle="67 Eventos"
          iconImages={['/3d-icons/3d-computer.png']}
          href="#"
        />
        <CategoryCard
          title="Transporte & Entregas"
          subtitle="2 mil Eventos"
          iconImages={['/3d-icons/3d-truck.png']}
          href="#"
        />
        <CategoryCard
          title="Saúde & Bem-estar"
          subtitle="1 mil Eventos"
          iconImages={['/3d-icons/heartbeat.png']}
          href="#"
        />
        <CategoryCard
          title="Eventos & Festas"
          subtitle="555 Eventos"
          iconImages={['/3d-icons/036-speakers.png']}
          href="#"
        />
        <CategoryCard
          title="Aulas & Treinamento"
          subtitle="980 Eventos"
          iconImages={['/3d-icons/gym.png']}
          href="#"
        />
        <CategoryCard
          title="Automóveis & Transportes"
          subtitle="1 mil Eventos"
          iconImages={['/3d-icons/014-silhouette.png']}
          href="#"
        />
        <CategoryCard
          title="Administrativos"
          subtitle="991 Eventos"
          iconImages={['/3d-icons/approved.png']}
          href="#"
        />
        {/* <CategoryCard
          title="Outros / Diversos"
          subtitle="991 Eventos"
          iconImages={['/3d-icons/dice.png']}
          href="#"
        /> */}
      </CategoriesGrid>
    </div>
  );
}
