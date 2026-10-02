import { useEffect, useState, FormEvent } from 'react';
import { Container, Typography, Card, CardContent, Grid, Box, AppBar, Toolbar, CircularProgress, TextField, Button, Paper } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Job {
  id?: number;
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

  // Form State Vectors
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [source, setSource] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  // Asynchronously fetch current entries from Spring Boot API core
  const fetchJobs = () => {
    fetch('http://192.168.56.101:8080/api/v1/jobs')
      .then((res) => {
        if (!res.ok) throw new Error('API server returned a faulty network status line.');
        return res.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Intercept UI click event and transmit payload to the Backend Controller
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !company || !location || !jobUrl || !source) return;

    setSubmitLoading(true);
    const newJob: Job = { title, company, location, jobUrl, source };

    try {
      const response = await fetch('http://192.168.56.101:8080/api/v1/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) throw new Error('Backend engine rejected data layout parameters.');

      // Clear input fields upon successful write database block execution
      setTitle('');
      setCompany('');
      setLocation('');
      setJobUrl('');
      setSource('');
      
      // Instantly reload visual cards from storage tier
      fetchJobs();
    } catch (err: any) {
      alert(`Submission Block Failure: ${err.message}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh', pb: 5 }}>
      <AppBar position="static" sx={{ bgcolor: '#1a237e' }}>
        <Toolbar>
          <WorkIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            JobFindHub Portal Management Panel — Phase 2 Stack
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        {/* Modern Form Input Component */}
        <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <AddCircleIcon sx={{ color: '#1a237e', mr: 1, fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
              Publish New Job Entry Document
            </Typography>
          </Box>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Job Title Name" variant="outlined" fullWidth required value={title} onChange={(e) => setTitle(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Company Name" variant="outlined" fullWidth required value={company} onChange={(e) => setCompany(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Location (e.g. Remote, India)" variant="outlined" fullWidth required value={location} onChange={(e) => setLocation(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Source Platform (e.g. LinkedIn)" variant="outlined" fullWidth required value={source} onChange={(e) => setSource(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Job Target URL Destination Link" variant="outlined" fullWidth required value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" size="large" sx={{ bgcolor: '#1a237e', px: 4, '&:hover': { bgcolor: '#0d1440' } }} disabled={submitLoading}>
                  {submitLoading ? 'Writing to Database...' : 'Broadcast Job Listing'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mb: 4 }}>
          Live Aggregated Postings
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center" my={5}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Typography variant="h6" color="error" align="center" my={5}>
            ⚠️ Connection Lane Blocked: {error}
          </Typography>
        )}

        {!loading && !error && jobs.length === 0 && (
          <Typography variant="h6" color="textSecondary" align="center" my={5}>
            No active jobs in PostgreSQL storage. Publish a card using the form module above!
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

