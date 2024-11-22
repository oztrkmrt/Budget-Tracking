import localFont from "next/font/local";
import "./globals.css";
import { BudgetProvider } from "./context/BudgetContext";
import AlertList from "./components/UI/AlertList";

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
          <div className="min-h-screen bg-gray-100">
            {children}
          </div>
        </BudgetProvider>
      </body>
    </html>
  );
}
