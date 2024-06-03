/**
 * The `Home` function returns a section with a heading "Search Results" and a div with flex properties
 * for displaying search results.
 * @returns The Home component is being returned, which includes a section with a heading "Search
 * Results" and a div with flex properties for displaying search results.
 */

function Home() {
  return (
    <section className="">
      <h1 className="text-center text-white ">Search Results</h1>
      <div className="flex flex-wrap items-center justify-center w-full gap-5 p-8"></div>
    </section>
  );
}

export default Home;
