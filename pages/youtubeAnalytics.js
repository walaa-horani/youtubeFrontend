import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download } from 'lucide-react';
import { format } from 'date-fns';

const YoutubeAnalyticsTable = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [startDate, setStartDate] = useState(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(
          `https://youtubechannelanalytics.pythonanywhere.com/fetch-analytics-data/?start_date=${format(startDate, 'yyyy-MM-dd')}&end_date=${format(endDate, 'yyyy-MM-dd')}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

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
  }, [startDate, endDate]);

  const handleDownloadCSV = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(
        'https://youtubechannelanalytics.pythonanywhere.com/download-analytics-csv/',
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to download CSV');
      }

      // Create blob from response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `youtube_analytics_${format(new Date(), 'yyyy-MM-dd')}.csv`;
      
      // Trigger download
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      setError(error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Analytics Data</CardTitle>
        <Button 
          onClick={handleDownloadCSV}
          disabled={isDownloading}
          className="ml-4"
        >
          <Download className="mr-2 h-4 w-4" />
          Download CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Est. Minutes Watched</TableHead>
                <TableHead>Avg View Duration</TableHead>
                <TableHead>Avg View Percentage</TableHead>
                <TableHead>Subscribers Gained</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-red-500">
                    Error: {error}
                  </TableCell>
                </TableRow>
              ) : analyticsData.length > 0 ? (
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
                  <TableCell colSpan={6} className="text-center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default YoutubeAnalyticsTable;
