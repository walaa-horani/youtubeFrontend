import { Link } from '@mui/material';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


export default function Home() {
    return (
      <div>
        <h1>Welcome to the Home Page</h1>
       <Link to="/youtubeAnalytics">Go to YouTube Analytics Page</Link>
      </div>
    );
  }
  