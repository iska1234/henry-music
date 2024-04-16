import { Figtree } from 'next/font/google'
import Sidebar from '@/components/ui/sidebar/Sidebar';


const inter = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Henry Music",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col w-full h-screen gap-4 p-2 box-border`}>
        <Sidebar>
          {children}
        </Sidebar>
      </body>
    </html>
  );
}
