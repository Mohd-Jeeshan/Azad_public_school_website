import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import News from '@/components/News';
import Teachers from '@/components/Teachers';
import Results from '@/components/Results';
import AdmissionForm from '@/components/AdmissionForm';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <News />
      <Teachers />
      <Results />
      <AdmissionForm />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
