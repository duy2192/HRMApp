import React, { useEffect, useState } from "react";
import Account from "../components/Account";
import { useParams } from "react-router-dom";
import {authApi} from "api";
import NotFound from "components/NotFound"
function DetailPage(props) {
  const { accountid } = useParams();
  const [account, setAccount] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const result = await authApi.get(accountid);
        setAccount(result.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [accountid]);
  return <>{account ? <Account account={account} /> : <NotFound/>}</>;
}

export default DetailPage;
