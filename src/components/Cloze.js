// import React, { useState } from 'react';
// import { useDrag, useDrop } from 'react-dnd';
// import '../styles/Cloze.css';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend'; // Backend for drag-and-drop

// // Item type for drag-and-drop
// const ItemTypes = {
//   OPTION: 'option',
// };

// const Cloze = ({ onSave }) => {
//   const [questionText, setQuestionText] = useState('');
//   const [image, setImage] = useState(null);
//   const [blanks, setBlanks] = useState([]); // Track words that are underlined
//   const [options, setOptions] = useState([]); // Track options to show in the answer section
//   const [selectedText, setSelectedText] = useState(''); // To store the selected text
  

//   // Function to add an underlined word (blank) and generate options
//   const handleTextChange = (e) => {
//     const text = e.target.value;
//     setQuestionText(text);

//     // Detect underlined words and add them to blanks
//     const regex = /\_(.*?)\_/g;
//     let match;
//     const newBlanks = [];
//     while ((match = regex.exec(text)) !== null) {
//       newBlanks.push(match[1]);
//     }

//     setBlanks(newBlanks);

//     // Automatically create wrong options (example: add 3 random words for now)
//     const wrongOptions = generateWrongOptions(newBlanks);
//     setOptions([...newBlanks, ...wrongOptions]);
//   };

//   // Function to generate wrong options (dummy implementation for now)
//   const generateWrongOptions = (blanks) => {
//     const wrongAnswers = ['apple', 'banana', 'orange', 'grape', 'pear']; // Add more as needed
//     return wrongAnswers.filter((option) => !blanks.includes(option)).slice(0, 3);
//   };

//   // Function to replace underlined words with blanks in the preview
//   const formatPreviewText = (text) => {
//     return text.replace(/\_(.*?)\_/g, '______');
//   };

//   // Handle selection of text and make the underline option visible
//   const handleTextSelection = () => {
//     const selected = window.getSelection().toString();
//     if (selected) {
//       setSelectedText(selected);
//     }
//   };

//   // Handle applying the underline to the selected text
//   const handleUnderlineText = () => {
//     if (selectedText) {
//       // Replace the selected text with _selectedText_
//       const updatedText = questionText.replace(selectedText, `_${selectedText}_`);
//       setQuestionText(updatedText);
//       setBlanks([...blanks, selectedText]); // Add the selected text to blanks

//       // Automatically create wrong options
//       const wrongOptions = generateWrongOptions([...blanks, selectedText]);
//       setOptions([...blanks, selectedText, ...wrongOptions]);

//     //   setSelectedText(''); // Clear the selection after underlining
//     }
//   };

//   // Function to create the blank sentence to be sent to onSave
//   const createBlankSentence = () => {
//     let blankSentence = questionText;
//     blanks.forEach((blank) => {
//       blankSentence = blankSentence.replace(blank, '______');
//     });
//     return blankSentence;
//   };

//   // Handle saving the question data
//   const handleSave = () => {
//     const blankSentence = createBlankSentence(); // Create the blank sentence
//     onSave({
//       type: 'Cloze',
//       questionText: blankSentence, // Send the blank sentence to onSave
//       blanks,
//       options,
//       image,
//       correct_cloze_Answer:selectedText
//     });
//   };


//   console.log(selectedText)

//   // Drag-and-drop option component
//   const DraggableOption = ({ option, index, moveOption }) => {
//     const [, drag] = useDrag({
//       type: ItemTypes.OPTION,
//       item: { index },
//     });

//     const [, drop] = useDrop({
//       accept: ItemTypes.OPTION,
//       hover: (item) => {
//         if (item.index !== index) {
//           moveOption(item.index, index);
//         }
//       },
//     });

//     return (
//       <div
//         ref={(node) => drag(drop(node))}
//         className="option p-2 mb-2 bg-blue-500 text-white rounded shadow-md cursor-pointer"
//       >
//         {option}
//       </div>
//     );
//   };

