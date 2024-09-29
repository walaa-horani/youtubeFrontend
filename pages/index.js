import { Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <h1 style={{"color":"red"}}>Welcome to the Home Page</h1>
            <Link component={Link} to="/youtubeAnalytics">
                Go to YouTube Analytics Page
            </Link>
        </div>
    );
}
