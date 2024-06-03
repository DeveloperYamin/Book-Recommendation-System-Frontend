/* This code snippet is a React functional component named `Account`. Here's a breakdown of what it
does: */

import { Profile } from "@src/types";
import axiosInstance from "@src/utils/axiosInstance";

import { useEffect, useState } from "react";

function Account() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get<Profile>("/users/profile");
      console.log("🚀 ~ data:", data);
      setProfile(data);
    })();
  }, []);

  return (
    <section>
      <div className="flex flex-col p-10 mx-20 space-y-2 text-white rounded-md shadow-md bg-light-blue">
        <h1 className="text-4xl font-extrabold">Account</h1>
        <div className="flex p-4 text-xl">
          <p className="w-40 font-bold ">Name:</p>
          <p className="capitalize">{profile?.user.name}</p>
        </div>
        <div className="flex p-4 text-xl">
          <p className="w-40 font-bold ">Email:</p>
          <p className="">{profile?.user.email}</p>
        </div>
      </div>
      <div className="flex flex-col p-10 mx-20 mt-5 space-y-2 text-white rounded-md shadow-md bg-light-blue">
        <h1 className="text-4xl font-extrabold">Search History</h1>
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-light-blue">
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Query
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-light-blue">
            {profile?.searchHistory.map((item) => (
              <tr key={item._id}>
                <td className="py-4 px-6 border-b border-gray-200 ">
                  {item.query}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 truncate">
                  {item.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Account;
