"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider } from "react-redux";
import { store } from "./store";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <AntdRegistry>
            <div className="w-full flex place-content-center items-center">
              <div className="w-[1280px] h-[64px]  flex items-center text-xl font-bold text-primary">
                Uygun Sistem
              </div> 
            </div>
            <div className="flex place-content-center w-full min-h-screen">
              <div className="w-[1280px] my-4 rounded-lg bg-w">{children}</div>
            </div>
          </AntdRegistry>
        </Provider>
      </body>
    </html>
  );
}
