import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/nav-bar";
import { Toaster } from 'react-hot-toast';
import { NotificationProvider } from '@/context/notification-context';
import { ThemeProvider } from "@/providers/theme-provider";
import Script from "next/script";
import { PaymentProvider } from '@/context/payment-context';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: 'RideSync',
  description: 'Book your ride instantly',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.mapbox.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://events.mapbox.com" crossOrigin="anonymous" />
        <link rel="preconnect" href={`https://clerk.${process.env.NEXT_PUBLIC_CLERK_DOMAIN}`} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.mapbox.com" />
        <link rel="dns-prefetch" href={`https://clerk.${process.env.NEXT_PUBLIC_CLERK_DOMAIN}`} />
        <Script
          strategy="beforeInteractive"
          src={`https://clerk.${process.env.NEXT_PUBLIC_CLERK_DOMAIN}/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground`}>
        <PaymentProvider>
          <ClerkProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NotificationProvider>
                <div className="flex flex-col min-h-screen dark:bg-gray-900 transition-colors duration-200">
                  <Navbar />
                  <main className="flex-1">
                    {children}
                  </main>
                </div>
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    className: 'dark:bg-gray-800 dark:text-white',
                    style: {
                      background: 'var(--toast-bg)',
                      color: 'var(--toast-color)',
                    },
                    success: {
                      iconTheme: {
                        primary: '#22c55e',
                        secondary: 'var(--toast-color)',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: '#ef4444',
                        secondary: 'var(--toast-color)',
                      },
                    },
                  }}
                />
              </NotificationProvider>
            </ThemeProvider>
          </ClerkProvider>
        </PaymentProvider>
      </body>
    </html>
  );
}
