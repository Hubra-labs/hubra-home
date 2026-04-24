import "server-only";

import { siteConfig } from "@/config/site";

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hubra",
  "alternateName": "Hubra App",
  "description":
    "Hubra is the Solana all-in-one portal — as simple as a CEX, with Horus, Hubra's AI financial agent, built in. Track tokens, stake SOL, explore DeFi, and analyze markets in one app. Tell Horus what you want — swap, stake, set alerts, rebalance — and it executes. You always sign.",
  "url": siteConfig.domain,
  "logo": `/logo.png`,
  "foundingDate": "2021",
  "areaServed": "Worldwide",
  "knowsAbout": [
    "Solana all-in-one portal",
    "Solana crypto aggregator",
    "Horus — AI financial agent on Solana",
    "Conversational AI for crypto and DeFi",
    "Natural language trading and swaps",
    "AI-powered DCA and limit orders",
    "AI yield and portfolio rebalancing",
    "AI price alerts and risk monitoring",
    "Solana blockchain",
    "Solana validators",
    "Solana staking",
    "Liquid staking",
    "DeFi protocols",
    "DeFi yield farming",
    "Perpetual futures on Solana",
    "Earning crypto",
    "Wallet portfolio tracking",
    "Portfolio management",
    "Cryptocurrency analytics",
    "Token tracking",
    "Market data",
    "Trading analytics",
    "Blockchain technology",
    "Validator performance",
    "CEX-grade user experience",
  ],
  "sameAs": ["https://twitter.com/hubraApp"],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "url": siteConfig.domain,
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1000+",
  },
} as const;

