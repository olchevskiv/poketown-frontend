import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Props = {
  fullPage?: boolean;
  children: React.ReactNode;
}

const Layout = ({children, fullPage=false}: Props) => {
  return (
    <div>
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="my-0 ">
                {
                  fullPage ? (
                    <div>{children}</div>
                  ) : (
                    <div className = "container py-10">{children}</div>
                  )
                }
               
            </div>
        </div>
        <Footer />
    </div>
  )
};

export default Layout;