import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";
import Nav from "@/components/Nav";
import Copyright from "@/components/Copyright";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://app.beelinked.eu"),
  title: "Tidning - Cloud",
  description: "Tidning Cloud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={cn("min-h-screen antialiased", fontSans.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main className="flex flex-col w-full py-20 px-2 xl:px-8 m-auto min-h-screen">
            {children}
            <Copyright />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
