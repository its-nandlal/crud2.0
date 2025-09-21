
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Link from "next/link";
import { stackServerApp } from "@/stack";
import { UserButton } from "@stackframe/stack";
import SignInDropdown from "./signInDropdown";
import ModeToggle from "../modeToggle";

const Navbar = async () => {

    const user = await stackServerApp.getUser()

  return (
    <div className="h-fit bg-background/90">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-10 overflow-hidden rounded-md">
            <Link href={user ? "/user" : "/"}>
            <img 
            src={"https://i.pinimg.com/1200x/fb/b5/1c/fbb51c5a9700dc616c6c2bd10b810210.jpg"}
            alt="logo"
            className="w-full h-full object-cover scale-[1.1] mix-blend-difference rounded-md"/>
            </Link>
          </div>

          {/* Desktop Menu */}
          {!user && (
              <NavMenu className="hidden md:block" />
          )}

          <div className="flex items-center gap-3">
            <ModeToggle />

            { user ? (
                <UserButton />
            ) : (
                <SignInDropdown />
            ) }

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
