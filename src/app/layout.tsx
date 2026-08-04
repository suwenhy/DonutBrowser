import "@/styles/globals.css";
import "flag-icons/css/flag-icons.min.css";
import { ClientProviders } from "@/components/client-providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-hidden bg-background antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
