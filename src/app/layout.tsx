import { fontSans } from "~/components/ui";
import { getSEOTags, renderSchemaTags, renderOrganizationSchema } from "~/lib/seo";
import { cn } from "~/lib/utils";
import RootProviders from "~/providers";
import "~/styles/globals.css";

export const viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 3,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata = getSEOTags();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        {renderSchemaTags()}
        {renderOrganizationSchema()}

        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
