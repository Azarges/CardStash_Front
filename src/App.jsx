import Header from "./components/Header";
import AuthProvider from "./components/providers/AuthProvider";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col justify-between w-full min-h-screen bg-[url('/bg.png')] bg-cover bg-center">
      <AuthProvider>
        <Header />
        {/* <div className="flex flex-col items-center justify-center flex-1 w-full"> */}
        <Outlet />
        {/* </div> */}
        <Footer />
      </AuthProvider>
      <Toaster />
    </div>
  );
}

export default App;
