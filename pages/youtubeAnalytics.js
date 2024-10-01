import { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const YoutubeAnalyticsTable = () => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await fetch('/fetch-analytics-data/'); // Use relative URL for deployment
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setAnalyticsData(data); // Adjusted to match the response structure
            } catch (error) {
                setError(error.message);
                console.error("Error fetching analytics data:", error); // Log error for debugging
            }
        };

        fetchAnalytics();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TableContainer component={Paper} style={{ maxHeight: 400, color: "white" }}>
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
                            {error ? (
                                <TableRow>
                                    <TableCell colSpan={4}>Error: {error}</TableCell>
                                </TableRow>
                            ) : (
                                Array.isArray(analyticsData) && analyticsData.length > 0 ? (
                                    analyticsData.map((row, index) => (
                                        <TableRow key={index} sx={{ borderBottom: '1px solid #90caf9' }}>
                                            <TableCell>{row.day}</TableCell>
                                            <TableCell>{row.views}</TableCell>
                                            <TableCell>{row.estimatedMinutesWatched}</TableCell>
                                            <TableCell>{row.averageViewDuration}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4}>No data available</TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default YoutubeAnalyticsTable;
