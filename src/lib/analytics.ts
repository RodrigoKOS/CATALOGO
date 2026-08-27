// Placeholder para GA4 / GTM — sem IDs reais
export function track(event: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    // GTM dataLayer
    // @ts-expect-error dataLayer
    window.dataLayer = window.dataLayer || [];
    // @ts-expect-error push
    window.dataLayer.push({ event, ...data });
    // console em dev
    if (process.env.NODE_ENV === "development") {
      console.debug("[analytics]", event, data);
    }
  }
}
