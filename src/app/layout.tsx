import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <nav className="p-4 border-b mb-4 flex gap-4">
            <Link href="/">Главная</Link>
            <Link href="/favorites">Избранное</Link>
          </nav>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
