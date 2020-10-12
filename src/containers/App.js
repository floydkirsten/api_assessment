import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Output from '../components/Output';
import Verification from '../components/Verification';

export default function App() {
    const [dateVerification, setDateVerification] = useState('...'); //updated after created
    const [reposVerification, setReposVerification] = useState('...'); //reposCount matches reposCount from url
    const [created, setCreated] = useState(); //date of creation
    const [publicRepos, setPublicRepos] = useState(); //repos count from initial api call
    const [publicReposFromUrl, setPublicReposFromUrl] = useState(); //repos count from url
    const [reposUrl, setReposUrl] = useState([]); //url for repos information
    const [updated, setUpdated] = useState(); //date last updated
    const [urls, setUrls] = useState([]); //urls with same base

    function beginVerification() {
        verifyDates();
        verifyRepos();
    }

    function verifyDates() {
        if(updated<created) {
            setDateVerification('passed');
        } else {
            setDateVerification('failed');
        }
    }

    function verifyRepos() {
        getPublicRepos();
        if (publicReposFromUrl === publicRepos) {
            setReposVerification('passed');
        } else {
            setReposVerification('failed');
        }
    }

    async function getPublicRepos() {
        let newUrl = reposUrl + '?per_page=1000'; //to get more than 30 at a time
        let res = await fetch(newUrl);
        try{
            let response = await res.json();
            let length = response.length;
            setPublicReposFromUrl(length);
        } catch (Exception) {
            console.log('invalid URL');
        } 
    }

    async function fetchData() {
        try {
            const res = await fetch('https://api.github.com/orgs/BoomTownROI');
            let response = await res.json();
            setCreated(response.created_at);
            setPublicRepos(response.public_repos);
            setReposUrl(response.repos_url);
            setUpdated(JSON.stringify(response.updated_at));
            setUrls(
                [
                    response.repos_url, 
                    response.events_url, 
                    response.hooks_url, 
                    response.issues_url, 
                    response.members_url, 
                    response.public_members_url
                ]
            )
        } catch (Exception) {
            console.log('could not fetch data');
        }
        beginVerification();
    }
    
    useEffect(() => {
        fetchData();
    }, [created])

    return (
        <div id='app'> 
            <Button onClick={fetchData}/> <br/>
            <div id='main'>
                <div id='left'>
                    <div style={{fontSize: '30px', textDecoration:"underline"}}> Output </div> <br/>
                    {
                        urls && urls.map( url => (
                            <div style={{paddingBottom: '10px'}}>
                                <Output url={url} />
                            </div>
                        ))
                    }
                </div>
                <div id='right'>
                    <Verification dateVerification={dateVerification} reposVerification={reposVerification}/>
                </div>
            </div>
        </div>
    )
}