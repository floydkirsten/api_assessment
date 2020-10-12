import React from 'react';

export default function Verification({dateVerification, reposVerification}) {
    return (
        <div id='verification'> 
            <div style={{
                fontSize: '30px', textDecoration:"underline"
            }}> Verification </div> <br/>
            date verification: <div style={{color: dateVerification==="passed"?'green':'red'}}> {dateVerification} </div><br/>
            repos verification: <div style={{color: reposVerification==="passed"?'green':'red'}}> {reposVerification} </div>
        </div>
    )
}