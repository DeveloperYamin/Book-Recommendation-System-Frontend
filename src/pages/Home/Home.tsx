import Card from "@components/Common/Card";
import { CircularProgress } from "@mui/material";
import { useAuth } from "@src/hooks/useAuth";
import { useEffect } from "react";

function Home() {
  const {
    isSearching,
    searchResults,
    searchHandler,
    randomSearchResults,
    searchTerm,
    user,
    recommendSearchResults,
  } = useAuth();

  useEffect(() => {
    (async () => {
      if (searchTerm && user) {
        await searchHandler("directed");
      } else if (user) {
        await searchHandler("recommend");
      } else {
        await searchHandler("random");
      }
    })();
  }, []);

  return (
    <section>
      <h1 className="text-center text-white ">
        {searchTerm && searchResults.length
          ? "Search Results"
          : recommendSearchResults.length
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
            : randomSearchResults
          )?.map((item, idx) => <Card key={idx} item={item} />)
        )}
      </div>
    </section>
  );
}

export default Home;
