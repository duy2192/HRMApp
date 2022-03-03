import React, { useEffect, useState } from "react";
import PositionDetail from "../components/PositionDetail";
import { useParams } from "react-router-dom";
import {positionApi} from "api";
import NotFound from "components/NotFound"
function DetailPage(props) {
  const { id } = useParams();
  const [position, setPosition] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const result = await positionApi.get(id);
        setPosition(result.results);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
  return <>{position ? <PositionDetail position={position} /> : <NotFound/>}</>;
}

export default DetailPage;
