import { useSelector } from "react-redux";

import { useNavigate, useLocation } from "react-router-dom";
4;
import CartIcon from "./CartIcon";

import SearchBar from "../ui/SeachBar";
import UserAvatar from "./UserAvatar";
import Menu from "./Menu";
import { RootState } from "../store/store";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/cartPage`);
  };

  const cart = useSelector((state: RootState) => state.cart);

  return (
    <header className="relative flex items-center justify-between col-start-2 col-end-3 bg-[#FFA82B] backdrop-blur-[20px] p-4 z-50 shadow-md">
      <div className="flex items-center gap-4 lg:8">
        <Menu />
        <form className="relative flex-grow">
          {location.pathname === "/home" && <SearchBar />}
        </form>
      </div>
      <div className="flex min-h-max items-center gap-4">
        <div className="flex" onClick={handleClick}>
          <CartIcon length={cart.items.length} />
        </div>
        <UserAvatar />
      </div>
    </header>
  );
};

export default Header;
