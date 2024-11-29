import { FaSearch } from "react-icons/fa";

const SearchBar = ({
    onSearch
}) => {
    const handleSearch = (event) => {
        onSearch(event.target.value);
    }
    return (
        <div className="flex items-center bg-white justify-center rounded-2xl border p-1">
            <input onChange={(e) => handleSearch(e)} className="w-full h-full p-2 focus:outline-none" placeholder="Buscar"/>
            <div className="w-[30px]"><FaSearch/></div>
        </div>
    )
}

export default SearchBar;