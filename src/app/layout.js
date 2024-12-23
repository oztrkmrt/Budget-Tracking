import localFont from "next/font/local";
import "./globals.css";
import { BudgetProvider } from "./context/BudgetContext";
import AlertList from "./components/UI/AlertList";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Bütçe Takip",
  description: "Kişisel gelir ve giderlerinizi takip edin.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="light">
      <body className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <BudgetProvider>
            <AlertList />
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </BudgetProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
