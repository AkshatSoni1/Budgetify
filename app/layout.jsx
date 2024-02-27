import Navbar from '@/components/Navbar';
import AppState from '@/context/AppContext/page';
import '@/styles/globals.css'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Budgetify",
    description: "A useful budget app to track your spends on your certain needs",
  };

const RootLayout = ({children}) => {
    return(
        <html>
            <body className={`${inter.className} bg-gray-200 `}>
                <AppState >
                    <Navbar />
                    <main className=''>
                        {children}
                    </main>
                </AppState>
            </body>
        </html>
    )
}

export default RootLayout;