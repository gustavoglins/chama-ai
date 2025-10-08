'use client';

import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import DocsSidebar from './components/docs-sidebar';
import OnThisPage from './components/on-this-page';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="w-full">
        <div className="grid w-full gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,1fr)_14rem]">
          <aside className="hidden lg:block">
            <div className="sticky top-[7.5rem] h-[calc(100vh-7.5rem)] overflow-hidden">
              <Sidebar
                collapsible="none"
                className="h-full w-full border-transparent bg-transparent"
              >
                <DocsSidebar />
              </Sidebar>
            </div>
          </aside>

          <div className="min-w-0 px-4 md:px-6">
            <article
              id="docs-content"
              className="mx-auto w-full max-w-5xl py-6 [&_h1]:scroll-mt-32 [&_h2]:scroll-mt-32 [&_h3]:scroll-mt-32 [&_h4]:scroll-mt-32 [&_h5]:scroll-mt-32 [&_h6]:scroll-mt-32"
            >
              {children}
            </article>
          </div>

          <aside className="hidden xl:block w-[14rem] shrink-0">
            <div className="sticky top-[7.5rem] h-[calc(100vh-7.5rem)] overflow-hidden">
              <OnThisPage />
            </div>
          </aside>
        </div>
      </div>
    </SidebarProvider>
  );
}