export const ORGANIZATION_JSON_LD_STRING = JSON.stringify(ORGANIZATION_JSON_LD);

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hubra",
    "description":
      "Hubra is the Solana all-in-one portal — track tokens, stake SOL, explore DeFi, and analyze markets with a CEX-grade experience. Horus, Hubra's AI financial agent, is built in: talk to it in plain English and it executes — swaps, staking, DCA, limit orders, alerts, transfers, rebalancing. You sign, always.",
    "url": siteConfig.domain,
    "about": {
      "@type": "Blockchain",
      "name": "Solana",
      "description":
        "Solana blockchain ecosystem — validators, staking, DeFi protocols, perpetuals, and token analytics — aggregated in one portal with Horus, Hubra's AI financial agent, built in.",
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.domain}/tokens`,
      },
    },
  };
}

export const WEBSITE_JSON_LD_STRING = JSON.stringify(getWebsiteJsonLd());

export const TOKEN_ANALYTICS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Token Analytics",
  "description":
    "Solana token analytics — real-time price, market data, volume, and holders. Ask Horus, Hubra's AI financial agent, for insights, risk checks, or to execute swaps, DCA, and limit orders directly from the chat.",
  "provider": {
    "@type": "Organization",
    "name": "Hubra",
    "url": siteConfig.domain,
  },
  "category": "Cryptocurrency",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
  },
} as const;

export const TOKEN_ANALYTICS_JSON_LD_STRING = JSON.stringify(TOKEN_ANALYTICS_JSON_LD);

export const WEB_APPLICATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Hubra",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "description":
    "Hubra is the Solana all-in-one portal — tokens, DeFi, staking, and markets with CEX-grade simplicity, plus Horus, Hubra's AI financial agent. Tell Horus what you want in plain English and it executes: swaps via Jupiter, DCA, limit orders, staking, perpetuals, price alerts, transfers, and portfolio rebalancing. Non-custodial, gasless, user always signs.",
  "offers": {
    "@type": "Offer",
    "name": "Hubra Solana Portal + Horus AI Agent",
    "description":
      "Free access to Hubra's Solana aggregator — token tracking, DeFi analytics, liquid staking, perpetuals, and portfolio tools — plus Horus, Hubra's conversational AI financial agent. Non-custodial, gasless, user always signs.",
    "url": "https://hubra.app",
    "price": "0",
    "priceCurrency": "USD",
  },
  "featureList": [
    "All-in-one Solana portal: tokens, DeFi, staking, perpetuals, and markets",
    "CEX-grade simplicity with self-custody",
    "Liquid staking with instant unstake",
    "Gasless transactions",
    "Real-time token analytics and DeFi TVL rankings",
    "Horus — conversational AI financial agent on Solana",
    "Natural-language swaps with Jupiter route optimization",
    "AI-driven DCA, limit orders, and portfolio rebalancing",
    "AI price alerts (checked every 2 minutes, up to 10 active)",
    "AI-assisted perpetual trading on SOL, BTC, and ETH",
    "Memory across sessions — Horus remembers your goals and preferences",
    "Non-custodial — your keys, always. Every action requires your signature.",
  ],
} as const;

export const WEB_APPLICATION_JSON_LD_STRING = JSON.stringify(WEB_APPLICATION_JSON_LD);

const breadcrumbCache = new Map<string, string>();

export function getBreadcrumbJsonLd(items: Array<{ name: string; url: string }>): object {
  const cacheKey = items.map((item) => item.url).join("|");

  if (breadcrumbCache.has(cacheKey)) {
    return JSON.parse(breadcrumbCache.get(cacheKey)!);
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };

  const stringified = JSON.stringify(breadcrumb);

  breadcrumbCache.set(cacheKey, stringified);

  return breadcrumb;
}

export function getBreadcrumbJsonLdString(items: Array<{ name: string; url: string }>): string {
  const cacheKey = items.map((item) => item.url).join("|");

  if (breadcrumbCache.has(cacheKey)) {
    return breadcrumbCache.get(cacheKey)!;
  }

  const breadcrumb = getBreadcrumbJsonLd(items);
  const stringified = JSON.stringify(breadcrumb);

  breadcrumbCache.set(cacheKey, stringified);

  return stringified;
}

export const COMMON_BREADCRUMBS = {
  home: getBreadcrumbJsonLdString([{ name: "Home", url: siteConfig.domain }]),
  tokens: getBreadcrumbJsonLdString([
    { name: "Home", url: siteConfig.domain },
    { name: "Tokens", url: `${siteConfig.domain}/tokens` },
  ]),
  defi: getBreadcrumbJsonLdString([
    { name: "Home", url: siteConfig.domain },
    { name: "DeFi", url: `${siteConfig.domain}/defi` },
  ]),
  blog: getBreadcrumbJsonLdString([
    { name: "Home", url: siteConfig.domain },
    { name: "Blog", url: `${siteConfig.domain}/blog` },
  ]),
  stats: getBreadcrumbJsonLdString([
    { name: "Home", url: siteConfig.domain },
    { name: "Stats", url: `${siteConfig.domain}/stats` },
  ]),
} as const;

export function getCollectionPageJsonLd(
  name: string,
  description: string,
  numberOfItems: number,
  items?: Array<{ name: string; url: string }>
) {
  const collection: any = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    numberOfItems,
  };

  if (items && items.length > 0) {
    collection.mainEntity = {
      "@type": "ItemList",
      "numberOfItems": items.length,
      "itemListElement": items.slice(0, 10).map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "FinancialProduct",
          "name": item.name,
          "url": item.url,
        },
      })),
    };
  }

  return collection;
}

export function getWebPageJsonLd(name: string, description: string, url: string, breadcrumbItems?: Array<{ name: string; url: string }>) {
  const webpage: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    "isPartOf": {
      "@type": "WebSite",
      "name": siteConfig.name,
      "url": siteConfig.domain,
    },
  };

  if (breadcrumbItems && breadcrumbItems.length > 0) {
    webpage.breadcrumb = getBreadcrumbJsonLd(breadcrumbItems);
  }

  return webpage;
}

export function getFinancialProductJsonLd(token: {
  name: string;
  symbol: string;
  price: number;
  marketCap?: number;
  volume24h?: number;
  priceChange24h?: number;
  holders?: number;
  logoURI?: string;
  description?: string;
  url: string;
}) {
  const enhancedDescription =
    token.description ||
    `${token.name} (${token.symbol}) is a cryptocurrency token on the Solana blockchain. Track real-time price, market cap, volume, price changes, and holders on Hubra — the Solana all-in-one portal. Ask Horus, Hubra's AI financial agent, to analyze ${token.symbol}, set a price alert, swap into or out of it, or schedule a DCA.`;

  const product: any = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": token.name,
    "alternateName": token.symbol,
    "description": enhancedDescription,
    "image": token.logoURI || "/image/token.svg",
    "brand": {
      "@type": "Brand",
      "name": "Solana",
      "description": "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale today.",
    },
    "category": "Cryptocurrency",
    "about": {
      "@type": "Blockchain",
      "name": "Solana",
      "description": "Solana blockchain ecosystem",
    },
    "offers": {
      "@type": "Offer",
      "price": token.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": token.url,
      "priceValidUntil": new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
  };

  const additionalProperties = [];

  if (token.symbol) {
    additionalProperties.push({
      "@type": "PropertyValue",
      "name": "Symbol",
      "value": token.symbol,
    });
  }
  if (token.marketCap !== undefined) {
    additionalProperties.push({
      "@type": "PropertyValue",
      "name": "Market Cap",
      "value": token.marketCap,
    });
  }
  if (token.volume24h !== undefined) {
    additionalProperties.push({
      "@type": "PropertyValue",
      "name": "24h Volume",
      "value": token.volume24h,
    });
  }
  if (token.priceChange24h !== undefined) {
    additionalProperties.push({
      "@type": "PropertyValue",
      "name": "24h Change",
      "value": `${token.priceChange24h.toFixed(2)}%`,
    });
  }
  if (token.holders !== undefined) {
    additionalProperties.push({
      "@type": "PropertyValue",
      "name": "Holders",
      "value": token.holders,
    });
  }

  if (additionalProperties.length > 0) {
    product.additionalProperty = additionalProperties;
  }

  return product;
}

