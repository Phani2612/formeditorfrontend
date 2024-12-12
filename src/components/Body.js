import React, { useState } from 'react';
import '../styles/Body.css';
import Categorize from './Categorize';
import Cloze from './Cloze';
import Comprehension from './Comprehension';
import { SERVER_URL } from './URL';
import swal from 'sweetalert';

function Body() {
  const [selectedType, setSelectedType] = useState('');
  const [questions, setQuestions] = useState([]);
  const [generatedLink, setGeneratedLink] = useState(null);
  const [headerImage, setHeaderImage] = useState(null);  // State for header image

  const handleSaveQuestion = (newQuestion) => {

    

    


    setQuestions([...questions, newQuestion]);
  };

  
  console.log(questions)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("headerImage", file);

      // Send the image to the server to handle the upload
      fetch(`${SERVER_URL}/upload-header-image`, {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.imageUrl) {
            setHeaderImage(data.imageUrl);  // Store the URL of the uploaded image
          }
        })
        .catch(err => {
          console.error('Error uploading image:', err);
        });
    }
  };


  const handleSaveForm = async () => {


     if(questions.length == 0){

      swal({
        title: "No Questions Found!",
        text: "Please create a type of question before saving the form.",
        icon: "warning",
        buttons: "OK",
      });
      return;
     }

    try {
      const formData = { questions, headerImage };  // Include the image URL in the form data
      const response = await fetch(`${SERVER_URL}/savequestion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedLink(data.link);
        alert('Form saved successfully!');
      }
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
  <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Create Your Form
    </h1>

    {/* Image Upload Section */}
    <div className="mb-6">
      <label htmlFor="headerImage" className="block text-gray-700">
        Upload Header Image
      </label>
      <input
        type="file"
        id="headerImage"
        onChange={handleImageChange}
        className="mt-2 p-2 border border-gray-300 rounded-md w-full md:w-auto"
      />
      {headerImage && (
        <div className="mt-4">
          <img
            src={`${SERVER_URL}${headerImage}`}
            alt="Header"
            className="w-24 h-24 object-cover"
          />
        </div>
      )}
    </div>

    {/* Question Type Buttons */}
    <div className="flex flex-wrap justify-center space-x-4 mb-6 gap-2">
      <button
        onClick={() => setSelectedType('Categorize')}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition w-full sm:w-auto"
      >
        Add Categorize
      </button>
      <button
        onClick={() => setSelectedType('Cloze')}
        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition w-full sm:w-auto"
      >
        Add Cloze
      </button>
      <button
        onClick={() => setSelectedType('Comprehension')}
        className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600 transition w-full sm:w-auto"
      >
        Add Comprehension
      </button>
    </div>

    {/* Render Selected Question Type */}
    <div className="mb-6">
      {selectedType === 'Categorize' && <Categorize onSave={handleSaveQuestion} />}
      {selectedType === 'Cloze' && <Cloze onSave={handleSaveQuestion} />}
      {selectedType === 'Comprehension' && <Comprehension onSave={handleSaveQuestion} />}
    </div>

    {/* Save Form Button */}
    <div className="mt-6 text-center">
      <button
        onClick={handleSaveForm}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full sm:w-auto"
      >
        Save Form
      </button>
    </div>

    {/* Form Link */}
    {generatedLink && (
      <div className="mt-6 text-center bg-green-100 p-4 rounded">
        <p className="text-green-700 font-medium">Your form is ready!</p>
        <a
          href={generatedLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {generatedLink}
        </a>
      </div>
    )}
  </div>
</div>

  );
}

export default Body;
