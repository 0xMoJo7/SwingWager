import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from 'react-data-table-component';

import DjangoImgSrc from "../../assets/images/django-logo-negative.png";
import { fetchLeaderboard } from "../store/leaderboard"; 

const Home = () => {
  const dispatch = useDispatch();
  const leaderboardData = useSelector((state) => state.leaderboard.entities);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const columns = [
    { name: 'Player', selector: row => `${row.first_name} ${row.last_name}`, sortable: true },
    { name: 'Country', selector: row => row.country, sortable: true },
    { name: 'Position', selector: row => row.position, sortable: true },
    { name: 'Holes Played', selector: row => row.holes_played, sortable: true },
    { name: 'Total to Par', selector: row => `${row.total_to_par >= 0 ? '+' : ''}${row.total_to_par}`, sortable: true },
  ];

  const data = leaderboardData?.results?.leaderboard || leaderboardData || [];

  return (
    <>
      <h2>Swing Wager</h2>
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

