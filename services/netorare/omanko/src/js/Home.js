import "../css/Home.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Get } from "react-axios";
import config from "./config";
import { Redirect } from "react-router-dom";
import Pwner from "./Pwner";
import Corporate from "./Corporate";

function Home({ props }) {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const [dbState, setDbState] = useState(0);

  const handleReload = () => {
    setDbState(dbState + 1);
  };

  const location = useLocation();
  return (
    <div className="Home">
      {console.log(props, location)}
      <Get
        url={config.ochinchin + "login"}
        params={{ username: location.username }}
      >
        {(error, response, isLoading, makeRequest, axios) => {
          if (error) {
            return <Redirect to="/login" />;
          } else if (response !== null) {
            {
              console.log("yaha aaya");
            }
            if (query.get("username") == "pwner") {
              // if (true) {
              return <Pwner dbState={dbState} handleReload={handleReload} db={response.data} />;
            } else {
              return <Corporate db={response.data} />;
            }
          }
          return <div>Default message before request is made.</div>;
        }}
      </Get>
    </div>
  );
}

export default Home;
