'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MapPin, Plus, Settings2 } from 'lucide-react';

export type Address = {
  id: string;
  label: string; // ex: "Casa", "Trabalho"
  line: string; // ex: "Rua Bronze, 57"
};

export type AddressSwitcherProps = {
  addresses?: Address[];
  value?: string; // id selecionado
  onChange?: (id: string) => void;
};

export function AddressSwitcher({
  addresses,
  value,
  onChange,
}: AddressSwitcherProps) {
  const defaultAddresses: Address[] = useMemo(
    () => [
      { id: 'home', label: 'Casa', line: 'Rua Bronze, 57' },
      { id: 'work', label: 'Trabalho', line: 'Av. Central, 1020' },
      { id: 'studio', label: 'Estúdio', line: 'Rua das Flores, 88' },
    ],
    []
  );

  const items = addresses?.length ? addresses : defaultAddresses;
  const [selected, setSelected] = useState<string>(value ?? items[0]?.id ?? '');
  const current = items.find((i) => i.id === selected) ?? items[0];

  function select(id: string) {
    setSelected(id);
    onChange?.(id);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="xs">
          <MapPin className="mr-1 h-4 w-4" />
          {current?.line ?? 'Selecionar endereço'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Endereços</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((addr) => (
          <DropdownMenuItem
            key={addr.id}
            onClick={() => select(addr.id)}
            className="flex items-start gap-2"
          >
            <div className="mt-0.5">
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium leading-none">
                {addr.label}
              </div>
              <div className="text-xs text-muted-foreground">{addr.line}</div>
            </div>
            {selected === addr.id && (
              <span className="ml-2 text-xs text-primary">Atual</span>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            /* TODO: abrir modal add endereco */
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar endereço
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            /* TODO: abrir configuracoes */
          }}
        >
          <Settings2 className="mr-2 h-4 w-4" />
          Gerenciar endereços
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
