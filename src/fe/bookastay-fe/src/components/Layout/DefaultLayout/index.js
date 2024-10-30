import Header from "../components/Header";
import Footer from "./Footer";

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
