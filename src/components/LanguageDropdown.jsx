import '../css/LanguageDropdown.css';
import uk from "../../public/icons/uk.png";
import brazil from "../../public/icons/brazil.png";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../features/languageToggle';
import useEventListener from '../hooks/useEventListener';

export default function LanguageDropdown() {

  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const language = useSelector((state) => state.languageToggle.value.language);
  const dispatch = useDispatch();
  let languageRef = useRef();

  // Hide element if user clicks outside
  const isOutside = e => {
    !languageRef.current.contains(e.target) && setIsLanguageOpen(false)
  }

  useEventListener("click", isOutside)

  return (
    <div onClick={() => setIsLanguageOpen(prev => !prev)} ref={languageRef} className="language">
      {language === "pt-BR" && <img className="big_image" src={brazil} alt="" width="500" height="300" />}
      {language === "en-US" && <img className="big_image" src={uk} alt="" width="100%" height="100%" />}
      <ArrowDropDownRoundedIcon className={`${isLanguageOpen ? "dd_open" : ""}`} />
      {
        isLanguageOpen &&

        <div className="dropdown_box">
          <div onClick={() => { dispatch(setLanguage({ language: "en-US" })); }}>
            English (United Kingdom)
          </div>

          <div onClick={() => { dispatch(setLanguage({ language: "pt-BR" })); }}>
            Português (Brasil)
          </div>
        </div>
      }
    </div>
  );
}
