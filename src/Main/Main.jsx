import { Routes, Route } from "react-router-dom";
import Cards from "./Cards";
import Form from "./Form";
import Ratings from "./Ratings";
import { useRef } from "react";

function Main() {
  const mainRef = useRef(null);
  return (
  <div className="main">
    <div className="main-container" ref={mainRef}>
    <Routes>
      <Route path='/'element={ <Cards mainRef={mainRef}/>}/>
      <Route path='/form'element={ <Form/>}/>
      <Route path='/ratings'element={ <Ratings/>}/>
    </Routes>
   
    </div>
  </div>
  )
}

export default Main;
