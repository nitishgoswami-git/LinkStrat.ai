import { CrossIcon, Menu, X } from "lucide-react";
import React, { useState } from "react";

const Sidebar = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  return ( 
    <div className="h-full" onClick={() => setisMenuOpen((prev) => !prev)} >
      {isMenuOpen ? <X  className="active:animate-spin"/> : <Menu />}
      {isMenuOpen && <Menu />}
    </div>
  );
};

export default Sidebar;
