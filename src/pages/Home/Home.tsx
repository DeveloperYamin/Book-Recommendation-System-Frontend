import Card from "@components/Common/Card";
import { CircularProgress } from "@mui/material";
import { useAuth } from "@src/hooks/useAuth";
import { useEffect, useState } from "react";

function Home() {
  const {
    isSearching,
    searchResults,
    searchHandler,
    randomSearchResults,
    // recommendationSearchHandler,
    // recommendationSearchResults
  } = useAuth();

  useEffect(() => {
    (async () => {
      await searchHandler();
      //await recommendationSearchHandler();
    })();
  }, []);

  return (
    <section className="">
      <h1 className="text-center text-white ">
        {searchResults.length ? "Search Results" : "Random Results"}
      </h1>
      <div className="flex flex-wrap items-center justify-center w-full gap-5 p-8">
        {isSearching ? (
          <div>
            <CircularProgress size={50} />
          </div>
        ) : (
          (searchResults.length ? searchResults : randomSearchResults)?.map(
            (item, idx) => <Card key={idx} item={item} />
          )
        )}
      </div>
    </section>
  );
}

export default Home;
