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

  // const { refetch: refetchUser } = useUser(localStorageUserX?.id);

  const handleClick = () => {
    navigate(`/cartPage`);
  };

  const cart = useSelector((state: RootState) => state.cart);

  return (
    <header className="relative flex items-center justify-between col-start-2 col-end-3 bg-[#FFA82B] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[20px] border border-[rgba(255, 155, 0, 0.57)] rounded-lg p-4 z-50">
      <Menu />
      <form className="relative flex-grow">
        {location.pathname === "/home" && <SearchBar />}
      </form>
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
