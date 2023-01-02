import './Header.css';
import ColorPalette from './ColorPalette';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

const Header = ({ keyword, setKeyword, setPage }) => {
  return (
    <header>
      <h1>{keyword} AESTHETIC</h1>
      <div className="header_item_wrapper">
        <ColorPalette setKeyword={setKeyword} setPage={setPage} />
        <ul>
          <li>
            <a href="https://github.com/RoseJang2000">
              <FaGithub />
              <span>Github</span>
            </a>
          </li>
          <li>
            <a href="mailto:jangmi749@gmail.com">
              <FaEnvelope />
              <span>E-mail</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
