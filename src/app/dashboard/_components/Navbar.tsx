import React from "react";
import { AlignJustify, Bell, Sun, User } from "lucide-react";

function Navbar() {
  return (
    <div className="flex items-center justify-between text-slate-50 bg-slate-800 h-16 px-8 py-4 fixed top-0 w-full left-60 right-0">
      <button>
        <AlignJustify />
      </button>
      <div className="flex space-x-3">
        <button>
          <Sun />
        </button>
        <button>
          <Bell />
        </button>
        <button>
          <User />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
