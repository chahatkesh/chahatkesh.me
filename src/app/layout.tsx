import { fontSans, fontPoem, fontUbuntu } from "~/components/ui";
import config from "~/config";
import ThemeLamp from "~/components/layout/theme-lamp";
import { themeBootstrap } from "~/lib/color-scheme";
import { getSEOTags, renderSchemaTags } from "~/lib/seo";
import { cn } from "~/lib/utils";
import RootProviders from "~/providers";
import "~/styles/globals.css";
import { GoogleAnalytics, MicrosoftClarity } from "~/components/analytics";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 3,
  userScalable: true,
};

export const metadata = getSEOTags();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta name="theme-color" content="#000000" suppressHydrationWarning />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="describedby"
          href={`https://${config.domainName}/llms.txt`}
          type="text/markdown"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontPoem.variable,
          fontUbuntu.variable,
        )}
      >
        {renderSchemaTags()}
        <GoogleAnalytics />
        <MicrosoftClarity />

        <RootProviders>{children}</RootProviders>
        <ThemeLamp />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
