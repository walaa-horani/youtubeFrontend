// index.js
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import YoutubeAnalyticsTable from './youtubeAnalytics';

const Home = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <YoutubeAnalyticsTable />
        </LocalizationProvider>
    );
};

export default Home;
