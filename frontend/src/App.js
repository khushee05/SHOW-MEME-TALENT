import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('caption', caption);

        try {
            await axios.post('http://localhost:4000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image: gshgh', error);
            alert('Error uploading image');
        }
    };

    return (
        <div>
            <h2>Upload Image</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="image">Select Image:</label>
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                </div>
                <div>
                    <label htmlFor="caption">Caption:</label>
                    <input type="text" id="caption" value={caption} onChange={handleCaptionChange} />
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadImage;
