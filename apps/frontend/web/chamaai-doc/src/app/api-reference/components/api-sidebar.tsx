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
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  href?: string;
  items?: { label: string; href: string }[];
};

type ApiNavSection = {
  sectionTitle: string;
  items: NavItem[];
};

const apiNav: ApiNavSection[] = [
  {
    sectionTitle: 'Start',
    items: [
      { label: 'Get Information', href: '/api-reference/get-information' },
    ],
  },
  {
    sectionTitle: 'Services',
    items: [
      {
        label: 'User Service',
        items: [
          {
            label: 'User Signup',
            href: '/api-reference/user-service/signup',
          },
        ],
      },
      {
        label: 'Auth Service',
        items: [
          {
            label: 'Gen OTP',
            href: '/api-reference/auth-service#gen-otp',
          },
          {
            label: 'Validate OTP',
            href: '/api-reference/auth-service#validate-otp',
          },
        ],
      },
      {
        label: 'Notification Service',
        items: [
          {
            label: 'Send Email',
            href: '/api-reference/notification-service#send-email',
          },
        ],
      },
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
        {apiNav.map((section) => (
          <SidebarGroup key={section.sectionTitle}>
            <SidebarGroupLabel>{section.sectionTitle}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
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
        ))}
      </SidebarContent>
    </div>
  );
}
