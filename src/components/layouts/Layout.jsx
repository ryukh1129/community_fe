import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
            <Header />
                <main className="flex-grow overflow-y-auto">
                    <div className="container mx-auto p-4">
                        {children}
                    </div>
                </main>
            <Footer />
        </div>
    );
}

export default Layout;