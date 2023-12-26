import type { Metadata } from "next";
import { inter } from "@/app/ui/styles/fonts";
import SessionProvider from "@/context/SessionAuthProvider";
import '@/app/ui/styles/globals.css'
import Header from "@/app/ui/components/containers/Header";
import Foother from "@/app/ui/components/containers/foother";

export const metadata: Metadata = {
  title: "Store",
  description: "Store App Nextjs 14",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en" >
        <head>
        </head>
        <body className={`${inter.className} antialiased bg-color5 text-color3`}>
          <div>
            <Header />
            {children}
          </div>
          <div>
            <Foother />
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
