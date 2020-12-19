import "../css/Pwner.scss";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { web3, portis } from "../services/service";
import axios from "axios";
import config from "./config";

function Pwner({ db }) {
  // const [isAgreed, setIsAgreed] = useState(0);

  // const handleFuckingShit = (i) => {
  //   console.log(i, isAgreed);

  //   let foo = isAgreed;
  //   foo[i] = true;
  //   setIsAgreed(foo);
  //   console.log(i, isAgreed, foo);
  // };
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("5000000000000000000");

  useEffect(() => {
    activeMen();
    portis.onLogin((receiverAddress) => {
      setReceiverAddress(receiverAddress);
    });
    portis.onActiveWalletChanged((receiverAddress) => {
      setReceiverAddress(receiverAddress);
    });
  }, []);
  const activeMen = () => {
    portis.showPortis();
  };

  const updateDB = (name, test_cases) => {
    axios.get(config.ochinchin + "pwner_agrees", {
      params: {
        name: name,
      },
    });
  };

  console.log(receiverAddress);
  const transfer = async () => {
    // let gas = web3.eth.estimateGas({
    //   from: "0x2c9f1889b90e71ffb7bcdd8a4de79d162bc1d567",
    //   to: receiverAddress,
    //   amount: web3.utils.toWei(amount, "ether"),
    // });

    console.log(receiverAddress, amount);

    let signedTransaction = await web3.eth.accounts.signTransaction(
      { to: receiverAddress, value: amount, gas: 200000 },
      "0x5a4d83e7950c63dbd79b122b36328bb2682787fbd90f756af3809e1df862ef72"
    );
    let terana = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );

    console.log(terana);
  };

  return (
    <div className="Pwner">
      <div className="Container">
        {db.map((entry, i) => (
          <>
            {console.log(i)}
            <div className="Tile">
              <div className="TileHeader">Name: {entry.name}</div>
              {console.log(entry.name)}
              <div className="Entries">
                <div className="Entry">Exploit: {entry.exploit}</div>
                <div className="Entry">Setup Gist: {entry.gist}</div>
              </div>
              {entry.test_cases == "None" && (
                <button className="Button">Copy Link</button>
              )}
              {entry.test_cases != "None" && (
                <>
                  <div className="Entry"> Corporate has responded </div>
                  <div className="Entries">
                    <div className="Entry">
                      Test Cases Repo: {entry.test_cases}
                    </div>
                  </div>
                  {(() => {
                      console.log(entry)
                      if (!entry.pwner_agrees) {
                        return (
                          <button
                            onClick={() => {
                                updateDB(entry.name);
                            }}
                            className="Button"
                          >
                            I Agree
                          </button>
                        );
                      } else {
                        if (!entry.passed) {
                          console.log(entry.passed, "YE DEKH")
                          return (
                            <div className="Entry">
                              {" "}
                              Waiting for response from Corporate/Service{" "}
                            </div>
                          );
                        } else {
                          return (
                            <>
                              <div className="Entry">
                                {" "}
                                Test Cases Pass Status: {entry.passed}
                              </div>
                              {entry.passed == "True" && (
                                <button
                                  onClick={() => {
                                    transfer();
                                  }}
                                  className="Button"
                                >
                                  Claim
                                </button>
                              )}
                            </>
                          );
                        }
                      }
                  })()}
                </>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Pwner;
