import { HiSearch } from "react-icons/hi";
import { ChangeEvent, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setQuery, setFilterByRating } from "../store/searchBarSlice";
import CheckBox from "./CheckBox"; // Assuming you have a CheckBox component

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.SearchBarQuery.query);
  const filterByRating = useSelector(
    (state: RootState) => state.SearchBarQuery.filterByRating
  );

  const [showCheckBoxContainer, setShowCheckBoxContainer] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterByRating(e.target.checked));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setShowCheckBoxContainer(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCheckBoxContainer = () => {
    setShowCheckBoxContainer((prev) => !prev);
  };

  const handleFocus = () => {
    setShowCheckBoxContainer(true);
  };

  return (
    <div ref={searchBarRef} className="relative flex items-center gap-2">
      <button type="button" onClick={toggleCheckBoxContainer}>
        <HiSearch style={{ fontSize: "20px", color: "#333" }} />
      </button>
      <input
        className="px-4 w-[60%] h-8 rounded-full focus:outline-none"
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus} // Show CheckBox container on focus
      />
      {showCheckBoxContainer && (
        <div className="w-[62%] absolute left-6 top-10 flex items-center bg-white border p-2 rounded-lg shadow-lg">
          <CheckBox
            label="Top Ratings"
            name="ratingCheckbox"
            checked={filterByRating}
            onChange={handleCheckboxChange}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
