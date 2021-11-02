interface BaiduAnaly {
    trackPageview: (opts?: PageViewOptions) => void;
  }
  
  export type PageViewOptions = {
    url?: string;
    referrer?: string;
  };
  
  export type LoadOptions = {
    url?: string;
    auto?: boolean;
    includedDomains?: string[];
    excludedDomains?: string[];
    spa?: 'auto' | 'history' | 'hash';
  };
  
  type BaiduCommand =
    | { type: '_trackPageview'; opts: PageViewOptions | undefined }
  
  declare global {
    interface Window {
      baiduAnaly?: BaiduAnaly;
      _hmt: string[][];
    }
  }
  
  /**
   * Enqueues a command to dispatch to baiduAnaly when the library is loaded.
   *
   * @param command - A set of arguments to dispatch to baiduAnaly later.
   */
  const enqueue = (command: BaiduCommand): void => {
    window._hmt = window._hmt || [];
    window._hmt.push([ command.type, command.opts.url ]);
  };
  
  /**
   * Flushes the command queue.
   */
  const flushQueue = (): void => {
    window._hmt = window._hmt || [];
  };
  
  /**
   * Loops through list of domains and warns if they start with
   * http, https, http://, etc... as this does not work with the
   * baiduAnaly script.
   *
   * @param domains - List of domains to check
   */
  const checkDomainsAndWarn = (domains: string[]): void => {
    const regex = /(https?)(?=:|\/|$)/; // matches http or https followed by
    // either a : or /
    domains.forEach(domain => {
      if (regex.exec(domain) !== null)
        console.warn(
          `The include domain ${domain} might fail to work as intended as it begins with a transfer protocol (http://, https://). Consider removing the protocol portion of the string.`
        );
    });
  };
  
  export const load = (siteId: string, opts?: LoadOptions): void => {
    let tracker = document.createElement('script');
  
    tracker.id = 'baidu-script';
    tracker.async = true;
    tracker.setAttribute('data-site', siteId);
    tracker.src =
      opts && opts.url ? opts.url : `https://hm.baidu.com/hm.js?${siteId}`;
    if (opts) {
      if (opts.auto !== undefined) tracker.setAttribute('data-auto', `${opts.auto}`);
      if (opts.includedDomains) {
        checkDomainsAndWarn(opts.includedDomains);
        tracker.setAttribute('data-included-domains', opts.includedDomains.join(','));
      }
      if (opts.excludedDomains) {
        checkDomainsAndWarn(opts.excludedDomains);
        tracker.setAttribute('data-excluded-domains', opts.excludedDomains.join(','));
      }
      if (opts.spa) tracker.setAttribute('data-spa', opts.spa);
    }
    let s = document.getElementsByTagName('script')[0];
    tracker.onload = flushQueue;
    s.parentNode.insertBefore(tracker, s);
  };
  
  /**
   * Tracks a pageview.
   *
   * @param opts - An optional `url` or `referrer` to override auto-detected values.
   */
  export const trackPageview = (opts?: PageViewOptions): void => {
      enqueue({ type: '_trackPageview', opts });
  };
  