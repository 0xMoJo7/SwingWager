import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import DataTable from 'react-data-table-component';

import DjangoImgSrc from "../../assets/images/django-logo-negative.png";
import { fetchLeaderboard } from "../store/leaderboard"; // Ensure this is correctly imported

const Home = () => {
  const dispatch = useDispatch();
  const leaderboardData = useSelector((state) => state.leaderboard.entities); // Ensure this matches your Redux store structure

  useEffect(() => {
    dispatch(fetchLeaderboard()); // Fetch the leaderboard data on component mount
  }, [dispatch]);

  // Define the columns based on the provided API response structure
  const columns = [
    {
      name: 'Player',
      selector: row => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: 'Country',
      selector: row => row.country,
      sortable: true,
    },
    {
      name: 'Position',
      selector: row => row.position,
      sortable: true,
    },
    {
      name: 'Holes Played',
      selector: row => row.holes_played,
      sortable: true,
    },
    {
      name: 'Total to Par',
      selector: row => `${row.total_to_par >= 0 ? '+' : ''}${row.total_to_par}`,
      sortable: true,
    },
  ];

  // Assuming the API data is nested and we need to access results.leaderboard for the actual leaderboard data
  const data = leaderboardData?.results?.leaderboard || [];
  console.log(leaderboardData);

  return (
    <>
      <div id="django-background">
        <img alt="Django Negative Logo" src={DjangoImgSrc} />
      </div>
      <h2>PGA Tour Leaderboard</h2>
      <DataTable
        title="Golf Leaderboard - PGA Championship"
        columns={columns}
        data={data}
        pagination
        persistTableHead
      />
    </>
  );
};

export default Home;
