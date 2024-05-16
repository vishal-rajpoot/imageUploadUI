import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import { Container, Grid } from "@mui/material";
import ImageField from "./components/ImageField";
import AllFilters from "./components/AllFilters";
import Images from "./components/Images";

export const FilterContext = createContext();

function App() {
  const [filterClass, setFilterClass] = useState("");

  const value = {
    filterClass,
    setFilterClass,
  };

  return (
    <FilterContext.Provider value={value}>
      <Routes>
        <Route path="/" element={<Images />} />
        <Route path="/upload" element={
          <Container sx={{ marginTop: "4rem", marginBottom: "4rem" }}>
            <Grid container spacing={2} sx= {{
              display: 'flex',
              justifyContent: 'center',
              alignItems:'center'
            }}>
              <ImageField />
              <Grid item xs={12} md={7}>
                <AllFilters />
              </Grid>
            </Grid>
          </Container>
        } />
      </Routes>
    </FilterContext.Provider>
  );
}

function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default MainApp;
