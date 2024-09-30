import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import { Link } from '@mui/material';

const YouTubeAnalyticsPage = () => {
    const [viewerData, setViewerData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [deviceTypeData, setDeviceTypeData] = useState([]); // 
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://youtubechannelanalytics.pythonanywhere.com/');
                 console.log(response.data);
                setViewerData(response.data.viewer_data);
                setCountryData(response.data.country_data);
                setDeviceTypeData(response.data.device_type_data); 

            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

   

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                YouTube Analytics Data
            </Typography>
            {error && <Typography color="error">Error: {error}</Typography>}

            {/* Button to get access link */}
          

           

            <Grid container spacing={3}>
              
                <Grid item xs={12} md={4}>
                    <TableContainer
                        component={Paper}
                        style={{
                            maxHeight: 400,
                          
                            color:"white",
                            
                        }}
                    >
                        <Typography  style={{"padding":"5px",  backgroundColor: '#2d2d2d'}}  variant="h6" gutterBottom>
                            Viewer Data
                        </Typography>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#90caf9' }}>
                                    <TableCell>Age Group</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Viewer Percentage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {viewerData.length > 0 ? (
                                    viewerData.map((row, index) => (
                                        <TableRow key={index} sx={{ borderBottom: '1px solid #90caf9' }}>
                                            <TableCell>{row[0]}</TableCell>
                                            <TableCell>{row[1]}</TableCell>
                                            <TableCell>{row[2]}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3}>No  data available</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Country Data Table */}
                <Grid item xs={12} md={4}>
                    <TableContainer 
                        component={Paper}
                        style={{
                            maxHeight: 400,
                           
                            color:"white",
                        }}
                    >
                        <Typography style={{"padding":"5px",  backgroundColor: '#2d2d2d'}}  variant="h6" gutterBottom>
                            Country Data
                        </Typography>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#ce93d8' }}>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Views</TableCell>
                                    <TableCell>Likes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {countryData.length > 0 ? (
                                    countryData.map((row, index) => (
                                        <TableRow key={index} sx={{ borderBottom: '1px solid #ce93d8' }}>
                                            <TableCell>{row[0]}</TableCell>
                                            <TableCell>{row[1]}</TableCell>
                                            <TableCell>{row[2]}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3}>No  data available</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Annotation Data Table */}
                <Grid item xs={12} md={4}>
                    <TableContainer
                        component={Paper}
                        style={{
                            maxHeight: 400,
                           
                            color:"white",
                        }}
                    >
                        <Typography style={{"padding":"5px",  backgroundColor: '#2d2d2d'}}  variant="h6" gutterBottom>
                        device Type
                        </Typography>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#a5d6a7' }}>
                                    <TableCell>views</TableCell>
                                    <TableCell>estimated Minutes Watched</TableCell>
                                    <TableCell>views</TableCell>

                                   
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {deviceTypeData.length > 0 ? (
                                    deviceTypeData.map((row, index) => (
                                        <TableRow key={index} sx={{ borderBottom: '1px solid #a5d6a7' }}>
                                            <TableCell>{row[0]}</TableCell>
                                            <TableCell>{row[1]}</TableCell>
                                            <TableCell>{row[2]}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3}>No  data available</TableCell>
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
