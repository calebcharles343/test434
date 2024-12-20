import { useState, useRef, useEffect } from "react";
import { BiMenu } from "react-icons/bi";
import Sidebar from "./Sidebar";

const Menu: React.FC = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsMenu(false);
    }
  };

  useEffect(() => {
    if (isMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenu]);

  return (
    <>
      <button type="button" className="lg:hidden mr-8" onClick={handleMenu}>
        <BiMenu style={{ fontSize: "40px", color: "#333" }} />
      </button>
      {isMenu && (
        <div
          ref={sidebarRef}
          className={`lg:hidden absolute top-0 left-0 w-[230px] z-50 transform transition-transform duration-500 ease-in-out ${
            isMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>
      )}
    </>
  );
};

export default Menu;
