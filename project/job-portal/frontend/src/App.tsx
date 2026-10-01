import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Box, AppBar, Toolbar, CircularProgress } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

// Explicitly define our Type interface to prevent compilation bugs
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  jobUrl: string;
  source: string;
}

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Hook into our lifecycle to reach out and pull data from our Spring Boot API engine
  useEffect(() => {
    fetch('http://192.168.56.101:8080/api/v1/jobs')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to communicate with our system API gateway backend.');
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#1a237e' }}>
        <Toolbar>
          <WorkIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            JobFindHub Portal — Phase 1 Monolith
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mb: 4 }}>
          Latest Available Job Opportunities
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center" my={5}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Typography variant="h6" color="error" align="center" my={5}>
            ⚠️ Error: {error}
          </Typography>
        )}

        {!loading && !error && jobs.length === 0 && (
          <Typography variant="h6" color="textSecondary" align="center" my={5}>
            No jobs found in the database. Add data to begin listing!
          </Typography>
        )}

        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 6 } }}>
                <CardContent>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                    {job.title}
                  </Typography>
                  <Typography color="textSecondary" sx={{ mb: 1, fontWeight: 500 }}>
                    🏢 {job.company}
                  </Typography>
                  <Typography variant="body2" component="p" color="textSecondary" sx={{ mb: 2 }}>
                    📍 {job.location}
                  </Typography>
                  <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ bgcolor: '#e0e0e0', px: 1, py: 0.5, borderRadius: 1, fontWeight: 'bold' }}>
                      {job.source}
                    </Typography>
                    <a href={job.jobUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold', fontSize: '0.875rem' }}>
                      Apply Now →
                    </a>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;

