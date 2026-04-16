/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useRef } from "react";

interface SmartAdProps {
  slot: string;
  client: string;
  format?: "auto" | "fluid";
}

export default function SmartAd({ slot, client, format = "auto" }: SmartAdProps) {
  const [adStatus, setAdStatus] = useState<"loading" | "success" | "failed">("loading");
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle is injected by Google Ads script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      
      // Check if ad actually rendered after 2.5 seconds
      const checkTimer = setTimeout(() => {
        if (adRef.current && adRef.current.offsetHeight === 0) {
          setAdStatus("failed");
        } else {
          setAdStatus("success");
        }
      }, 2500);

      return () => clearTimeout(checkTimer);
    } catch (e) {
      setAdStatus("failed");
    }
  }, []);

  return (
    <div className="my-12 w-full">
      {adStatus === "failed" ? (
        // FALLBACK: A "nice" alternative if ads are blocked
        <div className="border border-slate-800 bg-slate-900/50 p-6 rounded-lg text-center font-mono">
          <p className="text-accent text-xs uppercase tracking-widest mb-2">Technical Insight</p>
          <p className="text-slate-400 text-sm">
            Ads are blocked, but my code isn&apos;t. Check out my 
            <a href="https://github.com/ryanmusuka" className="text-white hover:text-accent ml-1 underline decoration-accent/30">
              latest repositories →
            </a>
          </p>
        </div>
      ) : (
        <div className={adStatus === "loading" ? "opacity-0" : "opacity-100 transition-opacity"}>
           <p className="text-[10px] font-mono text-slate-600 mb-2 uppercase tracking-tighter">System Advertisement</p>
           <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        </div>
      )}
    </div>
  );
}