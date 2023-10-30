import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchSettings, fetchFooterMenu } from "./store/fetchs";

function Footer() {
  let dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchSettings());
    dispatch(fetchFooterMenu());

  }, [dispatch]);

  let settings = useSelector((state) => state.objects.settings);
  let footerMenu = useSelector((state) => state.objects.footermenu);


  return (
    <footer className="footer">
        <div className="footer-container">
        <a href={`email: ${settings.mail}`}>{settings.mail}</a>
      <ul>
        {footerMenu.map((item) => {
          return (
            <li key={item.id}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
      <span>{settings.copyright}</span>
      </div>
    </footer>
  );
}

export default Footer;
