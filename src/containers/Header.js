import React, { useEffect, useState } from "react";
import { login, accountBalance, logout } from "../utils/near";
import { Container, Nav, Button } from "react-bootstrap";
import Wallet from "../components/wallet";

const Header = ({ menuItems, activeLink }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isTogglerActive, setIsTogglerActive] = useState(false);
  const account = window.walletConnection.account();
  const [balance, setBalance] = React.useState("0");
  const getBalance = React.useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  });

  React.useEffect(() => {
    getBalance();
  }, [getBalance]);

  useEffect(() => {
    const onScroll = () => {
      const headerNavbar = document.querySelector(".navbar-area");
      if (headerNavbar) {
        const sticky = headerNavbar.offsetTop;
        setIsSticky(window.pageYOffset > sticky);
      }
    };

    window.document.addEventListener("scroll", onScroll, { passive: true });
    return () => window.document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="header">
      <div className={`navbar-area ${isSticky && "sticky"}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/">
                  <img
                    src="https://cdn.buttercms.com/PBral0NQGmmFzV0uG7Q6"
                    alt="Logo"
                  />
                </a>
                <button
                  className={`navbar-toggler ${
                    isTogglerActive ? "active" : ""
                  }`}
                  onClick={() => setIsTogglerActive(!isTogglerActive)}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>
                <div
                  className={`collapse navbar-collapse sub-menu-bar ${
                    isTogglerActive ? "show" : ""
                  }`}
                  id="navbarSupportedContent"
                >
                  <div className="ms-auto">
                    <ul id="nav" className="navbar-nav ms-auto">
                      {/* {menuItems.map((item) => ( */}
                      <li
                        className="nav-item"
                        style={{ margin: "5px 15px 0 0" }}
                      >
                        {account.accountId ? (
                          <div>Welcome {account.accountId}!</div>
                        ) : (
                          <Button
                            variant="link"
                            className="nav-link link"
                            size="lg"
                            onClick={() => {
                              login();
                            }}
                          >
                            Login
                          </Button>
                        )}
                      </li>
                      <li className="nav-item">
                        {account.accountId && (
                          // <Nav style={{ marginLeft: "10px" }}>
                          //   <Nav.Item>
                          <Wallet
                            address={account.accountId}
                            amount={balance}
                            symbol="NEAR"
                            destroy={logout}
                          />
                          //   </Nav.Item>
                          // </Nav>
                        )}
                      </li>
                      {/* ))} */}
                    </ul>
                  </div>
                </div>{" "}
                {/* <!-- navbar collapse --> */}
              </nav>{" "}
              {/* <!-- navbar --> */}
            </div>
          </div>{" "}
          {/* <!-- row --> */}
        </div>{" "}
        {/* <!-- container --> */}
      </div>{" "}
      {/* <!-- navbar area --> */}
    </header>
  );
};

export default Header;
