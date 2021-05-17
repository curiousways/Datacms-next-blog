import { Children } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div>
      <div className="p-10 lg:py-20 xl:max-w-screen-xl lg:mx-auto">
        <Nav />
        {children}
      </div>
      <Footer />
    </div>
  );
}
