import React, { useState } from "react";

const Loading = () => {
  return (
    <div style={loadingStyles.container}>
      <div
        className="spinner-border text-warning"
        role="status"
        style={loadingStyles.spinner}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p style={loadingStyles.message}>Loading Beer Community... 🍻</p>
    </div>
  );
};

const loadingStyles = {
  container: {
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: "4rem",
    height: "4rem",
    marginBottom: "20px",
    borderWidth: "0.4rem",
  },
  message: {
    fontSize: "1.5rem",
    color: "#FFD700",
    textShadow: "1px 1px 2px #000",
  },
};

export { Loading } ;
