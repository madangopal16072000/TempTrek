import { useState } from "react";
import axios from "axios";

const Form = () => {

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

  return (<>
    <form onSubmit={formSubmitHandler}>
        <div>
      {inputArray.map((value, index) => (
        <div key={index}>
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(index, e)}
          />
          <button type="button" onClick={() => removeInput(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addInput}>
        Add Input
      </button>
      <button type="button" onClick={() => setInputArray([''])}>
        Clear All
      </button>
      {/* You can use inputArray state for further processing or submission */}
    </div>
    <button type = "submit">Submit</button>
    </form>
    {weather && <ul>
    {Object.keys(weather).map((key) => (
      <li key={key}>
        {key}: {weather[key]}
      </li>
    ))}
  </ul>}
    </>
  );
}

export default Form;