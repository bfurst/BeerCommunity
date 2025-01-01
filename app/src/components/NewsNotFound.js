import React from 'react';

export default function NewsNotFound(props) {

    return (
        <div className="error-page" style={styles.container}>
            <div style={styles.modal}>
                <h1 style={styles.header}>Oops! No news found 📰</h1>
                <p style={styles.message}>
                    We couldn't find any news matching your search criteria. Please try again with different keywords.
                </p>
                <p style={styles.message}>
                    Meanwhile, feel free to
                    <a href="mailto:admin@revbeer.info" style={styles.link}> contact us</a> if you need assistance.
                </p>
                <button style={styles.button} onClick={() => props.onReturn()}>
                    Go back
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        backgroundColor: 'transparent',
    },
    modal: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        textAlign: 'center',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    },
    header: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '15px',
    },
    message: {
        fontSize: '1rem',
        marginBottom: '20px',
        color: '#555',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

