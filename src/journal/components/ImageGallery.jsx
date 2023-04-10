import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';



export const ImageGallery = ({ images }) => {
    return (
        <Box sx={{ width: '100%', height: 550, overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={3} gap={8}>
                {images.map(img => (
                    <ImageListItem key={img}>
                        <img
                            src={`${img}?w=248&fit=crop&auto=format`}
                            srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={'Foto de la nota'}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}