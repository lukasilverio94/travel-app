import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = ({ onChange, value }) => {
  return (
    <div className="w-full max-w-96 relative mt-3 ">
      <div>
        <input
          type="text"
          placeholder="Search post by title or place..."
          className="w-full p-4 rounded-full bg-gray-100 dark:bg-transparent dark:border-2 text-gray-800 focus:outline-teal-600 focus:border-teal-600 dark:text-slate-200"
          onChange={onChange}
          value={value}
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-teal-600 rounded-full">
          <AiOutlineSearch className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
