import '@/styles/reset.scss';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/router';

import { GNB_REQUIRES, SIDE_NAV_MENU_REQUIRES } from '@/constants/index';
import GlobalNavigationBar from '@/components/GlobalNavigationBar/GlobalNavigationBar';
import Footer from '@/components/Footer/Footer';
import SideNavigationMenuLayout from '@/pageLayouts/commonLayouts/SideNavigationMenuLayout/SideNavigationMenuLayout';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const checkRouteInGNB = GNB_REQUIRES.includes(router.pathname);
  const checkRouteInSideNavMenu = SIDE_NAV_MENU_REQUIRES.includes(router.pathname);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  const contentStyle = checkRouteInGNB ? { marginTop: '7rem' } : {};

  return (
    <QueryClientProvider client={queryClient}>
      <div id="wrapper">
        <div id="modal-root" />
        {checkRouteInGNB && <GlobalNavigationBar />}
        <div id="contentWrapper" style={contentStyle}>
          {checkRouteInSideNavMenu ? (
            <SideNavigationMenuLayout>
              <Component {...pageProps} />
            </SideNavigationMenuLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </div>
        {checkRouteInGNB && <Footer />}
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
