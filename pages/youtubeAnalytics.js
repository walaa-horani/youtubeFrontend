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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Download } from 'lucide-react';
import dayjs from 'dayjs';

const YoutubeAnalyticsTable = () => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [error, setError] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [startDate, setStartDate] = useState(dayjs().subtract(1, 'year'));
    const [endDate, setEndDate] = useState(dayjs());
    const [selectedStartDate, setSelectedStartDate] = useState(dayjs().subtract(1, 'year'));
    const [selectedEndDate, setSelectedEndDate] = useState(dayjs());

    const fetchAnalytics = async () => {
    try {
        const url = `https://youtubechannelanalytics.pythonanywhere.com/fetch-analytics-data/?start_date=${selectedStartDate.format('YYYY-MM-DD')}&end_date=${selectedEndDate.format('YYYY-MM-DD')}&_=${new Date().getTime()}`;
        console.log(`Fetching from URL: ${url}`);
        const response = await fetch(url, {
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


    const handleFilterClick = () => {
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
        fetchAnalytics();
    };

    const handleDownloadCSV = async () => {
        try {
            setIsDownloading(true);
            
            // Format the dates as strings in 'YYYY-MM-DD' format
            const startDate = selectedStartDate.format('YYYY-MM-DD');
            const endDate = selectedEndDate.format('YYYY-MM-DD');
    
            // Append the dates as query parameters to the download URL
            const url = `https://youtubechannelanalytics.pythonanywhere.com/download-analytics-csv/?start_date=${startDate}&end_date=${endDate}`;
    
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
            });
    
            if (!response.ok) {
                throw new Error('Failed to download CSV');
            }
    
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = downloadUrl;
            a.download = `youtube_analytics_${dayjs().format('YYYY-MM-DD')}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading CSV:", error);
            setError(error.message);
        } finally {
            setIsDownloading(false);
        }
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }} justifyContent="space-between">
                        <Stack direction="row" spacing={2}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                maxDate={dayjs().subtract(1, 'day')}
                            />
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                                maxDate={dayjs()}
                            />
                            <Button variant="contained" onClick={handleFilterClick}>
                                Filter
                            </Button>
                        </Stack>
                        <Button
                            variant="contained"
                            startIcon={<Download />}
                            onClick={handleDownloadCSV}
                            disabled={isDownloading}
                        >
                            {isDownloading ? 'Downloading...' : 'Download CSV'}
                        </Button>
                    </Stack>

                    <TableContainer component={Paper} style={{ maxHeight: 400 }}>
                        <Typography style={{ padding: "5px", backgroundColor: '#2d2d2d', color: 'white' }} variant="h6" gutterBottom>
                            Analytics Data
                        </Typography>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#90caf9' }}>
                                    <TableCell>Country</TableCell>
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
                                        <TableCell colSpan={6} style={{ color: 'red' }}>Error: {error}</TableCell>
                                    </TableRow>
                                ) : (
                                    Array.isArray(analyticsData) && analyticsData.length > 0 ? (
                                        analyticsData.map((row, index) => (
                                            <TableRow key={index}>
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
        </LocalizationProvider>
    );
};

export default YoutubeAnalyticsTable;
