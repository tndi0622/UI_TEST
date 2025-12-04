import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      <div className="container header-inner">
        <div className="logo">
          <Link to="/">도움이 필요한 아이들</Link>
        </div>
        <nav className="nav">
          <Link to="/"></Link>
          <Link to="/search"></Link>
        </nav>
      </div>
    </header>
  );
}
