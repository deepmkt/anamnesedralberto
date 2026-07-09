"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { captureUtms } from "@/lib/track";

/**
 * O erro clássico do Pixel em SPA: o PageView só dispara no primeiro load.
 * Aqui ele dispara em TODA mudança de rota.
 */
export default function PixelPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureUtms();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "PageView");
      }
    }, 300);
    return () => clearTimeout(t);
  }, [pathname, searchParams]);

  return null;
}
