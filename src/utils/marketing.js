/* src/utils/marketing.js */
export const captureUTMs = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const utms = {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_content: urlParams.get('utm_content'),
    utm_term: urlParams.get('utm_term'),
    gclid: urlParams.get('gclid'),
    fbclid: urlParams.get('fbclid'),
    page_url: window.location.href
  };

  // Si hay alguna UTM, la guardamos en la sesión
  if (utms.utm_source || utms.gclid || utms.fbclid) {
    sessionStorage.setItem('itopy_marketing', JSON.stringify(utms));
  }
};

export const getStoredUTMs = () => {
  const stored = sessionStorage.getItem('itopy_marketing');
  return stored ? JSON.parse(stored) : {};
};
