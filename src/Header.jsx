import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMenu, fetchSettings, fetchUser } from "./store/fetchs";
import { useState } from "react";
import not from "./images/notification.png";
import message from "./images/email.png";
import moon from "./images/crescent-moon.png";

function Header({ app }) {
  let [flag, setFlag] = useState(false)
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchSettings());
    dispatch(fetchUser());
  }, [dispatch]);

  let headerMenu = useSelector((state) => state.objects.menu);
  let settings = useSelector((state) => state.objects.settings);
  let user = useSelector((state) => state.objects.user);

  return (
    <header className="header">
      <div className="header-container">
        <Link className="logo" to="/">
          <img src={settings.logo} alt="logo" />
          <span>{settings.logo_title}</span>
        </Link>
        <ul>
          {headerMenu.map((item) => {
            return (
              <li key={item.id}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
        <div className="user-info-container">
          <div className="user-buttons">
            <button><img src={message} alt="message" /></button>
            <button><img src={not} alt="not" /></button>
            <button
              onClick={() => {
                setFlag(!flag)
                app.current.style = `background-color: ${flag ? 'white' : 'black'}`;
              }}
            >
              <img src={moon} alt="moon" />
            </button>
          </div>
          <div className="user-info">
            <div>
              <p>{user.name}</p>
              <p>
                Vote : {user.vote}, Survey : {user.survey}
              </p>
            </div>
            <img src={`${user.img}`} alt="avatar" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
