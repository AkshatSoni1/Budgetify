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