import { Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <MuiLink component={Link} to="/youtubeAnalytics">
                Go to YouTube Analytics Page
            </MuiLink>
        </div>
    );
}
