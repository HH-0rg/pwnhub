import "../css/Pwner.scss";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { web3, portis } from "../services/web3";


function Pwner({ db }) {
  const [isAgreed, setIsAgreed] = useState(false);
  

  // const handleFuckingShit = (i) => {
  //   console.log(i, isAgreed);

  //   let foo = isAgreed;
  //   foo[i] = true;
  //   setIsAgreed(foo);
  //   console.log(i, isAgreed, foo);
  // };
  const [receiverAddress, setReceiverAddress] = useState("")
  const [amount, setAmount] = useState("")

  useEffect(() => {
    portis.onLogin((receiverAddress) => {
      setReceiverAddress(receiverAddress);
    });
    portis.onActiveWalletChanged((receiverAddress) => {
      setReceiverAddress(receiverAddress);
    });
  }, [])

  const transfer = async () => {
    let gas = web3.eth.estimateGas({
      from: "0x2c9f1889b90e71ffb7bcdd8a4de79d162bc1d567",
      to: receiverAddress,
      amount: web3.toWei(amount, "ether"),
    });

    let signedTransaction = await web3.eth.accounts.signTransaction(
      { to: receiverAddress, value: amount, gas: gas },
      "0x5a4d83e7950c63dbd79b122b36328bb2682787fbd90f756af3809e1df862ef72"
    );
    let terana = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );

    console.log(terana);
  }

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
                  {!isAgreed || i != 0 ? (
                    <button
                      onClick={() => {if(i==0) {setIsAgreed(true); transfer}}}
                      className="Button"
                    >
                      I Agree
                    </button>
                  ) : (
                    <div className="Entry">
                      {" "}
                      Waiting for response from Corporate/Service{" "}
                    </div>
                  )}
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