//   // Move an option in the list
//   const moveOption = (fromIndex, toIndex) => {
//     const newOptions = [...options];
//     const [movedOption] = newOptions.splice(fromIndex, 1);
//     newOptions.splice(toIndex, 0, movedOption);
//     setOptions(newOptions);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="cloze-question p-4 border rounded">
//         <h3 className="text-lg font-semibold">Create a Cloze Question</h3>

//         {/* Display the input text area */}
//         <textarea
//           value={questionText}
//           onChange={handleTextChange}
//           placeholder="Enter your sentence with blanks (underline words using '_word_')"
//           className="w-full p-2 border rounded"
//           rows={5}
//           onMouseUp={handleTextSelection} // Trigger text selection when the mouse is released
//         />

//         {/* Show the underline option when text is selected */}
//         {selectedText && (
//           <button
//             onClick={handleUnderlineText}
//             className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
//           >
//             Underline "{selectedText}"
//           </button>
//         )}

//         {/* Preview section */}
//         <div className="preview mt-4 p-2 bg-gray-100 rounded">
//           <h4 className="font-semibold">Preview</h4>
//           <div className="text-lg">{formatPreviewText(questionText)}</div>
//         </div>

//         {/* Options section */}
//         <div className="options mt-4">
//           <h4 className="font-semibold">Options</h4>
//           {options.map((option, index) => (
//             <DraggableOption key={index} option={option} index={index} moveOption={moveOption} />
//           ))}
//         </div>

//         {/* Image upload section */}
//         <input
//           type="file"
//           onChange={(e) => setImage(e.target.files[0])}
//           className="mt-4"
//         />

//         {/* Save button */}
//         <button
//           onClick={handleSave}
//           className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Save Question
//         </button>
//       </div>
//     </DndProvider>
//   );
// };

// export default Cloze;







// import React, { useState } from 'react';
// import { useDrag, useDrop } from 'react-dnd';
// import '../styles/Cloze.css';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// const ItemTypes = {
//   OPTION: 'option',
// };

// const Cloze = ({ onSave }) => {
//   const [questionText, setQuestionText] = useState('');
//   const [image, setImage] = useState(null);
//   const [blanks, setBlanks] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [selectedText, setSelectedText] = useState('');
//   const [newOption, setNewOption] = useState(''); // To store the new option being added

//   const handleTextChange = (e) => {
//     const text = e.target.value;
//     setQuestionText(text);

//     const regex = /\_(.*?)\_/g;
//     let match;
//     const newBlanks = [];
//     while ((match = regex.exec(text)) !== null) {
//       newBlanks.push(match[1]);
//     }

//     setBlanks(newBlanks);
//     // const wrongOptions = generateWrongOptions(newBlanks);
//     setOptions([...newBlanks]);
//   };

 
//   const formatPreviewText = (text) => {
//     return text.replace(/\_(.*?)\_/g, '______');
//   };

//   const handleTextSelection = () => {
//     const selected = window.getSelection().toString();
//     if (selected) {
//       setSelectedText(selected);
//     }
//   };

//   const handleUnderlineText = () => {
//     if (selectedText) {
//       const updatedText = questionText.replace(selectedText, `_${selectedText}_`);
//       setQuestionText(updatedText);
//       setBlanks([...blanks, selectedText]);

//     //   const wrongOptions = generateWrongOptions([...blanks, selectedText]);
//       setOptions([...blanks, selectedText]);
//     }
//   };

//   const createBlankSentence = () => {
//     let blankSentence = questionText;
//     blanks.forEach((blank) => {
//       blankSentence = blankSentence.replace(blank, '______');
//     });
//     return blankSentence;
//   };

//   const handleSave = () => {
//     const blankSentence = createBlankSentence();
//     onSave({
//       type: 'Cloze',
//       questionText: blankSentence,
//       blanks,
//       options,
//       image,
//       correct_cloze_Answer: selectedText,
//     });
//   };

