import Header from "../../Components/Header";
import Hero from "../../Components/Hero";
import Highlights from "../../Components/Highlights";
import Testimonials from "../../Components/Testimonials";
import About from "../../Components/About";
import Footer from "../../Components/Footer";

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Testimonials />
        <About />
      </main>
      <Footer/>
    </>
  );
}

export default Home;
