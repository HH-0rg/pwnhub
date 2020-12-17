import "../css/Corporate.scss";
import { useLocation } from "react-router-dom";
import "../css/Login.scss";

function Corporate({ db }) {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const name = query.get("name");

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
              <div className="Button">Respond</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Corporate;
