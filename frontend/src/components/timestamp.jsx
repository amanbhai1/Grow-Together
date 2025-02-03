import React from 'react'

const Timestamp = (item) => {

    const date = new Date(item.timestamp);

    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const styles = {
        color: '#ffffff',
        fontSize: '10px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor:'#0D9488',
        width: 'fit-content',
        padding: '5px',
        borderRadius: '6px'
      };

    return (
        <p style={styles} className='ts'>{formattedTime} | {formattedDate}</p>
    )
}

export default Timestamp;