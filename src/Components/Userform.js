import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Checkbox, Button, FormControlLabel,Select,MenuItem,Typography } from '@mui/material';
import axios from 'axios';

const Userform = () => {
//  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  const watchResidentialAddress = watch('residentialAddress');

  const handleCopyAddress = (e) => {
    if (e.target.checked) {
      setValue('permanentAddress', watchResidentialAddress);
    } else {
      setValue('permanentAddress', '');

    }
  };
 const validateDateOfBirth = (value) => {
    // Custom validation to check if the user is 18 years old or above
    const currentDate = new Date();
    const selectedDate = new Date(value);
    const cutoffDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    return selectedDate <= cutoffDate;
  };
  const watchFiletype = watch('filetype');

  const handleFiletypeChange = (e) => {
    setValue('file', ''); // Clear the previously uploaded file when the file type is changed
  };

  const validateFile = (value) => {
    // Custom validation to check the file type based on the selected file type
    if (watchFiletype === 'image') {
      if (value[0]?.type !== 'image/jpeg' && value[0]?.type !== 'image/png') {
        return 'Only JPG and PNG images are allowed';
      }
    } else if (watchFiletype === 'pdf') {
      if (value[0]?.type !== 'application/pdf') {
        return 'Only PDF files are allowed';
      }
    }
    return true;
  };
  const onSubmit = async(data) => {
    try {
      const formData = new FormData();
  
      // Append form data
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('dateOfBirth', data.dateOfBirth);
      formData.append('residentialAddress', data.residentialAddress);
      formData.append('permanentAddress', data.permanentAddress);
      formData.append('filetype', data.filetype);
      formData.append('file', data.file[0]); // Append the file object (assuming it's an array with one file)
  
      // Make the POST request with FormData
      const response = await axios.post('http://localhost:5000/usersinfo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
  
      // Handle the response from the backend if needed
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: 'First Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              variant="outlined"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />
      </div>

      <div>
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: 'Last Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              variant="outlined"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />
      </div>

      <div>
        <TextField
          type="date"
          label="Date of Birth"
          variant="outlined"
          error={!!errors.dateOfBirth}
          helperText={errors.dateOfBirth?.message}
          {...register('dateOfBirth', {
            required: 'Date of Birth is required',
            validate: (value) => validateDateOfBirth(value) || 'You must be 18 years or older',
          })}
        />
      </div>

      <div>
        <Controller
          name="residentialAddress"
          control={control}
          defaultValue=""
          rules={{ required: 'Residential Address is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Residential Address"
              variant="outlined"
              error={!!errors.residentialAddress}
              helperText={errors.residentialAddress?.message}
            />
          )}
        />
      </div>

      <div>
        <Controller
          name="permanentAddress"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Permanent Address"
              variant="outlined"
            />
          )}
        />
      </div>

      <div>
        <FormControlLabel
          control={
            <Checkbox
              name="copyAddress"
              id="copyAddress"
              onChange={handleCopyAddress}
            />
          }
          label="Copy Residential Address to Permanent Address"
        />
      </div>
<TextField
label="Filename"
>Filename</TextField>
<div>
        <Controller
          name="filetype"
          control={control}
          defaultValue="image"
          render={({ field }) => (
            <Select
              {...field}
              label="Filetype"
              onChange={(e) => {
                handleFiletypeChange(e);
                field.onChange(e);
              }}
            >
              <MenuItem value="image">Image</MenuItem>
              <MenuItem value="pdf">PDF</MenuItem>
            </Select>
          )}
        />
      </div>
      
      <div>
        <TextField
          type="file"
          {...register('file', {
            required: 'Please select a file',
            validate: (value) => validateFile(value) || 'Invalid file type',
          })}
        />
        {errors.file && <Typography variant="body2" color="error"><p>{errors.file.message}</p></Typography>
        }
      </div>

     
      <div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
   
  </> 
  );
};

export default Userform;
