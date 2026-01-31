import { useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export function useAnalytics() {
  const [location] = useLocation();
  const trackMutation = trpc.analytics.trackPageview.useMutation();

  useEffect(() => {
    // Não rastrear páginas do admin
    if (location.includes("/admin-la-educacao")) {
      return;
    }

    // Registrar visualização da página
    trackMutation.mutate({
      path: location,
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
    });
  }, [location]);
}
