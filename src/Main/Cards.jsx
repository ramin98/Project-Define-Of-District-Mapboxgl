import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../store/fetchs";
import { Link } from "react-router-dom";

function Cards({mainRef}) {
  const [page, setPage] = useState(1);
  const [allCards, setAllCards] = useState([]);
  
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.objects.cards);
    
    
    useEffect(() => {
      dispatch(fetchCards());
    }, [dispatch, page]);
  
    useEffect(() => {
      setAllCards((prevCards) => [
        ...prevCards,
        ...cards.slice((page - 1) * 20, page * 20),
      ]);
    }, [cards,page]);
  
    useEffect(() => {
      const mainElement = mainRef.current;
      function handleScroll() {
        
        if (!mainElement) return;
  
        if (
          Math.floor(mainElement.offsetHeight + mainElement.scrollTop) !==
          mainElement.scrollHeight
        )
          return;
  
        setPage((prevPage) => prevPage + 1);
      }
  
      mainElement && mainElement.addEventListener("scroll", handleScroll);
      
      return () => {
        mainElement && mainElement.removeEventListener("scroll", handleScroll);
      };
    }, [mainRef]);
  
  return (
    <div className="cards">
      <div className="cards-container">
      <ul>
        <li className="add-form">
          <Link to="/form">
            <p>+</p>
            <p>Add New Survey</p>
          </Link>
        </li>
        {allCards.map((item,index) => {
          return (
            <li key={index} style={{ backgroundImage: `url('${item.img}')` }}>
              <Link to='/ratings'>
                <div>
                  <p>{item.title}</p>
                  <p>{item.subtitle}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="download">
        <span></span>
        <span></span>
        <span></span>
      </div>
      </div>
    </div>
  );
}

export default Cards;
