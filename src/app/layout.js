import localFont from "next/font/local";
import "./globals.css";
import { BudgetProvider } from "./context/BudgetContext";
import AlertList from "./components/UI/AlertList";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

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
    <html lang="tr">
      <body>
        <BudgetProvider>
          <AlertList />
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </BudgetProvider>
      </body>
    </html>
  );
}
