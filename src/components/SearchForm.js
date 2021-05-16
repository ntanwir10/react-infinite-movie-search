import React from "react";
// import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Search from "./Search";
import Header from "./Header";

function SearchForm({ onSearchInput, onSearchSubmit, searchTerm }) {
  return (
    <Header>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ opacity: 1 }}
      >
        <Grid container item justify="center" alignItems="center" spacing={2}>
          <Grid item sm={6} lg={6}>
            <Search
              onSearchInput={onSearchInput}
              onSearchSubmit={onSearchSubmit}
              searchTerm={searchTerm}
            />
          </Grid>
        </Grid>

        <Grid item xs={8} sm={8} lg={7}></Grid>
      </Grid>
    </Header>
  );
}

export default SearchForm;
