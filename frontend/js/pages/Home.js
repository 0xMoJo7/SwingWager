import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from 'react-data-table-component';
import { fetchLeaderboard } from "../store/leaderboard";

const Home = () => {
  const dispatch = useDispatch();
  const leaderboardData = useSelector((state) => state.leaderboard.entities);
  const isLoading = useSelector((state) => state.leaderboard.loading);
  const error = useSelector((state) => state.leaderboard.error);
  const [participants, setParticipants] = useState([]);
  const [newParticipantName, setNewParticipantName] = useState('');

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const addParticipant = () => {
    setParticipants([...participants, { name: newParticipantName, selections: {}, scores: {} }]);
    setNewParticipantName('');
  };

  const handleSelectionChange = (participantIndex, round, golferId) => {
    const newParticipants = [...participants];
    const participant = newParticipants[participantIndex];
    participant.selections[round] = golferId;

    // Find the golfer and update the score for the participant
    const golfer = leaderboardData?.results?.leaderboard.find(g => g.id === golferId);
    const score = golfer ? golfer.rounds[round - 1]?.total_to_par ?? 'N/A' : 'N/A';
    participant.scores[round] = score;

    setParticipants(newParticipants);
  };

  // Generate columns for selections and results
  let columns = [
    { name: 'Participant', selector: row => row.name, sortable: true },
  ];

  for (let roundIndex = 1; roundIndex <= 4; roundIndex++) {
    columns.push({
      name: `Round ${roundIndex} Selection`,
      cell: (row, index, column, id) => (
        <select
          key={id}
          value={row.selections[`round${roundIndex}`] || ''}
          onChange={(e) => handleSelectionChange(index, `round${roundIndex}`, e.target.value)}
        >
          <option value="">Select Golfer</option>
          {leaderboardData?.results?.leaderboard.map(golfer => (
            <option key={golfer.id} value={golfer.id}>
              {`${golfer.first_name} ${golfer.last_name}`}
            </option>
          ))}
        </select>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });

    columns.push({
      name: `Round ${roundIndex} Score`,
      cell: (row) => row.scores[`round${roundIndex}`] || 'N/A',
      sortable: true
    });
  }

  return (
    <>
      <h2>Swing Wager</h2>
      <div>
        <input
          type="text"
          placeholder="Enter participant name"
          value={newParticipantName}
          onChange={(e) => setNewParticipantName(e.target.value)}
        />
        <button onClick={addParticipant}>Join Game</button>
      </div>
      {isLoading ? (
        <p>Loading leaderboard data...</p>
      ) : error ? (
        <p>Error fetching leaderboard data: {error}</p>
      ) : (
        <DataTable
          title="Golf Leaderboard"
          columns={columns}
          data={participants}
          pagination
          persistTableHead
          customStyles={{
            cells: {
              style: {
                paddingLeft: '8px',
                paddingRight: '8px',
              },
            },
          }}
        />
      )}
    </>
  );
};

export default Home;
