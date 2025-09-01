import './App.css'
import Footer from "./components/Footer/Footer.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Header from "./components/Header/Header.jsx";
import Users from "./components/Users/Users.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Form from "./components/Form/Form.jsx";
import {UsersProvider} from "./context.jsx";
import Preloader from "./components/Preloader/Preloader.jsx";


function App() {

    return (
        <>
            <Header/>
            <Layout>
                <Hero/>
                <UsersProvider>
                    <Users/>
                    <Form/>
                </UsersProvider>

            </Layout>
            {/*<Footer />*/}
        </>
    )
}

export default App
