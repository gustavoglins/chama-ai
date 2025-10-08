'use client';

import ApiSidebar from '@/app/api-reference/components/api-sidebar';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';

export default function ApiReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex gap-4">
        <Sidebar
          collapsible="none"
          className="hidden md:block w-[16rem] shrink-0 bg-transparent border-r border-transparent"
        >
          <ApiSidebar />
        </Sidebar>

        {/* TODO: remover padding */}
        <section className="flex-1 p-4 md:p-6 flex justify-center">
          <div className="min-w-full max-w-5xl">{children}</div>
        </section>
      </div>
    </SidebarProvider>
  );
}
