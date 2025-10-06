'use client';

import ApiSidebar from '@/components/api-sidebar';
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
          className="hidden md:block w-[16rem] shrink-0 bg-transparent border-r border-sidebar-border"
        >
          <ApiSidebar />
        </Sidebar>

        <section className="flex-1 p-4 md:p-6">{children}</section>
      </div>
    </SidebarProvider>
  );
}
