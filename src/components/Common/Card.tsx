/* The code snippet you provided is a React component named `Card` that renders a card element
displaying information about a book. Here's a breakdown of what the code is doing: */

import { Star } from "@mui/icons-material";

export default function Card({
  item,
}: {
  item: {
    title: string;
    authors: string[];
    thumbnail: string;
  };
}) {
  return (
    <article className="relative w-1/4 overflow-hidden text-white bg-light-blue rounded-xl min-w-[18rem] min-h-[27rem]">
      <img className="object-cover w-full h-56" src={item?.thumbnail} />
      <div className="p-4">
        <h2>
          {item?.title.length <= 40
            ? item.title
            : item.title.slice(0, 40) + "..."}
        </h2>
        <h4 className="mt-2 mb-1">{item?.authors?.[0]}</h4>
        <p className="flex items-center">
          <span className="flex items-center cursor-pointer">
            {[1, 2, 3, 4].map((_, idx) => (
              <Star key={idx} className="text-ctc" />
            ))}
          </span>
          <span className="ml-2 text-sm text-gray-400">34 reviews</span>
        </p>
      </div>
    </article>
  );
}
