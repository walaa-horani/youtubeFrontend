import { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const YoutubeAnalyticsTable = () => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [error, setError] = useState(null);

   useEffect(() => {
    const fetchAnalytics = async () => {
        try {
            const response = await fetch('https://youtubechannelanalytics.pythonanywhere.com/fetch-analytics-data/');
            console.log("Response Status:", response.status); // Log the response status
            console.log("Response Headers:", response.headers); // Log response headers

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            console.log("Fetched analytics data:", data); // Log the fetched data

            setAnalyticsData(data); // Set the state with fetched data
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
                    <TableCell>{row.estimated_minutes_watched}</TableCell> {/* Corrected to match JSON keys */}
                    <TableCell>{row.average_view_duration}</TableCell> {/* Corrected to match JSON keys */}
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
