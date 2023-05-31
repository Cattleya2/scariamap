import React, { useState, useEffect } from "react";
import MyMap from "../myMap/MyMap";

function MyData() {
  const [dataAPI, setDataAPI] = useState(null);
  const url =
    "https://opensheet.elk.sh/1PnOhL_PM_Q5RRdREONf2I0Ni-OKBUj9nijPQzOkruhw/DataBrute";

  useEffect(() => {
    const fetchData = async () => {
      const reponseAPI = await fetch(url);
      const data = await reponseAPI.json();
      setDataAPI(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {dataAPI ? <MyMap data={dataAPI} /> : <p>Chargement des données...</p>}
    </div>
  );
}

export default MyData;