//   const DraggableOption = ({ option, index, moveOption }) => {
//     const [, drag] = useDrag({
//       type: ItemTypes.OPTION,
//       item: { index },
//     });

//     const [, drop] = useDrop({
//       accept: ItemTypes.OPTION,
//       hover: (item) => {
//         if (item.index !== index) {
//           moveOption(item.index, index);
//         }
//       },
//     });

//     return (
//       <div
//         ref={(node) => drag(drop(node))}
//         className="option p-2 mb-2 bg-blue-500 text-white rounded shadow-md cursor-pointer"
//       >
//         {option}
//       </div>
//     );
//   };

//   const moveOption = (fromIndex, toIndex) => {
//     const newOptions = [...options];
//     const [movedOption] = newOptions.splice(fromIndex, 1);
//     newOptions.splice(toIndex, 0, movedOption);
//     setOptions(newOptions);
//   };

//   const handleAddOption = () => {
//     if (newOption && !options.includes(newOption)) {
//       setOptions([...options, newOption]);
//       setNewOption('');
//     }
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="cloze-question p-4 border rounded">
//         <h3 className="text-lg font-semibold">Create a Cloze Question</h3>

//         <textarea
//           value={questionText}
//           onChange={handleTextChange}
//           placeholder="Enter your sentence with blanks (underline words using '_word_')"
//           className="w-full p-2 border rounded"
//           rows={5}
//           onMouseUp={handleTextSelection}
//         />

//         {selectedText && (
//           <button
//             onClick={handleUnderlineText}
//             className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
//           >
//             Underline "{selectedText}"
//           </button>
//         )}

//         <div className="preview mt-4 p-2 bg-gray-100 rounded">
//           <h4 className="font-semibold">Preview</h4>
//           <div className="text-lg">{formatPreviewText(questionText)}</div>
//         </div>

//         <div className="options mt-4">
//           <h4 className="font-semibold">Options</h4>
//           {options.map((option, index) => (
//             <DraggableOption key={index} option={option} index={index} moveOption={moveOption} />
//           ))}
//           <div className="add-option mt-4">
//             <input
//               type="text"
//               value={newOption}
//               onChange={(e) => setNewOption(e.target.value)}
//               placeholder="Add a new option"
//               className="p-2 border rounded"
//             />
//             <button
//               onClick={handleAddOption}
//               className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Add Option
//             </button>
//           </div>
//         </div>

//         <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mt-4" />

//         <button
//           onClick={handleSave}
//           className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Save Question
//         </button>
//       </div>
//     </DndProvider>
//   );
// };

// export default Cloze;






import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import '../styles/Cloze.css';
import swal from 'sweetalert';

