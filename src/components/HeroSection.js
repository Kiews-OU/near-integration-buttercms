import * as React from "react";
import { Nav } from "react-bootstrap";
import { accountBalance, login, logout } from "../utils/near";
import Wallet from "./wallet";

const HeroSection = (props) => {
  const account = window.walletConnection.account();
  const [balance, setBalance] = React.useState("0");
  const getBalance = React.useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  }, [account.accountId]);

  React.useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <section id={props.fields.scroll_anchor_id} className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-10">
            <div className="hero-content">
              <h1>{props.fields.headline}</h1>
              <p>{props.fields.subheadline}</p>

              <div style={{ display: "flex" }}>
                {account.accountId ? (
                  <h3>Welcome {account.accountId}!</h3>
                ) : (
                  <a
                    style={{ cursor: "pointer" }}
                    href={props.fields.button_url}
                    rel="noreferrer"
                    className="main-btn btn-hover"
                    onClick={() => {
                      login();
                    }}
                  >
                    {props.fields.button_label}
                  </a>
                )}
                {account.accountId && (
                  <Nav style={{ marginLeft: "10px" }}>
                    <Nav.Item>
                      <Wallet
                        address={account.accountId}
                        amount={balance}
                        symbol="NEAR"
                        destroy={logout}
                      />
                    </Nav.Item>
                  </Nav>
                )}
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6">
            <div className="hero-image text-center text-lg-end">
              <img src={props.fields.image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
