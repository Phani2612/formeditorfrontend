import React, { useState } from 'react';
import '../styles/Comprehension.css';
import swal from 'sweetalert';

const Comprehension = ({ onSave }) => {
  const [passage, setPassage] = useState('');
  const [questions, setQuestions] = useState([]);
  const [image, setImage] = useState(null);
 

  // Add a new question with default empty options
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      },
    ]);
  };

  // Update question text
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
  };

  // Update option text
  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Set the correct answer
  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = value;
    setQuestions(updatedQuestions);
  };




  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Store the image as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };



  // Save comprehension
 




  const handleSave = () => {
    // Validation
    if (!passage.trim()) {
      swal({
        title: "Missing Passage!",
        text: "Please enter the passage before saving.",
        icon: "warning",
        buttons: "OK",
      });
      return;
    }
  
    if (!questions || questions.length === 0) {
      swal({
        title: "Missing Questions!",
        text: "Please add at least one question to the comprehension.",
        icon: "warning",
        buttons: "OK",
      });
      return;
    }
  
    // if (!image) {
    //   swal({
    //     title: "Missing Image!",
    //     text: "Please upload an image for the comprehension.",
    //     icon: "warning",
    //     buttons: "OK",
    //   });
    //   return;
    // }
  
    // If all validations pass, proceed with saving
    onSave({
      type: 'Comprehension',
      passage,
      questions,
      image,
    });
  
    swal({
      title: "Success!",
      text: "Your Comprehension question has been saved successfully.",
      icon: "success",
      buttons: "OK",
    });
  };













  return (
    <div className="comprehension-question p-6 border rounded-lg bg-white shadow-md max-w-3xl mx-auto">
  <h3 className="text-xl font-semibold text-gray-700 mb-6">Create a Comprehension</h3>

  {/* Passage Input */}
  <textarea
    value={passage}
    onChange={(e) => setPassage(e.target.value)}
    placeholder="Enter the passage here"
    className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    rows={5}
  ></textarea>

  {/* Questions Section */}
  {questions.map((question, qIndex) => (
    <div key={qIndex} className="mb-6">
      <textarea
        value={question.text}
        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
        placeholder={`Question ${qIndex + 1}`}
        className="w-full p-3 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      {/* Options Section */}
      <div className="options mb-4">
        {question.options.map((option, oIndex) => (
          <div key={oIndex} className="flex flex-col sm:flex-row items-start sm:items-center mb-3">
            <input
              type="radio"
              name={`correctAnswer-${qIndex}`}
              checked={question.correctAnswer === option}
              onChange={() => handleCorrectAnswerChange(qIndex, option)}
              className="mr-2"
            />
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
              placeholder={`Option ${oIndex + 1}`}
              className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500">Select the correct answer above.</p>
    </div>
  ))}

  {/* Image Upload */}
  <div className="image-upload mt-6">
    <h4 className="font-medium mb-2">Upload Image</h4>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="mt-2 p-3 border rounded-md w-full"
    />
    {image && (
      <div className="mt-4 flex justify-center">
        <img
          src={image}
          alt="Uploaded Preview"
          className="w-32 h-32 object-cover border rounded-md"
        />
      </div>
    )}
  </div>

  {/* Add Question Button */}
  <button
    onClick={handleAddQuestion}
    className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    Add Question
  </button>

  {/* Save Button */}
  <button
    onClick={handleSave}
    className="bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
  >
    Save Comprehension
  </button>
</div>

  );
};

export default Comprehension;