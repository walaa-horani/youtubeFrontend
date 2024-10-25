import { useEffect, useState } from 'react';
import { 
    Grid, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Typography,
    Button,
    Stack
} from '@mui/material';
import { Download } from 'lucide-react';

const YoutubeAnalyticsTable = () => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [error, setError] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await fetch('https://youtubechannelanalytics.pythonanywhere.com/api/youtube-analytics/', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setAnalyticsData(data);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching analytics data:", error);
            }
        };
        fetchAnalytics();
    }, []);

    const handleDownloadCSV = async () => {
        try {
            setIsDownloading(true);
            const response = await fetch('https://youtubechannelanalytics.pythonanywhere.com/download-analytics-csv/', {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Download failed');
            }
            
            // Create blob from response
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'youtube_analytics.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading CSV file:", error);
            setError("Failed to download CSV file");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack 
                    direction="row" 
                    spacing={2} 
                    sx={{ mb: 2 }}
                    justifyContent="flex-end"
                >
                    <Button
                        variant="contained"
                        startIcon={<Download />}
                        onClick={handleDownloadCSV}
                        disabled={isDownloading}
                    >
                        Download CSV
                    </Button>
                </Stack>
                
                <TableContainer component={Paper} style={{ maxHeight: 400, color: "white" }}>
                    <Typography 
                        style={{ padding: "5px", backgroundColor: '#2d2d2d' }} 
                        variant="h6" 
                        gutterBottom
                    >
                        Analytics Data
                    </Typography>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#90caf9' }}>
                                <TableCell>Date</TableCell>
                                <TableCell>Views</TableCell>
                                <TableCell>Estimated Minutes Watched</TableCell>
                                <TableCell>Average View Duration</TableCell>
                                <TableCell>Average View Percentage</TableCell>
                                <TableCell>Subscribers Gained</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {error ? (
                                <TableRow>
                                    <TableCell colSpan={6}>Error: {error}</TableCell>
                                </TableRow>
                            ) : (
                                Array.isArray(analyticsData) && analyticsData.length > 0 ? (
                                    analyticsData.map((row, index) => (
                                        <TableRow key={index} sx={{ borderBottom: '1px solid #90caf9' }}>
                                            <TableCell>{row.day}</TableCell>
                                            <TableCell>{row.views}</TableCell>
                                            <TableCell>{row.estimated_minutes_watched}</TableCell>
                                            <TableCell>{row.average_view_duration}</TableCell>
                                            <TableCell>{row.averageViewPercentage}</TableCell>
                                            <TableCell>{row.subscribersGained}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6}>No data available</TableCell>
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
