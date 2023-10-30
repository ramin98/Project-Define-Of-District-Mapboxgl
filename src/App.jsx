import { useRef } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main/Main';

function App() {
  let app = useRef(null)
  return (
    <div ref={app} className="App">
      <Header app={app}/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
