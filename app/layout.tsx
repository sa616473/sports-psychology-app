import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserInputProvider } from "./components/UserInputContext";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talk to your Favorite player",
  description: "Talk to professional tennis players!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <UserInputProvider>
          {children}
        </UserInputProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
