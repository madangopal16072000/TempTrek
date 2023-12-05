import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        All Copyright Reserved
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function Main() {


    const [inputArray, setInputArray] = useState(['']); // State to store the array of inputs
    const [weather, setWeather] = useState({});
    // Function to handle changes in the input fields
    const handleInputChange = (index, event) => {
    const values = [...inputArray];
    values[index] = event.target.value;
    setInputArray(values);
    };

    // Function to add a new input field to the array
    const addInput = () => {
    setInputArray([...inputArray, '']);
    };

    // Function to remove an input field from the array
    const removeInput = (index) => {
    const values = [...inputArray];
    values.splice(index, 1);
    setInputArray(values);
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setWeather(null);

        
        try{
                if(inputArray.length == 0)
                {
                    throw new Error("Input can't be empty");
                }
            
                const formData = {
                    cities : inputArray
                }
            
                console.log(formData);

                const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/getWeather`;
            const response = await axios.post(url, formData, {
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            const data = response.data;
            setWeather(data.data.weather);

        }catch(err){
            console.log(err);
        }
    }



  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Weather Forecast
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Weather Forecast
            </Typography>
            

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
    
                <Typography component="h1" variant="h5">
                    Enter Cities
                </Typography>
                <Box component="form" onSubmit={formSubmitHandler} noValidate sx={{ mt: 1 }}>
                        {inputArray.map((value, index) => (
                            <Grid container spacing={2} alignItems="center" key = {index}>
                            <Grid item>
                                <TextField
                                margin="normal"
                                id="city"
                                label="City"
                                name="city"
                                
                                value = {value}
                                onChange = {(e) => handleInputChange(index, e)}
                                />
                            </Grid>
                            <Grid item>
                                <Button margin = "normal" variant="contained" onClick={() => removeInput(index)}>Remove</Button>
                            </Grid>
                            </Grid>
                        ))}
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={addInput}>Add Input</Button>
                <Button onClick={() => setInputArray([''])}>Clear All</Button>
                </ButtonGroup>

                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Submit
                    </Button>
                    
                </Box>
                </Box>
                </Container>    
                </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    

        {weather && Object.keys(weather).map((key) => (
                    <Grid item key={key} xs={12} sm={6} md={4}>
                        <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                        <CardMedia
                            component="div"
                            sx={{
                            // 16:9
                            pt: '56.25%',
                            }}
                            image="https://source.unsplash.com/random?wallpapers"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            
                            <Typography>
                            {key} : {weather[key]}
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                Madan Gopal
                </Typography>
                <Copyright />
            </Box>


      {/* End footer */}
    </ThemeProvider>
  );
}