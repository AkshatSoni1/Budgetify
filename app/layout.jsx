import Navbar from '@/components/Navbar';
import AppState from '@/context/AppContext/page';
import '@/styles/globals.css'
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Budgetify",
    description: "A useful budget app to track your spends on your certain needs",
};

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <head>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <meta name="theme-color" content="#ffffff" />
            </head>

            <body className={`${inter.className} bg-gray-200 `}>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <AppState >
                    <div className="main">
                    <Navbar />
                    <main className=''>
                        {children}
                    </main>
                    </div>
                </AppState>
            </body>
        </html>
    )
}

export default RootLayout;