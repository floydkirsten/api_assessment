import React, { useState, useEffect } from 'react';

export default function Output({url}) {
    const [ids, setIds] = useState([]);
    let title = '';
    if (url) {
        title = url.substring(40); //substring following the base url
    }

    async function fetchData() {
        try {
            const res = await fetch(url + '?/per_page=1000');
            let response = await res.json();
            let incomingIds = [];
            if (res.status===200) { //if response was ok
                for(let i=0;i<response.length;i++) {
                    incomingIds[i] = response[i]['id'];
                }
            } else { //if couldn't reach url
                incomingIds = ['cannot reach page'];
            }
            setIds(incomingIds);
        } catch (Exception) {
            console.log('could not fetch data');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='output'>
            <div className="set">   
                {title} ids: <br/>
                {ids.map(id => (
                    <div>
                        {id}
                    </div>
                ))}
            </div>
        </div>
    )
}