import React, { useState, useEffect } from "react";
import MyMap from "../myMap/MyMap";

function MyData() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);

  const url =
    "https://opensheet.elk.sh/1PnOhL_PM_Q5RRdREONf2I0Ni-OKBUj9nijPQzOkruhw/DataBrute";
  const fetchData = async () => {
    setLoading(true);
    try {
      const reponseAPI = await fetch(url);
      const data = await reponseAPI.json();
      if (data) {
        setRecords(data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="w-full text-center ">
          <p className="text-3xl">Chargement des données...</p>
        </div>
      ) : (
        records && <MyMap data={records} />
      )}
    </div>
  );
}

export default MyData;
