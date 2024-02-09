import React, { useState } from "react";
import Sidebar from "./Sidebar";
const Layout = ({ children}) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [areLinksVisible, setAreLinksVisible] = useState(false);

  const toggleLinks = () => {
    setAreLinksVisible(!areLinksVisible);
  };

  const toggleSidebar = () => {
    setAreLinksVisible(false);
    setIsOpen(!isOpen);
  };

  return (
    <div className="for-all">
      <Sidebar isOpen={isOpen} setIsOpen={toggleSidebar} />
      <div className={`main-content ${areLinksVisible ? "links-visible" : ""}`}>
        {children}
      </div>
      {window.innerWidth <= 768 && (
        <button className="links-toggle" onClick={toggleLinks}>
          <i className={`fas ${areLinksVisible ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
        </button>
      )}
    </div>
  );
};
export default Layout;