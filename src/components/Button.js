import React from 'react';

export default function Button({onClick}) {
    return (
        <button onClick={onClick} style = {{
            width: '200px',
            height: '50px',
            fontSize: '20px',
            borderRadius:'2em',
            color:'black',
            backgroundColor:'lightblue',
            textAlign:'center',
        }}> 
        call API
        </button>
    )
}