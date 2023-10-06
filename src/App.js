import './App.css';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import './styles/Home.css'
import Section from './components/Section';

function App() {
  return (
    <div className='homeContainer'>
    <NavBar/>
    <Section/>
    <Footer/>
    </div>
  );
}

export default App;
