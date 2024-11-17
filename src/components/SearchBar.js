import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
    return (
        <div className="flex items-center bg-white justify-center rounded-2xl border p-1">
            <input className="w-[95%] h-full p-2 focus:outline-none" placeholder="Buscar"/>
            <div className="w-[5%]"><FaSearch/></div>
        </div>
    )
}

export default SearchBar;