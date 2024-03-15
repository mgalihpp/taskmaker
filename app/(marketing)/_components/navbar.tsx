import Logo from "@/components/logo";
import AuthModal from "./authmodal";
import { getServerAuthSession } from "@/server/auth";
import SignedModal from "./signedmodal";
import { memo } from "react";
const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="fixed top-0 z-10 flex h-14 w-full items-center border-b bg-background px-4 shadow-sm">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
        <Logo />
        <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
          {session ? <SignedModal /> : <AuthModal />}
        </div>
      </div>
    </div>
  );
};

export default memo(Navbar);
