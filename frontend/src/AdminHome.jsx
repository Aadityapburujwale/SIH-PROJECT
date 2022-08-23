import { useState, useEffect } from "react";

import DisplayShortTip from "./components/DisplayShortTip";

import Contract from "./Contract";

// material ui
import Grid from "@mui/material/Grid";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminHome() {
  const [tips, setTips] = useState([]);

  const [numberOfCrimesReported, setNumberOfCrimesReported] = useState({
    labels: ["Murder", "Robbery", "Burglary"],
    datasets: [
      {
        label: "Count Of Crimes Reported",
        data: [0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [statuses, setStatuses] = useState({
    labels: ["Active", "InActive"],
    datasets: [
      {
        label: "Status Of Cases",
        data: [12, 19],
        backgroundColor: [
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const getTips = async () => {
      try {
        if (Contract) {
          const allTips = await Contract.getCrimes();
          setTips(allTips);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCrimeReports = async () => {
      try {
        if (Contract) {
          // take data from the blockchain
          setNumberOfCrimesReported({
            labels: ["Murder", "Robbery", "Burglary"],
            datasets: [
              {
                label: "Count Of Crimes Reported",
                data: [12, 19, 302],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 3,
              },
            ],
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchStatuses = async () => {
      try {
        if (Contract) {
          // take data from the blockchain
          setStatuses({
            labels: ["Active", "InAcive"],
            datasets: [
              {
                label: "Status Of Cases",
                data: [12, 19],
                backgroundColor: [
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCrimeReports();
    fetchStatuses();
    getTips();
  }, []);

  return (
    <>
      {/* here use the library called chart js to rendered the data in the more conveiyer manner to the admin side */}

      <Grid container justifyContent="center">
        <Grid item lg={3}>
          <Pie data={numberOfCrimesReported} />
        </Grid>
        <Grid item lg={3}>
          <Pie data={statuses} />
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        {tips.map((currTip, index) => {
          return (
            <Grid key={index} item xs={10} sm={5} md={5} lg={4} m={1}>
              <DisplayShortTip currTip={currTip} isAdminLoggedIn={true} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
