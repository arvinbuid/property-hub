import "./globals.css";
import authOptions from "../../utils/authOptions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";
import 'photoswipe/dist/photoswipe.css'

import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import { getServerSession } from "next-auth";
import { GlobalProvider } from "../../context/GlobalContext";

const fontInter = Inter({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-inter",
});

const fontSans = Raleway({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Property Hub",
  description: "Find your dream property here at Property Hub!"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontInter.variable} ${fontSans.variable} font-inter antialiased`}
      >
        <SessionProvider session={session}>
          <GlobalProvider>
            <Navbar session={session} />
            {children}
            <Toaster />
            <Footer />
          </GlobalProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
