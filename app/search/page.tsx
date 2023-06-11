"use client";

import React from "react";
import TableSearch from "@/components/search/TableSearch";
import PocketbaseHelper from "@/helpers/pocketbase/pocketbase";

export default function SearchPage() {
  const [data, setData] = React.useState<Array<any>>([]);
  const pb = PocketbaseHelper.pocketbase;

  React.useEffect(() => {
    const fetchUsers = async () => {
      const fetchedData = await pb.collection("users").getFullList({
        sort: "-created",
        filter: 'roles = "consultant"',
        $autoCancel: false,
      });
      setData(fetchedData);
    };

    fetchUsers();
  }, []);

  if (!data) {
    // Add loading state or return null while data is being fetched
    return null;
  }

  return (
    <React.Fragment>
      <div className="pt-2 relative text-gray-600">
        <TableSearch data={data} />
      </div>
    </React.Fragment>
  );
}
