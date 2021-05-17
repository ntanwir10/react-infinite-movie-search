import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Item = React.memo(({ movie }) => {
  const POSTER_IMAGE = `https://image.tmdb.org/t/p/w342`;

  return (
    <Grid container item xs={4} direction="row" justify="space-evenly">
      {movie.poster_path ? (
        <>
          <img
            style={{ height: "7rem", borderRadius: "5px" }}
            alt={`poster image of ${movie.title}`}
            src={`${POSTER_IMAGE}${movie.poster_path}`}
          />
          <Typography variant="caption">{movie.title}</Typography>
        </>
      ) : (
        <img
          style={{
            height: "7rem",
            maxWidth: "90%",
            display: "inline-block",
          }}
          alt="placeholder image"
          src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png"
        />
      )}
    </Grid>
  );
});

export default React.memo(Item);
