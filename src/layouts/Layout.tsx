import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Props = {
  fullPage?: boolean;
  hideMobileFooter?: boolean;
  children: React.ReactNode;
}

const Layout = ({children, fullPage=false, hideMobileFooter=false}: Props) => {
  return (
    <div>
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="my-0 ">
                {
                  fullPage ? (
                    <div>{children}</div>
                  ) : (
                    <div className = "container py-1 px-3 md:px-10 md:py-10">{children}</div>
                  )
                }
               
            </div>
        </div>
          <Footer hideMobileFooter={hideMobileFooter} />
    </div>
  )
};

export default Layout;