const Cloze = ({ onSave }) => {
  const [questionText, setQuestionText] = useState('');
  const [image, setImage] = useState(null);
  const [blanks, setBlanks] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [newOption, setNewOption] = useState('');

  const handleTextChange = (e) => {
    const text = e.target.value;
    setQuestionText(text);

    const regex = /\_(.*?)\_/g;
    let match;
    const newBlanks = [];
    while ((match = regex.exec(text)) !== null) {
      newBlanks.push(match[1]);
    }

    setBlanks(newBlanks);
    setOptions([...newBlanks]);
  };

  const formatPreviewText = (text) => {
    return text.replace(/\_(.*?)\_/g, '______');
  };

  const handleTextSelection = () => {
    const selected = window.getSelection().toString();
    if (selected) {
      setSelectedText(selected);
    }
  };

  const handleUnderlineText = () => {
    if (selectedText) {
      const updatedText = questionText.replace(selectedText, `_${selectedText}_`);
      setQuestionText(updatedText);
      setBlanks([...blanks, selectedText]);
      setOptions([...blanks, selectedText]);
    }
  };

  const createBlankSentence = () => {
    let blankSentence = questionText;
    blanks.forEach((blank) => {
      blankSentence = blankSentence.replace(blank, '______');
    });
    return blankSentence;
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




  const handleSave = () => {
    // Validation
    if (!questionText.trim()) {
      swal({
        title: "Missing Question!",
        text: "Please enter the question text before saving.",
        icon: "warning",
        buttons: "OK",
      });
      return;
    }
  
    if (!blanks || blanks.length === 0) {
      swal({
        title: "Missing Blanks!",
        text: "Please add at least one blank to the sentence.",
        icon: "warning",
        buttons: "OK",
      });
      return;
    }
  
    if (!options || options.length === 0) {
      swal({
        title: "Missing Options!",
        text: "Please provide at least one option for the blanks.",
        icon: "warning",
        buttons: "OK",
      });
      return;
    }
  
    if (!selectedText || selectedText.trim() === "") {
      swal({
        title: "Missing Correct Answer!",
        text: "Please select the correct cloze answer for the blank.",
        icon: "warning",
        buttons: "OK",
      });
      return;
    }
  
    // if (!image) {
    //   swal({
    //     title: "Missing Image!",
    //     text: "Please upload an image for the question.",
    //     icon: "warning",
    //     buttons: "OK",
    //   });
    //   return;
    // }
  
    // If all validations pass, proceed with saving
    const blankSentence = createBlankSentence();
    onSave({
      type: 'Cloze',
      questionText: blankSentence,
      blanks,
      options,
      image,
      correct_cloze_Answer: selectedText,
    });
  
    swal({
      title: "Success!",
      text: "Your Cloze question has been saved successfully.",
      icon: "success",
      buttons: "OK",
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedOptions = Array.from(options);
    const [removed] = reorderedOptions.splice(result.source.index, 1);
    reorderedOptions.splice(result.destination.index, 0, removed);

    setOptions(reorderedOptions);
  };

  const handleAddOption = () => {
    if (newOption && !options.includes(newOption)) {
      setOptions([...options, newOption]);
      setNewOption('');
    }
  };

  return (
    <div className="cloze-question p-6 border rounded-lg shadow-md bg-white max-w-2xl mx-auto">
    <h3 className="text-xl font-semibold mb-4">Create a Cloze Question</h3>
  
    <textarea
      value={questionText}
      onChange={handleTextChange}
      placeholder="Enter your sentence with blanks (underline words using '_word_')"
      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows={5}
      onMouseUp={handleTextSelection}
    />
  
    {selectedText && (
      <button
        onClick={handleUnderlineText}
        className="mt-3 bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        Underline "{selectedText}"
      </button>
    )}
  
    <div className="preview mt-6 p-4 bg-gray-100 rounded-md shadow-inner">
      <h4 className="font-semibold mb-2">Preview</h4>
      <div className="text-lg">{formatPreviewText(questionText)}</div>
    </div>
  
    <div className="options mt-6">
      <h4 className="font-semibold mb-2">Options</h4>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="options">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {options.map((option, index) => (
                <Draggable key={option} draggableId={option} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="option p-3 bg-blue-500 text-white rounded-lg shadow-md flex items-center cursor-pointer hover:bg-blue-400"
                    >
                      <span
                        {...provided.dragHandleProps}
                        className="mr-3 text-xl cursor-move"
                      >
                        ☰
                      </span>
                      {option}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
  
      <div className="add-option mt-4 flex items-center">
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Add a new option"
          className="p-3 border rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddOption}
          className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Option
        </button>
      </div>
    </div>
  
    <div className="image-upload mt-6">
      <h4 className="font-medium mb-2">Upload Image</h4>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mt-2 p-2 border rounded-md w-full"
      />
      {image && (
        <div className="mt-4">
          <img
            src={image}
            alt="Uploaded Preview"
            className="w-32 h-32 object-cover border rounded-md"
          />
        </div>
      )}
    </div>
  
    <button
      onClick={handleSave}
      className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      Save Question
    </button>
  </div>
  
  );
};

export default Cloze;
