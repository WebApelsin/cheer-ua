import Provider from "./provider";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
    subsets: ["latin", "cyrillic-ext"],
    display: "swap",
    variable: "--font-inter"
});

import "@radix-ui/themes/styles.css";
import "@/styles/common.css";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app"
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.variable}>
            <body>
                <Provider>
                    {children}
                </Provider>
            </body>
        </html>
    );
}