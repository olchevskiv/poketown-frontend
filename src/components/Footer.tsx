

type Props = {
    hideMobileFooter?: boolean;
}
const Footer = ({hideMobileFooter=false}: Props) => {
    return (
        <div className={`bg-primary py-10 mt-auto ${hideMobileFooter ? 'hidden md:block' : ''}`}>
            <div className="container mx-auto flex  flex-col md:flex-row justify-evenly py-10">
                <div className="flex flex-col md:flex-row md:gap-x-[150px] text-white w-3/4">
                    <div className="md:mb-0 mb-5">
                        <div className="text-xl mb-3">
                            ABOUT US
                        </div>
                        <ul className="text-lg">
                            <li><a href="">About</a></li>
                            <li><a href="">Locations</a></li>
                            <li><a href="">COVID Safety</a></li>
                        </ul>
                    </div>
                    <div className="md:mb-0 mb-5">
                        <div className="text-xl mb-3">
                            SOCIAL MEDIA
                        </div>
                        <ul className="text-lg">
                            <li><a href="">Instagram</a></li>
                            <li><a href="">Yelp</a></li>
                            <li><a href="">Facebook</a></li>
                        </ul>
                    </div>
                    <div className="md:mb-0 mb-5">
                        <div className="text-xl mb-3">
                            SERVICES
                        </div>
                        <ul className="text-lg">
                            <li><a href="">Catering</a></li>
                            <li><a href="">Contact Us</a></li>
                            <li><a href="">FAQs</a></li>
                            <li><a href="">Gift Cards</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-white text-2xl">
                    <span className="me-2">©2023</span>
                    <span className="tracking-wide font-bold">{import.meta.env.VITE_APP_NAME}</span>
                </div>
            </div>
        </div>
    );
}

export default Footer;