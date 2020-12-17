import "../css/Pwner.scss";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Pwner({ db }) {
  const [isAgreed, setIsAgreed] = useState(false);
  

  // const handleFuckingShit = (i) => {
  //   console.log(i, isAgreed);

  //   let foo = isAgreed;
  //   foo[i] = true;
  //   setIsAgreed(foo);
  //   console.log(i, isAgreed, foo);
  // };

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
                      onClick={() => {if(i==0) {setIsAgreed(true)}}}
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
