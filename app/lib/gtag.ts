export const GA_MEASUREMENT_ID = "G-LQDNZRTPEM"; // replace with your ID later

// Pageview tracking
export const pageview = (url: string) => {
    // @ts-ignore
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Event tracking
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
    // @ts-ignore
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};