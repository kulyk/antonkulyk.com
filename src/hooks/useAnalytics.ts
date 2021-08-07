import {useRouter} from 'next/router';
import {useEffect} from 'react';
import * as Fathom from 'fathom-client';

const Config = {
  siteId: process.env.NEXT_PUBLIC_ANALYTICS_ID as string,
  domains: process.env.NEXT_PUBLIC_ANALYTICS_DOMAINS?.split(','),
};

export const useAnalytics = (): void => {
  const router = useRouter();

  useEffect(() => {
    Fathom.load(Config.siteId, {
      includedDomains: Config.domains,
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
