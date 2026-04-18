import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "TravelTrucks",
  description:
    "Campers of your dreams, You can find everything you want in our catalog",
  openGraph: {
    title: "Campers of your dreams",
    description:
      "Campers of your dreams, You can find everything you want in our catalog",
    url: "url",
    images: [
      {
        url: "truckUrl",
        width: 1200,
        height: 630,
        alt: "Truck",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanStackProvider>
      <html lang="en" className={`${inter.className} ${inter.variable}`}>
        <body>
          <Header />
          <main>{children}</main>
          <Toaster position="top-center" reverseOrder={false} />
        </body>
      </html>
    </TanStackProvider>
  );
}
