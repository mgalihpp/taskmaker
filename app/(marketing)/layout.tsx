import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh bg-background">
      <Navbar />
      <main className="bg-background pb-20 pt-40">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
