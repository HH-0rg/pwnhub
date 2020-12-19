import "../css/Corporate.scss";
import "../css/Pwner.scss";

import { useLocation } from "react-router-dom";
import "../css/Login.scss";
import { web3, portis } from "../services/service";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "./config";

function Corporate({ db }) {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const name = query.get("name");

  const [testCases, setTestCases] = useState("");
  const [testState, setTestState] = useState(true);
  const [amount, setAmount] = useState("");

  // const [amount, setAmount] = useState("50000000000000000");
  const [senderAddress, setSenderAddress] = useState("");
  const activeMen = () => {
    portis.showPortis();
  };
  useEffect(() => {
    activeMen();
    portis.onLogin((senderAddress) => {
      setSenderAddress(senderAddress);
    });
    portis.onActiveWalletChanged((senderAddress) => {
      setSenderAddress(senderAddress);
    });
  }, []);

  const updateDB = (test_cases) => {
    axios.get(config.ochinchin + "corporate_agrees", {
      params: {
        name: name,
        test_cases: test_cases,
        amount: amount,
      },
    });
  };

  const transfer = async () => {
    let transaction = await web3.eth.sendTransaction({
      from: senderAddress,
      to: "0x2c9f1889b90e71ffb7bcdd8a4de79d162bc1d567",
      value: amount * 1000000000000000000,
    });

    console.log(transaction);
  };

  return (
    <div className="Corporate">
      <div className="Container">
        <div className="Form">
          <div className="Title">New Claim</div>
          <div className="Subtitle">Review and submit test cases repo</div>
          <form>
            <div className="Entries">
              <div className="Entry">Claim Name: {name}</div>
              <div className="Entry">Pentester: pwner</div>
              <div className="Entry">
                  Setup Gist: <a style={{color: "#82d518", textDecoration: "none"}} href={'https://gist.github.com/Scar26/98dcf429f6b97732f53574aab6d2ab94'}>{"https://gist.github.com/Scar26/98dcf429f6b97732f53574aab6d2ab94"}</a>
                </div>
            </div>
            <input
              type="text"
              value={testCases}
              placeholder="Test Case Repo"
              onChange={(e) => setTestCases(e.target.value)}
            />
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
            {testState ? (
              <div className="Buttons">
                <div
                  onClick={() => {
                    updateDB(testCases);
                    transfer();
                    setTestState(false);
                  }}
                  className="Button"
                >
                  Respond
                </div>
              </div>
            ) : (
              <div style={{ marginTop: "4rem" }} className="Entry">
                Proceed for ether transaction...
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Corporate;
