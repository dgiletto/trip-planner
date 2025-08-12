import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import Provider from "./provider";

const poppins=Poppins({weight: '400', subsets:['latin']})

export const metadata: Metadata = {
  title: "AI Trip Planner",
  description: "Relax on your vacations by letting AI do all the planning for you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
