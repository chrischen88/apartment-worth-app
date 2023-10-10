"use client";
import { Container, CssBaseline, Paper, Grid, Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

const getLocalStorageItem = (key: string) => {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
};

const ResultsPage = () => {
    const apiResponseString = getLocalStorageItem('prediction')
    const apiResponse = apiResponseString ? JSON.parse(apiResponseString) : {};
    const isWithinRange = Math.abs(Number(apiResponse['prediction']) - Number(apiResponse['price'])) < 186
    const isCheaper = Number(apiResponse['prediction']) - 186 > Number(apiResponse['price'])
    const router = useRouter();
    console.log(apiResponse);
    return (
        <Container component="main" maxWidth="md">
            <CssBaseline/>
            <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3" align='center'>
                            The AI Model predicts:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4" align='center'>
                            { isWithinRange || isCheaper ? <>It is worth it!</> : <>It is <strong>not</strong> worth it...</>}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" align='center'>
                            The predicted rent is ${Math.round(apiResponse['prediction']*100)/100}.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" align='center'>
                            With the actual rent being ${apiResponse['price']},
                            { isCheaper ? <>it is cheaper than what the model expects.</> :
                                isWithinRange? <>it is within close range of what the model expects.</> :
                                <>it is more expensive than what the model expects.</>
                            }
                        </Typography>
                    </Grid>
                </Grid>
                <Box sx={{display:'flex', justifyContent:"flex-end", mt:5}}>
                    <Button sx={{mx:1, minWidth:100}} variant="contained" color="primary" onClick={() => {router.push('/')}}>Go Back</Button>
                </Box>
            </Paper>
        </Container>
    )
};

export default ResultsPage;