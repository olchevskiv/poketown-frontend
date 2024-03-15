import Footer from "@/components/Footer";
import Header from "@/components/Header";


type Props = {
  children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <div className="mx-auto my-0 ">
            <div className = "container py-10">{children}</div>
        </div>
        <Footer />
    </div>
  )
};

export default Layout;