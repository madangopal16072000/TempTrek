import { useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function WeatherInput() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

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
        const response = await axios.post("http://localhost:3000/api/v1/getWeather", formData, {
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
    </ThemeProvider>
  );
}