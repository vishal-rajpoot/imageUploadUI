import { Box, Button, Grid, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";

import '../App.css'

const Images = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8088/api/file/images');
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <>
        <Button className="btn"><Link to="/upload" className="upload">Upload</Link></Button>
        <Grid container spacing={3}>
            {images.map(image => (
                <Grid item key={image.id} xs={12} sm={6} md={4} lg={3}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 1,
                            padding: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            '&:hover': {
                                bgcolor: 'grey',
                            },
                        }}
                    >
                        <img src={image.url} alt={image.name} style={{ 
                            maxWidth: '100%',
                            maxHeight: '100%', 
                            objectFit: 'cover', 
                            borderRadius: '6px' 
                            }} 
                        />
                        <Typography variant="subtitle1" sx={{ marginTop: 1 }}>{image.name}</Typography>
                        <Typography variant="body2" sx={{ color: '#004' }}><time>{formatISO9075(new Date(image.created_date))}</time></Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
        </>
    )
}

export default Images;
