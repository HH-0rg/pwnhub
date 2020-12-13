import "../css/Home.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Get } from "react-axios";
import config from "./config";
import { Redirect } from "react-router-dom";

function Home() {
  const location = useLocation();
  return (
    <div className="Home">
      <Get url={config.ochinchin + 'login'} params={{username: location.username}}>
        {(error, response, isLoading, makeRequest, axios) => {
          if (error) {
            return <Redirect to="/login" />;
          } else if (response !== null) {
            return (
              <div>
                {console.log(response.data)}
              </div>
            );
          }
          return <div>Default message before request is made.</div>;
        }}
      </Get>
    </div>
  );
}

export default Home;