export function getFAQPageJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function getEnhancedArticleJsonLd(article: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  publisherName?: string;
  publisherLogo?: string;
  keywords?: string[];
  articleSection?: string;
  url: string;
  wordCount?: number;
  inLanguage?: string;
  about?: Array<{ "@type": string; "name": string }>;
  mentions?: Array<{ "@type": string; "name": string }>;
}) {
  const articleJsonLd: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.author || "Hubra Team",
    },
    "publisher": {
      "@type": "Organization",
      "name": article.publisherName || siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": article.publisherLogo || `${siteConfig.domain}/logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url,
    },
    "inLanguage": article.inLanguage || "en-US",
    "citation": article.url,
  };

  if (article.image) {
    articleJsonLd.image = {
      "@type": "ImageObject",
      "url": article.image,
      "width": 1200,
      "height": 630,
    };
  }

  if (article.keywords && article.keywords.length > 0) {
    articleJsonLd.keywords = Array.isArray(article.keywords) ? article.keywords.join(", ") : article.keywords;
  }

  if (article.articleSection) {
    articleJsonLd.articleSection = article.articleSection;
  }

  if (article.wordCount) {
    articleJsonLd.wordCount = article.wordCount;
  }

  if (article.about && article.about.length > 0) {
    articleJsonLd.about = article.about;
  }

  if (article.mentions && article.mentions.length > 0) {
    articleJsonLd.mentions = article.mentions;
  }

  return articleJsonLd;
}

export function getDatasetJsonLd(dataset: {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
  creator?: {
    name: string;
    url?: string;
  };
  datePublished?: string;
  dateModified?: string;
  license?: string;
  distribution?: Array<{
    contentType: string;
    encodingFormat: string;
    url: string;
  }>;
}) {
  const datasetJsonLd: any = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": dataset.name,
    "description": dataset.description,
    "url": dataset.url,
  };

  if (dataset.keywords && dataset.keywords.length > 0) {
    datasetJsonLd.keywords = dataset.keywords.join(", ");
  }

  if (dataset.creator) {
    datasetJsonLd.creator = {
      "@type": "Organization",
      "name": dataset.creator.name,
      "url": dataset.creator.url || siteConfig.domain,
    };
  }

  if (dataset.datePublished) {
    datasetJsonLd.datePublished = dataset.datePublished;
  }

  if (dataset.dateModified) {
    datasetJsonLd.dateModified = dataset.dateModified;
  }

  if (dataset.license) {
    datasetJsonLd.license = dataset.license;
  }

  if (dataset.distribution && dataset.distribution.length > 0) {
    datasetJsonLd.distribution = dataset.distribution.map((dist) => ({
      "@type": "DataDownload",
      "contentType": dist.contentType,
      "encodingFormat": dist.encodingFormat,
      "contentUrl": dist.url,
    }));
  }

  return datasetJsonLd;
}
