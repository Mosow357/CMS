import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'es';

  return {
    locale,
    // Load the TS modules we keep in `web/i18n` (en.ts / es.ts)
    messages: (await import(`../i18n/${locale}`)).default
  };
});
