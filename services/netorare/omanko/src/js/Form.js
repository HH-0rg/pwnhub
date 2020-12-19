import "../css/Login.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Get } from "react-axios";
import config from "./config";
import { Redirect } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Form() {
  const location = useLocation();
  const [mainFormObj, setMainFormObj] = useState({
    exploit: "",
    paToken: "",
    gist: "",
    name: "",
  });
  const history = useHistory();

  const submitNew = () => {
    return axios.post(config.ochinchin + "new", mainFormObj).then((e) => {
      console.log(mainFormObj);
      history.push({
        pathname: "/home",
        search: "?username=pwner",
      });
    });
  };

  const handleChange = (key) => (event) => {
    let value = event.target.value;
    setMainFormObj({
      ...mainFormObj,
      [key]: value,
    });
  };

  return (
    <div className="FormContainer">
      <div className="Form">
        <div className="Title">New Exploit</div>
        <div className="Subtitle">Fill this form to create a new Exploit</div>
        <form>
          <input
            type="text"
            value={mainFormObj.name}
            onChange={handleChange("name")}
            placeholder="Name"
          />
          <input
            type="text"
            value={mainFormObj.exploit}
            onChange={handleChange("exploit")}
            placeholder="Exploit"
          />
          <input
            type="text"
            value={mainFormObj.paToken}
            onChange={handleChange("paToken")}
            placeholder="Exploit Repo PA Token"
          />
          <input
            type="text"
            value={mainFormObj.gist}
            onChange={handleChange("gist")}
            placeholder="Setup Gist"
          />
          {/* <div className=""> */}
            <div onClick={submitNew} style={{textAlign:"center"}} className="BigButton">Submit</div>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
}

export default Form;
