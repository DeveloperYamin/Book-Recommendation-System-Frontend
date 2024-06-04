import Card from "@components/Common/Card";
import { CircularProgress } from "@mui/material";
import { useAuth } from "@src/hooks/useAuth";
import { Book } from "@src/types";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const { searchHandler, debouncedSearchTerm, user, searchTerm } = useAuth();
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [randomSearchResults, setRandomSearchResults] = useState<Book[]>([]);
  const [recommendSearchResults, setRecommendSearchResults] = useState<Book[]>(
    []
  );
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    (async () => {
      if (user && debouncedSearchTerm.length >= 3) {
        setSearchResults(await searchHandler("directed"));
      } else if (user) {
        setRecommendSearchResults(await searchHandler("recommend"));
      } else {
        setRandomSearchResults(await searchHandler("random"));
      }
      setIsSearching(false);
    })();
  }, [debouncedSearchTerm, searchHandler, user]);

  return (
    <section>
      <h1 className="text-center text-white ">
        {user && searchTerm && searchResults.length
          ? "Search Results"
          : user && recommendSearchResults.length
          ? "Recommend Results"
          : "Random Results"}
      </h1>
      <div className="flex flex-wrap items-center justify-center w-full gap-5 p-8">
        {isSearching ? (
          <div>
            <CircularProgress size={50} />
          </div>
        ) : (
          (searchTerm && searchResults.length
            ? searchResults
            : randomSearchResults.length
            ? randomSearchResults
            : recommendSearchResults
          ).map((item, idx) => <Card key={idx} item={item} />)
        )}
      </div>
    </section>
  );
};

export default Home;
