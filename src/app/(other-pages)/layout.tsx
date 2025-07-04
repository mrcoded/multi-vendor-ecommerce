import "../../styles/main.scss";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";


export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-8 lg:px-0">{children}</div>
      <Footer />
    </>
  );
}
