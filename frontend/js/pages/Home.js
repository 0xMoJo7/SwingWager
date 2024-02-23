import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from 'react-data-table-component';

import { fetchLeaderboard } from "../store/leaderboard";

const Home = () => {
  const dispatch = useDispatch();
  // Assuming your Redux state has loading and error states related to fetching the leaderboard
  const leaderboardData = useSelector((state) => state.leaderboard.entities);
  const isLoading = useSelector((state) => state.leaderboard.loading);
  const error = useSelector((state) => state.leaderboard.error);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const columns = [
    { name: 'Player', selector: row => `${row.first_name} ${row.last_name}`, sortable: true },
    { name: 'Position', selector: row => row.position, sortable: true },
    // Round 1 Score and Status
    { name: 'Round 1 Score', selector: row => {
        const round = row.rounds[0]; // Accessing the first round directly
        return round ? round.total_to_par : 'N/A';
      }, sortable: true },
    { name: 'Round 2 Score', selector: row => {
        const round = row.rounds[1]; // Accessing the second round directly
        return round ? round.total_to_par : 'N/A';
      }, sortable: true },
    { name: 'Round 3 Score', selector: row => {
        const round = row.rounds[2]; // Accessing the third round directly
        return round ? round.total_to_par : 'N/A';
      }, sortable: true },
    { name: 'Round 4 Score', selector: row => {
        const round = row.rounds[3]; // Accessing the fourth round directly
        return round ? round.total_to_par : 'N/A';
      }, sortable: true },
  ];
  

  // Adjusting how data is determined based on potential Redux state structure
  let data = [];
  if (!isLoading && !error) {
    data = leaderboardData?.results?.leaderboard || leaderboardData || [];
  }

  return (
    <>
      <h2>Swing Wager</h2>
      {isLoading ? (
        <p>Loading leaderboard data...</p>
      ) : error ? (
        <p>Error fetching leaderboard data: {error}</p>
      ) : (
        <DataTable
          title="Golf Leaderboard"
          columns={columns}
          data={data}
          pagination
          persistTableHead
        />
      )}
    </>
  );
};

export default Home;
