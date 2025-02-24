import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './components/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setImageUrl } from './redux/reducers/imageUrlSlice';

function App() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [upload, setUpload] = useState<number>(0);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUpload(1)
    if (!image) {
      toast.error('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {

      // Replace '/api/upload' with your actual endpoint
      const response = await axios.post('http://localhost:8000/api/image/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
          setUploadProgress(percentCompleted);
        }
      });
      toast.success('Image uploaded successfully!');
      const imageUrl = response.data.image_url
      dispatch(setImageUrl(imageUrl))

      navigate('/resize')
    } catch (error) {

      toast.error('Error uploading image. Please try again.');
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Resizer</h1>
        <p>Easily resize images online for free.</p>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="image-uploader" onDragOver={handleDragOver} onDrop={handleDrop}>
            {preview ? (
              <img src={preview} alt="Preview" className="preview-image" />
            ) : (
              <div className="upload-placeholder">
                <p>Select Image</p>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <p>or, drag and drop an image here</p>
              </div>
            )}
          </div>
          <button type="submit">Upload Image</button>
          {upload==1 && (
            <Loader fileName={image!.name} progress={uploadProgress} />
          )}
        </form>
        <footer>
          <div className="feature">Perfect quality</div>
          <div className="feature">Lightning Fast</div>
          <div className="feature">Easy to Use</div>
        </footer>
      </main>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default App;