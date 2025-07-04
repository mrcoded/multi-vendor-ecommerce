import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const { user } = session;

  return <div>Welcome {user?.name}</div>;
};

export default page;
