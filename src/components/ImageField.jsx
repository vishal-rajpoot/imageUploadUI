import {Box, Button, Grid } from '@mui/material'
import { styled } from '@mui/material'
import { useContext, useRef, useState } from 'react'
import { FilterContext } from '../App';
import axios from 'axios';
import '../styles/instagram.css';
import { Link } from 'react-router-dom';

const StyleBox = styled(Box)({
    background: '#fff',
    minHeight: '20rem',
    maxHeight: '100vh',
    marginBottom: '1rem',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
});

const StyleImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'contain'
})

const ImageField = () => {
    const uploadInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const { filterClass } = useContext(FilterContext);
    console.log(filterClass)

    const handleChangeInput = (e) => {
        console.log(e);
        setSelectedFile(e.target.files[0])
        setImageFile(URL.createObjectURL(e.target.files[0]))
    }

    const renderImage = () => (
        <figure style={{ width: '100%', height:'100%'}}>
            <StyleImage className={filterClass} src={imageFile} alt='' />
        </figure>
    )

    const handleUpload = async () => {
        if (!selectedFile) {
          alert('Please select a file');
          return;
        }
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
      
            const response = await axios.post('http://localhost:8088/api/file/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setUploadProgress(progress);
              }
            });
      
            alert('Upload successful:', response.data);
            setImageFile(null);
            setUploadProgress(0);
          } catch (error) {
            console.error('Upload failed:', error);
          }
    }

  return (
    <Grid item xs = {12} md = {7}>
      <Button className="btn"><Link to="/" className="upload">back</Link></Button>
        <StyleBox onClick={() => uploadInputRef.current && uploadInputRef.current.click()}>
            {imageFile ? renderImage(): <p>Upload Image</p>}
        </StyleBox>
        <input onChange ={handleChangeInput} ref={uploadInputRef} type='file' accept='image/*' hidden/>
        <Button className="btn" onClick= {handleUpload}>Click Here to Upload</Button>
        {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
    </Grid>

  )
}

export default ImageField