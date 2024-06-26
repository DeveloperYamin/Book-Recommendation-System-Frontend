/**
 * The SearchBar component in TypeScript React uses debouncing to handle search input and triggers a
 * search function when the search term is at least 3 characters long.
 * @returns The `SearchBar` component is being returned. It consists of a `TextInput` component that
 * serves as a search input field with specific props such as type, placeholder, id, name, disabled,
 * value, onChange, and style. The `useEffect` hook is used to trigger the `searchHandler` function
 * from the `useAuth` hook when the `debouncedSearchTerm` meets certain
 */


import TextInput from "@components/Form/TextInput";
import { useAuth } from "@src/hooks/useAuth";

export default function SearchBar() {
  const { user, setSearchTerm, searchTerm } = useAuth();

  return (
    <TextInput
      type="search"
      placeholder="Search"
      id="search"
      name="search"
      disabled={!user}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        width: "40%",
        borderRadius: "10px",
        minWidth: "14rem",
        outline: "none",
        marginLeft: "0.5rem",
      }}
    />
  );
}
