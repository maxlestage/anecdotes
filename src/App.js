import { useState } from "react";

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
];

function random() {
  return Math.floor(Math.random() * anecdotes.length);
}

const App = () => {
  // Pour avoir une phrase de façon aléatoire :
  const [selected, setSelected] = useState(random());

  // Pour les votes :
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  // console.log(vote);

  let voteSelected = votes[selected];

  function voted() {
    setVotes({ ...votes, [selected]: (voteSelected += 1) });
  }

  function getMostRatedAnecdote() {
    if (Object.values(votes).some((value) => value !== 0)) {
      const anectodeId = Object.entries(votes).reduce(
        (vote, mostVoted) => (vote[1] > mostVoted[1] ? vote : mostVoted),
        votes[0]
      )[0];
      return anectodeId;
    } else {
      return -1;
    }
  }

  const mostRatedAnecdote = getMostRatedAnecdote();

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <p>has {voteSelected} votes</p>
      <button
        onClick={() => {
          voted();
        }}
      >
        vote
      </button>
      <button
        onClick={() => {
          setSelected(random());
        }}
      >
        next anecdote
      </button>
      <h2>Anecdote with the most votes</h2>

      {mostRatedAnecdote === -1 ? (
        <p>Il n'y a pas encore eu de notes</p>
      ) : (
        <p>
          "{anecdotes[mostRatedAnecdote]}" has {votes[mostRatedAnecdote]}{" "}
          vote(s)
        </p>
      )}
    </>
  );
};

export default App;
