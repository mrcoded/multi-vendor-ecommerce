import "../../styles/main.scss";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <>
      <Navbar user={user} />
      <main className="max-w-7xl mx-auto py-6 px-2 sm:px-8 lg:px-4 xl:px-5">
        {children}
      </main>
      <Footer />
    </>
  );
}
