import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const YouTubeAnalyticsPage = () => {
    const [analyticsData, setAnalyticsData] = useState([]); // Start with an empty array
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://youtubechannelanalytics.pythonanywhere.com/');
                const data = await response.json();
                console.log(data);  // Log the response here to inspect it
                setAnalyticsData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                YouTube Analytics Data
            </Typography>
            
            {/* Display error message */}
            {error && <Typography color="error">{error}</Typography>}

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TableContainer component={Paper} style={{ maxHeight: 400, color:"white" }}>
                        <Typography style={{ padding: "5px", backgroundColor: '#2d2d2d' }} variant="h6" gutterBottom>
                            Analytics Data (Views, Estimated Minutes Watched, Average View Duration)
                        </Typography>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#90caf9' }}>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Views</TableCell>
                                    <TableCell>Estimated Minutes Watched</TableCell>
                                    <TableCell>Average View Duration</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Ensure analyticsData is an array and not empty */}
                                {Array.isArray(analyticsData) && analyticsData.length > 0 ? (
                                    analyticsData.map((row, index) => (
                                        <TableRow key={index} sx={{ borderBottom: '1px solid #90caf9' }}>
                                            <TableCell>{row.day}</TableCell>
                                            <TableCell>{row.views}</TableCell>
                                            <TableCell>{row.estimated_minutes_watched}</TableCell>
                                            <TableCell>{row.average_view_duration}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4}>No data available</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

export default YouTubeAnalyticsPage;
