"use client";
import React from 'react';

const ResultsPage = () => {
    const apiResponse = localStorage.getItem('prediction');
    console.log(apiResponse);
    return (
        <>
            <h1>Results</h1>
        </>
    )
};

export default ResultsPage;