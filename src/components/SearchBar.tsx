import { SearchIcon } from '../utils/icons';
import './SearchBar.scss';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {

}

const SearchBar = ({ className, ...props }: SearchBarProps) => {
  return (
    <div
      className={`${className} searchbar`}
      {...props}>
      <input
        className="searchbar-input"
        type="text"
        placeholder="Buscar entre 2472 productos de farmacia"
      />
      <SearchIcon className="searchbar-icon" />
    </div>
  );
};

export default SearchBar;
