import Footer from "../components/Footer";
import Features from "../components/Features";
import Demo from "../components/Demo";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

function Landing() {
  return (
    <>
    <Navbar/>
      <Hero />
      <Demo />
      <Features />
      <Footer />
    </>
   
  );
}

export default Landing;
