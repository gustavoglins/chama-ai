'use client';

import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from '@/components/docs-sidebar';
import DocOverviewPage from './overview/page';

export default function DocsPage() {
  return (
    <SidebarProvider>
      <div className="flex gap-4 w-full">
        <Sidebar
          collapsible="none"
          className="hidden md:block w-[16rem] shrink-0 bg-transparent border-r border-sidebar-border"
        >
          <DocsSidebar />
        </Sidebar>

        <section className="flex-1 p-4 md:p-6">
          <DocOverviewPage />
        </section>
      </div>
    </SidebarProvider>
  );
}
