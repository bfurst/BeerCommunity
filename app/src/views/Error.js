import React, { useState } from "react";

export default function Error() {

    return (
        <div className="error-page" style={styles.container}>
                <div style={styles.modal}>
                    <h1 style={styles.header}>Oops! Something went wrong 🍺</h1>
                    <p style={styles.message}>
                        We couldn't process your request. Our team is already on it!
                    </p>
                    <p style={styles.message}>
                        Meanwhile, grab a beer and relax. If the problem persists, feel free to
                        <a href="mailto:admin@revbeer.com" style={styles.link}> contact us</a>.
                    </p>
                    <button style={styles.button} onClick={() => window.history.back()}>
                        Go back
                    </button>
                </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "50px",
        backgroundColor: "transparent", // Prozirna pozadina
        color: "#333",
        fontFamily: "Arial, sans-serif",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    modal: {
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Poluprozirna bela pozadina
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        maxWidth: "500px",
        textAlign: "center",
    },
    header: {
        fontSize: "2rem",
        marginBottom: "20px",
        color: "#663399", // Tamnija ljubičasta boja
    },
    message: {
        fontSize: "1.1rem",
        marginBottom: "15px",
        lineHeight: "1.6",
    },
    link: {
        color: "#007bff",
        textDecoration: "none",
    },
    button: {
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#ff9900", // Pivska žuta boja
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
};