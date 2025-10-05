'use client';

import Link from 'next/link';
import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  href?: string;
  items?: { label: string; href: string }[];
};

const apiNav: NavItem[] = [
  { label: 'Get Information', href: '/api-reference' },
  {
    label: 'Instances',
    items: [
      {
        label: 'Create Instance Basic',
        href: '/api-reference/instances/create',
      },
      { label: 'Fetch Instances', href: '/api-reference/instances/list' },
      { label: 'Instance Connect', href: '/api-reference/instances/connect' },
      { label: 'Restart Instance', href: '/api-reference/instances/restart' },
      { label: 'Connection State', href: '/api-reference/instances/state' },
      { label: 'Logout Instance', href: '/api-reference/instances/logout' },
      { label: 'Delete Instance', href: '/api-reference/instances/delete' },
      { label: 'Set Presence', href: '/api-reference/instances/presence' },
    ],
  },
  {
    label: 'Webhook',
    items: [
      { label: 'Set Webhook', href: '/api-reference/webhook/set' },
      { label: 'Find Webhook', href: '/api-reference/webhook/find' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Set Settings', href: '/api-reference/settings/set' },
      { label: 'Find Settings', href: '/api-reference/settings/find' },
    ],
  },
];

export default function ApiSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState<Record<string, boolean>>({});
  const isOpen = (key: string) => (key in open ? open[key] : true);
  const toggle = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !(key in prev ? prev[key] : true) }));

  return (
    <div className={cn('flex h-full w-full flex-col', className)}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Endpoints</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {apiNav.map((item) => {
                const parentActive = !!item.items?.some(
                  (sub) => sub.href === pathname
                );
                const itemActive = pathname === (item.href ?? '');
                return (
                  <SidebarMenuItem key={item.label}>
                    {item.items ? (
                      <>
                        <SidebarMenuButton
                          onClick={() => toggle(item.label)}
                          aria-expanded={isOpen(item.label)}
                          className={cn(
                            'flex items-center justify-between cursor-pointer',
                            parentActive && 'opacity-90 font-medium'
                          )}
                        >
                          <span>{item.label}</span>
                          <ChevronRight
                            className={cn(
                              'transition-transform',
                              isOpen(item.label) ? 'rotate-90' : 'rotate-0'
                            )}
                          />
                        </SidebarMenuButton>
                        {isOpen(item.label) && (
                          <SidebarMenuSub>
                            {item.items.map((sub) => (
                              <SidebarMenuSubItem key={sub.href}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === sub.href}
                                  className="cursor-pointer"
                                >
                                  <Link href={sub.href}>{sub.label}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}
                      </>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        isActive={itemActive}
                        className="cursor-pointer"
                      >
                        <Link href={item.href ?? '#'}>{item.label}</Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </div>
  );
}
