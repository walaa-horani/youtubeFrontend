import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link href="/youtubeAnalytics">Go to YouTube Analytics Page</Link>
    </div>
  );
}