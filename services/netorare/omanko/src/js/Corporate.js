import "../css/Corporate.scss";
import { useLocation } from "react-router-dom";
import "../css/Login.scss";
import { web3, portis } from "../services/web3";
import { useState, useEffect } from "react";



function Corporate({ db }) {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const name = query.get("name");

  const [amount, setAmount] = useState("")
  const [senderAddress, setSenderAddress] = useState("")

  useEffect(() => {
    portis.onLogin((senderAddress) => {
      setSenderAddress(senderAddress);
    });
    portis.onActiveWalletChanged((senderAddress) => {
      setSenderAddress(senderAddress);
    });
  }, [])

  const transfer = async () => {
      let transaction = await web3.eth.sendTransaction({
      from: senderAddress,
      to: "0x2c9f1889b90e71ffb7bcdd8a4de79d162bc1d567",
      value: amount,
    });

    console.log(transaction)
  }

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
            </div>
            <input type="text" placeholder="Test Case Repo" />
            <input type="text" placeholder="Amount" />
            <div className="Buttons">
              <div onClick={transfer} className="Button">Respond</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Corporate;
