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
  
  export const load = (siteId: string, opts?: LoadOptions): void => {
    let tracker = document.createElement('script');  
    tracker.src =`https://hm.baidu.com/hm.js?${siteId}`;
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
  