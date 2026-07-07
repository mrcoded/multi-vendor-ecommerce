import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer/Footer";
import { getAuthSession } from "@/lib/auth-session";
export default async function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuthSession();
  const user = session?.user;

  return (
    <>
      <Navbar user={user} />
      <main className="mx-auto max-w-7xl overflow-x-hidden px-2 pb-6 pt-28 sm:px-8 md:pt-20 lg:px-4 xl:px-5">
        {children}
      </main>
      <Footer />
    </>
  );
}
