'use client';

import { useEffect, useState } from 'react';

export function CurrentTime() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setTime(`${timeString} BRT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm text-muted-foreground mr-2 tabular-nums">
      {time || '00:00 BRT'}
    </div>
  );
}
