import React from "react";
import Header from "./components/Header";
import ProfileHeader from "./components/ProfileHeader";

import Footer from "./components/Footer";
import "./App.css";


function App() {
  return (
    <div className="App">
      <Header />
      <ProfileHeader />
      <Footer />
    </div>
  );
}

export default App;