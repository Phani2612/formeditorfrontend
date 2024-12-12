// import React, { useEffect, useState } from 'react';
// import { useDrag, useDrop } from 'react-dnd';
// import { SERVER_URL } from './URL';
// import { useParams } from 'react-router-dom';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend'; // Backend for drag-and-drop
// import axios from 'axios';
// import { Buffer } from 'buffer';

// const ItemTypes = {
//   ITEM: 'item',
// };



// const Form = () => {
//   const [formData, setFormData] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [items, setItems] = useState([]);
//   const [questionText, setQuestionText] = useState('');
//   const [clozeQuestions, setClozeQuestions] = useState([]);

//   const [comprehensionQuestions, setComprehensionQuestions] = useState([]);
//   const [itemCategories, setItemCategories] = useState({}); // Track which category each item is dropped into
//   const [evaluationResult, setEvaluationResult] = useState('');

//   const [answers, setAnswers] = useState([]);

//   const [score, setscore] = useState(0)


//   const [userAnswers, setUserAnswers] = useState({}); // To track user-selected answers
//   const [results, setResults] = useState({}); // To store evaluation results


//   const [categorizeImage, setCategorizeImage] = useState(null);
//   const [clozeimage , setclozeimage] = useState(null)
//   const [compimage , setcompimage] = useState(null)

//   const [userresponses, setuserresponses] = useState([])

//   const [headerimage , setheaderimage] = useState(null)

//   const { OID } = useParams();  // Retrieve form ID from URL

//   useEffect(() => {
//     const fetchFormData = async () => {
//       try {
//         const response = await fetch(`${SERVER_URL}/api/forms/${OID}`);
//         const data = await response.json();

//         console.log("data" , data)

//         if (data && data.length > 0) {
//           const questions = data[0].questions;

//           setheaderimage(data[0].headerImage)

//           setFormData(data);

//           // Temporary array to store user responses
//           let responses = [];

//           // Separate questions by type
//           questions.forEach((question) => {



//             if (question.type === 'Categorize') {
//               setCategories(question.categories || []); // Set categories for Categorize questions
//               setItems(question.items || []); // Set items for Categorize questions
//               setQuestionText(question.questionText); // Set question text for Categorize



//               if (question.image) {
//                 // Convert the Buffer to a Base64 string


//                 // const base64Image = `data:image/jpeg;base64${Buffer.from(question.image.data).toString('base64')}`;
//                 // console.log(base64Image); // Log the Base64 string
//                 setCategorizeImage(question.image); // Save the image for display
//             }


//               // Add Categorize question to responses
//               responses.push({
//                 Cat_question: question.questionText,
//               });
//             } else if (question.type === 'Cloze') {



//               if (question.image) {
//                 // Convert the Buffer to a Base64 string


//                 // const base64Image = `data:image/jpeg;base64${Buffer.from(question.image.data).toString('base64')}`;
//                 // console.log(base64Image); // Log the Base64 string
//                 setclozeimage(question.image); // Save the image for display
//             }


//               setClozeQuestions((prev) => [

//                 {
//                   questionText: question.questionText,
//                   options: question.options || [], // Ensure options exists or use an empty array
//                   correct_answer: question.correct_cloze_Answer,
//                 },
//               ]);

//               // Add Cloze question to responses
//               responses.push({
//                 Cloze_question: question.questionText,
//               });
//             } else if (question.type === 'Comprehension') {


//               if (question.image) {
//                 // Convert the Buffer to a Base64 string


//                 // const base64Image = `data:image/jpeg;base64${Buffer.from(question.image.data).toString('base64')}`;
//                 // console.log(base64Image); // Log the Base64 string
//                 setcompimage(question.image); // Save the image for display
//             }




//               setComprehensionQuestions((prev) => [

//                 {
//                   passage: question.passage || '', // Ensure passage exists
//                   questions: question.questions || [], // Ensure questions array exists
//                 },
//               ]);

//               // Add Comprehension question to responses
//               responses.push({
//                 Comp_passage: question.passage,
//               });
//             }
//           });

//           // Deduplicate responses based on question keys
//           responses = responses.filter(
//             (response, index, self) =>
//               index ===
//               self.findIndex(
//                 (t) =>
//                   JSON.stringify(t) === JSON.stringify(response) // Ensure uniqueness
//               )
//           );

//           // Update `userresponses` with deduplicated responses
//           setuserresponses((prev) => [
//             ...prev.filter(
//               (prevResponse) =>
//                 !responses.some(
//                   (newResponse) =>
//                     JSON.stringify(newResponse) === JSON.stringify(prevResponse)
//                 )
//             ),
//             ...responses,
//           ]);
//         }
//       } catch (error) {
//         console.error('Error fetching form data:', error);
//       }
//     };

//     fetchFormData();
//   }, [OID]);








//   // Handle drop of item into category
//   const handleDrop = (item, category) => {
//     setItemCategories((prevCategories) => ({
//       ...prevCategories,
//       [item.name]: category,
//     }));

//   };

//   const handleMoveItemWithinCategory = (itemName, fromCategory, toCategory) => {
//     setItemCategories((prevCategories) => ({
//       ...prevCategories,
//       [itemName]: toCategory,
//     }));
//   };

//   const Category = ({ name, onDrop, itemsInCategory }) => {
//     const [{ isOver }, drop] = useDrop({
//       accept: ItemTypes.ITEM,
//       drop: (item) => onDrop(item, name),
//       collect: (monitor) => ({
//         isOver: monitor.isOver(),
//       }),
//     });

//     return (
//       <div
//         ref={drop}
//         className={`category-box p-4 m-2 rounded-lg border-2 border-dashed ${isOver ? 'bg-gray-200' : 'bg-white'}`}
//       >
//         <h3 className="font-semibold text-xl text-center">{name}</h3>
//         {/* Display items placed inside this category */}
//         <div className="item-list">
//           {itemsInCategory.map((itemName) => (
//             <DraggableItemInCategory
//               key={itemName}
//               item={{ name: itemName }}
//               category={name}
//               onMoveItem={handleMoveItemWithinCategory}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const DraggableItem = ({ item }) => {
//     const [{ isDragging }, drag] = useDrag({
//       type: ItemTypes.ITEM,
//       item: { name: item.name },
//       collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//       }),
//     });

//     return (
//       <div
//         ref={drag}
//         className={`draggable-item p-2 mb-2 bg-blue-500 text-white rounded-lg shadow-md ${isDragging ? 'opacity-50' : 'opacity-100'}`}
//         style={{ opacity: isDragging ? 0.5 : 1 }}
//       >
//         {item.name}
//       </div>
//     );
//   };

//   const DraggableItemInCategory = ({ item, category, onMoveItem }) => {
//     const [{ isDragging }, drag] = useDrag({
//       type: ItemTypes.ITEM,
//       item: { name: item.name },
//       collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//       }),
//     });

//     const [{ isOver }, drop] = useDrop({
//       accept: ItemTypes.ITEM,
//       drop: (draggedItem) => {
//         if (draggedItem.name !== item.name) {
//           onMoveItem(draggedItem.name, category, item.name === draggedItem.name ? category : item.name);
//         }
//       },
//       collect: (monitor) => ({
//         isOver: monitor.isOver(),
//       }),
//     });

//     return (
//       <div
//         ref={(node) => drag(drop(node))}
//         className={`draggable-item-in-category p-2 mb-2 bg-blue-500 text-white rounded-lg shadow-md ${isDragging ? 'opacity-50' : 'opacity-100'}`}
//         style={{
//           opacity: isDragging ? 0.5 : 1,
//           backgroundColor: isOver ? 'lightgray' : '',
//         }}
//       >
//         {item.name}
//       </div>
//     );
//   };




//   // Evaluation function to check if the items are placed in the correct categories
//   const evaluateAnswer = () => {

//     let count = 0
//     const responses = []; // Temporary array to collect responses

//     items.forEach((item) => {
//       // Assuming each item has a correct category in the form data
//       const correctCategory = item.category; // This should be passed from the backend if available
//       if (itemCategories[item.name] === correctCategory) {


//         responses.push({
//           cat_response: { item_Name: item.name, item_category: item.category },
//         })

//         count += 5
//       }



//     });





//     return {count , responses}

//   };




//   // Cloze




//   // DragItem Component - Represents each option the user can drag
//   const DragItem = ({ option, index }) => {
//     const [, drag] = useDrag(() => ({
//       type: ItemTypes.ITEM,
//       item: { index, option },
//     }));

//     return (
//       <li
//         ref={drag}
//         className="cursor-pointer p-2 border rounded bg-blue-500 text-white mb-2 hover:bg-blue-400 transition duration-200"
//       >
//         {option}
//       </li>
//     );
//   };

//   // DropZone Component - Represents each blank space in the sentence
//   const DropZone = ({ onDrop, index, children }) => {
//     const [{ isOver }, drop] = useDrop(() => ({
//       accept: ItemTypes.ITEM,
//       drop: (item) => onDrop(item, index),
//       collect: (monitor) => ({
//         isOver: monitor.isOver(),
//       }),
//     }));

//     return (
//       <span
//         ref={drop}
//         className={`inline-block p-1 border-dashed border-2 ${isOver ? 'bg-green-100' : 'bg-gray-100'
//           }`}
//       >
//         {children || '______'}
//       </span>
//     );
//   };



//   // Handle the drop event and update the answers state
//   const HandleDrop = (item, blankIndex) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[blankIndex] = item.option; // Add the option into the blank index
//     setAnswers(updatedAnswers);
//   };




//   // Function to render the question text with blanks
//   const renderQuestionTextWithBlanks = (questionText, answers) => {

//     const splitText = questionText.split('______');

//     return splitText.map((part, index) => (
//       <React.Fragment key={index}>
//         {part}
//         {index < splitText.length - 1 && (
//           <DropZone index={index} onDrop={HandleDrop}>
//             <span className="inline-block w-36 h-10 bg-gray-200 border-2 border-dashed text-center text-gray-800">
//               {answers || "______"}
//             </span>
//           </DropZone>
//         )}
//       </React.Fragment>
//     ));
//   };







//   // Comprehension

//   // Handle answer selection
//   const handleAnswerChange = (compIndex, qIndex, value) => {
//     setUserAnswers((prev) => ({
//       ...prev,
//       [`${compIndex}-${qIndex}`]: value, // Store answer with unique key
//     }));
//   };




//   // Evaluate answers
//   const evaluateAnswers = () => {
//     const newResults = {};

//     const Response = []

//     let count = 0

//     comprehensionQuestions.forEach((comp, compIndex) => {
//       comp.questions.forEach((question, qIndex) => {
//         const userAnswer = userAnswers[`${compIndex}-${qIndex}`];
//         const correctAnswer = question.correctAnswer;

//         Response.push({
//           cloze_response: userAnswer
//         })

//         const isCorrect = userAnswer === correctAnswer;

//         // Check if user's answer is correct
//         newResults[`${compIndex}-${qIndex}`] = userAnswer === correctAnswer;


//         if (isCorrect) {


//           count += 5
//         }



//       });
//     });

//     setResults(newResults); // Update results


//     // setuserresponses((prev) => [...prev, ...Response]); // Update state once
//     return { count, responses: Response }; // Return score and responses

//   };




//   const handleSubmit = () => {

//     let count = 0

//     const Response = []
//     clozeQuestions.forEach((question, index) => {

//       Response.push({
//         comp_response: answers[index]
//       })


//       if (answers[index] && answers[index] === question.correct_answer) {


//         count += 5

//       }
//     });

//     // alert(`You scored ${score} out of ${clozeQuestions.length}`);

//     // setuserresponses((prev) => [...prev, ...Response]); // Update state once


//     return { count, responses: Response }; // Return score and responses



//   };




//   async function saveScore(data) {



//     localStorage.getItem('User_Phone')
//     try {
//       const response = await axios.post(`${SERVER_URL}/api/save-score`, data,  {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         console.log('Score saved successfully:', response.data);
//       } else {
//         console.error('Failed to save score:', response.data);
//       }
//     } catch (error) {
//       console.error('Error sending score:', error);
//     }
//   }




//   async function allresults() {
//     let totalScore = 0; // Local variable to hold the cumulative score

//     const U_Email = localStorage.getItem('User_Email')

//     const U_Phone = localStorage.getItem('User_Phone')

//     // Collect all the responses and scores
//     const evaluateAnswerResult = evaluateAnswer();
//     const handleSubmitResult = handleSubmit();
//     const evaluateAnswersResult = evaluateAnswers();

//     // Add the individual section scores to totalScore
//     totalScore += evaluateAnswerResult.count;
//     totalScore += handleSubmitResult.count;
//     totalScore += evaluateAnswersResult.count;

//     // Prepare the complete user responses data
//     const allResponses = [
//       ...evaluateAnswerResult.responses,
//       ...handleSubmitResult.responses,
//       ...evaluateAnswersResult.responses,
//     ];




//     // Prepare the data to send
//     const data = {
//       score: totalScore,
//       User_Responses: allResponses, // Use combined responses

//       U_Email : U_Email,

//       U_Phone : U_Phone,

//       User_Question : userresponses


//     };

//     // Call saveScore function to send the data using axios
//     await saveScore(data);
//   }



//   console.log(headerimage)





// return (
//   <DndProvider backend={HTML5Backend}>
//     <div className="form-container p-8 max-w-4xl mx-auto space-y-8">
//       {formData.length > 0 ? (
//         <>





// {/* Header Image Section */}
// {headerimage && (
//             <div className="header-image-container mb-6">
//               <img
//                 src={`http://localhost:5000${headerimage}`} 
//                 alt="Form Header"
//                 className="w-full h-auto object-cover rounded-lg shadow-lg"


//               />
//             </div>
//           )}











//           {/* Categorize Questions */}
//          {categories.length > 0 && (
//   <div className="categorize-section bg-white p-6 rounded-lg shadow-md">
//     <h2 className="text-3xl font-bold text-center mb-6">{questionText}</h2>

//     <div className="flex flex-col md:flex-row gap-6 items-start">
//       {/* Categories Section */}
//       <div className="categories-container flex-1">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {categories.map((category, index) => {
//             const itemsInCategory = Object.entries(itemCategories)
//               .filter(([itemName, itemCategory]) => itemCategory === category)
//               .map(([itemName]) => itemName);
//             return (
//               <Category
//                 key={index}
//                 name={category}
//                 onDrop={handleDrop}
//                 itemsInCategory={itemsInCategory}
//               />
//             );
//           })}
//         </div>
//         <div className="items-container grid grid-cols-2 gap-6 mt-8">
//           {items
//             .filter((item) => !itemCategories[item.name]) // Filter out items already placed in a category
//             .map((item, index) => (
//               <DraggableItem key={index} item={item} />
//             ))}
//         </div>
//       </div>

//       {/* Image Section */}
//       {categorizeImage && (
//         <div className="image-container w-1/3 flex-shrink-0 mt-4 md:mt-0">
//           <h4 className="font-medium text-center mb-2">Uploaded Image</h4>
//           <div className="bg-gray-100 p-2 rounded-lg shadow-md">
//             <img
//               src={categorizeImage}
//               alt="Categorize Question"
//               className="w-full h-auto object-cover rounded"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// )}






// {/* Cloze Questions */}
// <div className="cloze-questions mt-8 bg-white p-6 rounded-lg shadow-md">
//   {clozeQuestions.map((cloze, index) => (
//     <div key={index} className="cloze-item p-6 mb-6 bg-white rounded-lg shadow-md border">

//       {/* Flex container for the question and image */}
//       <div className="flex flex-col md:flex-row gap-6 items-start">

//         {/* Cloze Question Text Section */}
//         <div className="question-text-container flex-1">
//           <p className="text-xl font-semibold mb-4 text-gray-800">
//             {renderQuestionTextWithBlanks(cloze.questionText, answers[index] || [])}
//           </p>

//           {/* Display the options */}
//           {cloze.options.length > 0 && (
//             <div className="options-container mt-6">
//               <h3 className="text-lg font-semibold text-gray-700 mb-4">Drag the options:</h3>
//               <ul className="list-none pl-0">
//                 {cloze.options.map((option, idx) => (
//                   <DragItem key={idx} option={option} index={idx} />
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Cloze Image Section */}
//         {clozeimage && (
//           <div className="image-container w-1/3 flex-shrink-0 mt-4 md:mt-0">
//             <h4 className="font-medium text-center mb-2">Uploaded Image</h4>
//             <div className="bg-gray-100 p-2 rounded-lg shadow-md">
//               <img
//                 src={clozeimage}
//                 alt="Cloze Question"
//                 className="w-full h-auto object-cover rounded"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   ))}
// </div>












//          {/* Comprehension Questions */}
// {comprehensionQuestions.length > 0 && (
//   <div className="comprehension-questions mt-8 bg-white p-6 rounded-lg shadow-md">
//     <h2 className="text-3xl font-bold text-center mb-6">Comprehension Questions</h2>
//     {comprehensionQuestions.map((comp, compIndex) => (
//       <div key={compIndex} className="comprehension-item mb-6">
//         {/* Display Passage */}
//         <div className="passage mb-4 flex items-center">
//           <div className="passage-text flex-1">
//             <h3 className="text-xl font-semibold mb-2">Passage:</h3>
//             <p className="text-gray-700">{comp.passage}</p>
//           </div>

//           {/* Display Image beside the passage */}
//           {compimage && (
//             <div className="image-container ml-6 w-32 h-32 bg-gray-100 p-2 rounded-lg shadow-md">
//               <img
//                 src={compimage}
//                 alt="Comprehension Image"
//                 className="w-full h-full object-cover rounded"
//               />
//             </div>
//           )}
//         </div>

//         {/* Render Questions */}
//         {comp.questions.map((question, qIndex) => (
//           <div key={qIndex} className="question-item mb-4">
//             <h4 className="text-lg font-medium">
//               Q{qIndex + 1}: {question.text}
//             </h4>

//             {/* Render Options */}
//             <div className="options mt-2">
//               {question.options.map((option, oIndex) => (
//                 <label key={oIndex} className="block text-gray-600 mb-2">
//                   <input
//                     type="radio"
//                     name={`question-${compIndex}-${qIndex}`}
//                     value={option}
//                     onChange={() => handleAnswerChange(compIndex, qIndex, option)}
//                     className="mr-2"
//                   />
//                   {option}
//                 </label>
//               ))}
//             </div>

//             {/* Show Result for This Question */}
//             {results[`${compIndex}-${qIndex}`] !== undefined && (
//               <p
//                 className={`mt-2 font-medium ${results[`${compIndex}-${qIndex}`] ? 'text-green-600' : 'text-red-600'
//                   }`}
//               >
//                 {results[`${compIndex}-${qIndex}`] ? 'Correct!' : 'Incorrect.'}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     ))}
//   </div>
// )}





//           {/* Evaluation */}
//           <div className="evaluation-container mt-8 text-center">
//             <button
//               className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition"
//               onClick={allresults}
//             >
//               Submit
//             </button>
//             {evaluationResult && <p className="mt-4 text-xl text-gray-700">{evaluationResult}</p>}
//           </div>
//         </>
//       ) : (
//         <p className="text-center text-xl font-medium">Loading form...</p>
//       )}
//     </div>
//   </DndProvider>
// );

// };

// export default Form;









// import React, { useEffect, useState } from 'react';
// import { useDrag, useDrop } from 'react-dnd';
// import { SERVER_URL } from './URL';
// import { useParams } from 'react-router-dom';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend'; // Backend for drag-and-drop
// import axios from 'axios';
// import { Buffer } from 'buffer';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';


// const ItemTypes = {
//   ITEM: 'item',
// };



// const Form = () => {
//   const [formData, setFormData] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [items, setItems] = useState([]);
//   const [questionText, setQuestionText] = useState('');
//   const [clozeQuestions, setClozeQuestions] = useState([]);

//   const [comprehensionQuestions, setComprehensionQuestions] = useState([]);
//   const [itemCategories, setItemCategories] = useState({}); // Track which category each item is dropped into
//   const [evaluationResult, setEvaluationResult] = useState('');

//   const [answers, setAnswers] = useState([]);

//   const [count, setcount] = useState(0)

//   const [timer, setTimer] = useState(120); // Set initial timer to 2 minutes (120 seconds)

//   const [userAnswers, setUserAnswers] = useState({}); // To track user-selected answers
//   const [results, setResults] = useState({}); // To store evaluation results


//   const [categorizeImage, setCategorizeImage] = useState(null);
//   const [clozeimage , setclozeimage] = useState(null)
//   const [compimage , setcompimage] = useState(null)

//   const [userresponses, setuserresponses] = useState([])

//   const [headerimage , setheaderimage] = useState(null)

//   const { OID } = useParams();  // Retrieve form ID from URL

//   let lengthfinder = []

//   useEffect(() => {
//     const fetchFormData = async () => {
//       try {
//         const response = await fetch(`${SERVER_URL}/api/forms/${OID}`);
//         const data = await response.json();

//         console.log("data" , data)

//         if (data && data.length > 0) {
//           const questions = data[0].questions;

//           setheaderimage(data[0].headerImage)

//           setFormData(data);

//           // Temporary array to store user responses
//           let responses = [];

//           questions.map((i)=>{

//             lengthfinder.push(i)
//           }) 

//           // Separate questions by type
//           questions.forEach((question) => {



//             if (question.type === 'Categorize') {
//               setCategories(question.categories || []); // Set categories for Categorize questions
//               setItems(question.items || []); // Set items for Categorize questions
//               setQuestionText(question.questionText); // Set question text for Categorize



//               if (question.image) {
//                 // Convert the Buffer to a Base64 string


//                 // const base64Image = `data:image/jpeg;base64${Buffer.from(question.image.data).toString('base64')}`;
//                 // console.log(base64Image); // Log the Base64 string
//                 setCategorizeImage(question.image); // Save the image for display
//             }


//               // Add Categorize question to responses
//               responses.push({
//                 Cat_question: question.questionText,
//               });
//             } else if (question.type === 'Cloze') {



//               if (question.image) {
//                 // Convert the Buffer to a Base64 string


//                 // const base64Image = `data:image/jpeg;base64${Buffer.from(question.image.data).toString('base64')}`;
//                 // console.log(base64Image); // Log the Base64 string
//                 setclozeimage(question.image); // Save the image for display
//             }


//               setClozeQuestions((prev) => [

//                 {
//                   questionText: question.questionText,
//                   options: question.options || [], // Ensure options exists or use an empty array
//                   correct_answer: question.correct_cloze_Answer,
//                 },
//               ]);

//               // Add Cloze question to responses
//               responses.push({
//                 Cloze_question: question.questionText,
//               });
//             } else if (question.type === 'Comprehension') {


//               if (question.image) {
//                 // Convert the Buffer to a Base64 string


//                 // const base64Image = `data:image/jpeg;base64${Buffer.from(question.image.data).toString('base64')}`;
//                 // console.log(base64Image); // Log the Base64 string
//                 setcompimage(question.image); // Save the image for display
//             }




//               setComprehensionQuestions((prev) => [

//                 {
//                   passage: question.passage || '', // Ensure passage exists
//                   questions: question.questions || [], // Ensure questions array exists
//                 },
//               ]);

//               // Add Comprehension question to responses
//               responses.push({
//                 Comp_passage: question.passage,
//               });
//             }
//           });

//           // Deduplicate responses based on question keys
//           responses = responses.filter(
//             (response, index, self) =>
//               index ===
//               self.findIndex(
//                 (t) =>
//                   JSON.stringify(t) === JSON.stringify(response) // Ensure uniqueness
//               )
//           );

//           // Update `userresponses` with deduplicated responses
//           setuserresponses((prev) => [
//             ...prev.filter(
//               (prevResponse) =>
//                 !responses.some(
//                   (newResponse) =>
//                     JSON.stringify(newResponse) === JSON.stringify(prevResponse)
//                 )
//             ),
//             ...responses,
//           ]);
//         }
//       } catch (error) {
//         console.error('Error fetching form data:', error);
//       }
//     };

//     fetchFormData();
//   }, [OID]);





// console.log(lengthfinder)


//   // Handle drop of item into category
//   const handleDrop = (item, category) => {
//     setItemCategories((prevCategories) => ({
//       ...prevCategories,
//       [item.name]: category,
//     }));

//   };

//   const handleMoveItemWithinCategory = (itemName, fromCategory, toCategory) => {
//     setItemCategories((prevCategories) => ({
//       ...prevCategories,
//       [itemName]: toCategory,
//     }));
//   };

//   const Category = ({ name, onDrop, itemsInCategory }) => {
//     const [{ isOver }, drop] = useDrop({
//       accept: ItemTypes.ITEM,
//       drop: (item) => onDrop(item, name),
//       collect: (monitor) => ({
//         isOver: monitor.isOver(),
//       }),
//     });

//     return (
//       <div
//         ref={drop}
//         className={`category-box p-4 m-2 rounded-lg border-2 border-dashed ${isOver ? 'bg-gray-200' : 'bg-white'}`}
//       >
//         <h3 className="font-semibold text-xl text-center">{name}</h3>
//         {/* Display items placed inside this category */}
//         <div className="item-list">
//           {itemsInCategory.map((itemName) => (
//             <DraggableItemInCategory
//               key={itemName}
//               item={{ name: itemName }}
//               category={name}
//               onMoveItem={handleMoveItemWithinCategory}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const DraggableItem = ({ item }) => {
//     const [{ isDragging }, drag] = useDrag({
//       type: ItemTypes.ITEM,
//       item: { name: item.name },
//       collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//       }),
//     });

//     return (
//       <div
//         ref={drag}
//         className={`draggable-item p-2 mb-2 bg-blue-500 text-white rounded-lg shadow-md ${isDragging ? 'opacity-50' : 'opacity-100'}`}
//         style={{ opacity: isDragging ? 0.5 : 1 }}
//       >
//         {item.name}
//       </div>
//     );
//   };

//   const DraggableItemInCategory = ({ item, category, onMoveItem }) => {
//     const [{ isDragging }, drag] = useDrag({
//       type: ItemTypes.ITEM,
//       item: { name: item.name },
//       collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//       }),
//     });

//     const [{ isOver }, drop] = useDrop({
//       accept: ItemTypes.ITEM,
//       drop: (draggedItem) => {
//         if (draggedItem.name !== item.name) {
//           onMoveItem(draggedItem.name, category, item.name === draggedItem.name ? category : item.name);
//         }
//       },
//       collect: (monitor) => ({
//         isOver: monitor.isOver(),
//       }),
//     });

//     return (
//       <div
//         ref={(node) => drag(drop(node))}
//         className={`draggable-item-in-category p-2 mb-2 bg-blue-500 text-white rounded-lg shadow-md ${isDragging ? 'opacity-50' : 'opacity-100'}`}
//         style={{
//           opacity: isDragging ? 0.5 : 1,
//           backgroundColor: isOver ? 'lightgray' : '',
//         }}
//       >
//         {item.name}
//       </div>
//     );
//   };




//   // Evaluation function to check if the items are placed in the correct categories
//   const evaluateAnswer = () => {

//     let count = 0
//     const responses = []; // Temporary array to collect responses

//     items.forEach((item) => {
//       // Assuming each item has a correct category in the form data
//       const correctCategory = item.category; // This should be passed from the backend if available
//       if (itemCategories[item.name] === correctCategory) {


//         responses.push({
//           cat_response: { item_Name: item.name, item_category: item.category },
//         })

//         count += 5
//       }



//     });





//     return {count , responses}

//   };




//   // Cloze




//   // DragItem Component - Represents each option the user can drag
//   const DragItem = ({ option, index }) => {
//     const [, drag] = useDrag(() => ({
//       type: ItemTypes.ITEM,
//       item: { index, option },
//     }));

//     return (
//       <li
//         ref={drag}
//         className="cursor-pointer p-2 border rounded bg-blue-500 text-white mb-2 hover:bg-blue-400 transition duration-200"
//       >
//         {option}
//       </li>
//     );
//   };

//   // DropZone Component - Represents each blank space in the sentence
//   const DropZone = ({ onDrop, index, children }) => {
//     const [{ isOver }, drop] = useDrop(() => ({
//       accept: ItemTypes.ITEM,
//       drop: (item) => onDrop(item, index),
//       collect: (monitor) => ({
//         isOver: monitor.isOver(),
//       }),
//     }));

//     return (
//       <span
//         ref={drop}
//         className={`inline-block p-1 border-dashed border-2 ${isOver ? 'bg-green-100' : 'bg-gray-100'
//           }`}
//       >
//         {children || '______'}
//       </span>
//     );
//   };



//   // Handle the drop event and update the answers state
//   const HandleDrop = (item, blankIndex) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[blankIndex] = item.option; // Add the option into the blank index
//     setAnswers(updatedAnswers);
//   };




//   // Function to render the question text with blanks
//   const renderQuestionTextWithBlanks = (questionText, answers) => {

//     const splitText = questionText.split('______');

//     return splitText.map((part, index) => (
//       <React.Fragment key={index}>
//         {part}
//         {index < splitText.length - 1 && (
//           <DropZone index={index} onDrop={HandleDrop}>
//             <span className="inline-block w-36 h-10 bg-gray-200 border-2 border-dashed text-center text-gray-800">
//               {answers || "______"}
//             </span>
//           </DropZone>
//         )}
//       </React.Fragment>
//     ));
//   };







//   // Comprehension

//   // Handle answer selection
//   const handleAnswerChange = (compIndex, qIndex, value) => {
//     setUserAnswers((prev) => ({
//       ...prev,
//       [`${compIndex}-${qIndex}`]: value, // Store answer with unique key
//     }));
//   };




//   // Evaluate answers
//   const evaluateAnswers = () => {
//     const newResults = {};

//     const Response = []

//     let count = 0

//     comprehensionQuestions.forEach((comp, compIndex) => {
//       comp.questions.forEach((question, qIndex) => {
//         const userAnswer = userAnswers[`${compIndex}-${qIndex}`];
//         const correctAnswer = question.correctAnswer;

//         Response.push({
//           cloze_response: userAnswer
//         })

//         const isCorrect = userAnswer === correctAnswer;

//         // Check if user's answer is correct
//         newResults[`${compIndex}-${qIndex}`] = userAnswer === correctAnswer;


//         if (isCorrect) {


//           count += 5
//         }



//       });
//     });

//     setResults(newResults); // Update results


//     // setuserresponses((prev) => [...prev, ...Response]); // Update state once
//     return { count, responses: Response }; // Return score and responses

//   };




//   const handleSubmit = () => {

//     let count = 0

//     const Response = []
//     clozeQuestions.forEach((question, index) => {

//       Response.push({
//         comp_response: answers[index]
//       })


//       if (answers[index] && answers[index] === question.correct_answer) {


//         count += 5

//       }
//     });

//     // alert(`You scored ${score} out of ${clozeQuestions.length}`);

//     // setuserresponses((prev) => [...prev, ...Response]); // Update state once


//     return { count, responses: Response }; // Return score and responses



//   };




//   async function saveScore(data) {



//     localStorage.getItem('User_Phone')
//     try {
//       const response = await axios.post(`${SERVER_URL}/api/save-score`, data,  {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         console.log('Score saved successfully:', response.data);
//       } else {
//         console.error('Failed to save score:', response.data);
//       }
//     } catch (error) {
//       console.error('Error sending score:', error);
//     }
//   }




//   async function allresults() {
//     let totalScore = 0; // Local variable to hold the cumulative score


//     let calcualtecount = 0

//     const U_Email = localStorage.getItem('User_Email')

//     const U_Phone = localStorage.getItem('User_Phone')

//     // Collect all the responses and scores
//     const evaluateAnswerResult = evaluateAnswer();
//     const handleSubmitResult = handleSubmit();
//     const evaluateAnswersResult = evaluateAnswers();

//     if(evaluateAnswerResult.count){

//       calcualtecount += 1
//     }

//     if(handleSubmitResult){

//       calcualtecount += 1
//     }

//     if(evaluateAnswersResult){
//       calcualtecount += 1
//     }


//     setcount(calcualtecount)

//     // Add the individual section scores to totalScore
//     totalScore += evaluateAnswerResult.count;
//     totalScore += handleSubmitResult.count;
//     totalScore += evaluateAnswersResult.count;

//     // Prepare the complete user responses data
//     const allResponses = [
//       ...evaluateAnswerResult.responses,
//       ...handleSubmitResult.responses,
//       ...evaluateAnswersResult.responses,
//     ];




//     // Prepare the data to send
//     const data = {
//       score: totalScore,
//       User_Responses: allResponses, // Use combined responses

//       U_Email : U_Email,

//       U_Phone : U_Phone,

//       User_Question : userresponses


//     };



//     try {
//       // Call saveScore function to send the data using axios
//       await saveScore(data);

//       // Show SweetAlert on success
//       Swal.fire({
//         title: 'Successfully Completed!',
//         text: 'You have completed the test.',
//         icon: 'success',
//         confirmButtonText: 'Go to Results',
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Redirect to the success page or another page
//           window.location.href = '/success'; // Change this to your desired page URL
//         }
//       });
//     } catch (error) {
//       // Handle errors if saveScore fails
//       Swal.fire({
//         title: 'Oops!',
//         text: 'Something went wrong. Please try again.',
//         icon: 'error',
//         confirmButtonText: 'OK',
//       });
//     }




//   }



//   const [isTimeUp, setIsTimeUp] = useState(false);

//   const navigate = useNavigate();



//   useEffect(() => {
//     if (timer <= 0) {
//       setIsTimeUp(true);
//       return;
//     }

//     const interval = setInterval(() => {
//       setTimer((prevTimer) => prevTimer - 1);
//     }, 1000);

//     // Cleanup interval on component unmount or when timer reaches zero
//     return () => clearInterval(interval);
//   }, [timer]); // Dependency on 'timer' ensures it runs when 'timer' changes

//   useEffect(() => {
//     if (isTimeUp) {
//       // Redirect to success page when timer finishes
//       navigate('/success');
//     }
//   }, [isTimeUp, navigate]);

//   // Format time as mm:ss
//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
//   };







//   const questionNumbers = Array.from({ length: count }, (_, index) => index + 1);






// return (
//   <DndProvider backend={HTML5Backend}>
//     <div className="form-container p-8 max-w-4xl mx-auto space-y-8">
//       {formData.length > 0 ? (
//         <>

// <div className="timer text-center p-4 bg-gray-200 rounded-lg shadow-md mb-6">
//             <h2 className="text-2xl font-bold">Time Remaining: {formatTime(timer)}</h2>
//           </div>



// {/* Header Image Section */}
// {headerimage && (
//             <div className="header-image-container mb-6">
//               <img
//                 src={`http://localhost:5000${headerimage}`} 
//                 alt="Form Header"
//                 className="w-full h-auto object-cover rounded-lg shadow-lg"


//               />
//             </div>
//           )}




// {/* Question Length Finder */}















//           {/* Categorize Questions */}
//          {categories.length > 0 && (
//   <div className="categorize-section bg-white p-6 rounded-lg shadow-md">
//     <h2 className="text-3xl font-bold text-center mb-6">{questionText}</h2>

//     <div className="flex flex-col md:flex-row gap-6 items-start">
//       {/* Categories Section */}
//       <div className="categories-container flex-1">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {categories.map((category, index) => {
//             const itemsInCategory = Object.entries(itemCategories)
//               .filter(([itemName, itemCategory]) => itemCategory === category)
//               .map(([itemName]) => itemName);
//             return (
//               <Category
//                 key={index}
//                 name={category}
//                 onDrop={handleDrop}
//                 itemsInCategory={itemsInCategory}
//               />
//             );
//           })}
//         </div>
//         <div className="items-container grid grid-cols-2 gap-6 mt-8">
//           {items
//             .filter((item) => !itemCategories[item.name]) // Filter out items already placed in a category
//             .map((item, index) => (
//               <DraggableItem key={index} item={item} />
//             ))}
//         </div>
//       </div>

//       {/* Image Section */}
//       {categorizeImage && (
//         <div className="image-container w-1/3 flex-shrink-0 mt-4 md:mt-0">
//           <h4 className="font-medium text-center mb-2">Uploaded Image</h4>
//           <div className="bg-gray-100 p-2 rounded-lg shadow-md">
//             <img
//               src={categorizeImage}
//               alt="Categorize Question"
//               className="w-full h-auto object-cover rounded"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// )}






// {/* Cloze Questions */}
// <div className="cloze-questions mt-8 bg-white p-6 rounded-lg shadow-md">
//   {clozeQuestions.map((cloze, index) => (
//     <div key={index} className="cloze-item p-6 mb-6 bg-white rounded-lg shadow-md border">

//       {/* Flex container for the question and image */}
//       <div className="flex flex-col md:flex-row gap-6 items-start">

//         {/* Cloze Question Text Section */}
//         <div className="question-text-container flex-1">
//           <p className="text-xl font-semibold mb-4 text-gray-800">
//             {renderQuestionTextWithBlanks(cloze.questionText, answers[index] || [])}
//           </p>

//           {/* Display the options */}
//           {cloze.options.length > 0 && (
//             <div className="options-container mt-6">
//               <h3 className="text-lg font-semibold text-gray-700 mb-4">Drag the options:</h3>
//               <ul className="list-none pl-0">
//                 {cloze.options.map((option, idx) => (
//                   <DragItem key={idx} option={option} index={idx} />
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Cloze Image Section */}
//         {clozeimage && (
//           <div className="image-container w-1/3 flex-shrink-0 mt-4 md:mt-0">
//             <h4 className="font-medium text-center mb-2">Uploaded Image</h4>
//             <div className="bg-gray-100 p-2 rounded-lg shadow-md">
//               <img
//                 src={clozeimage}
//                 alt="Cloze Question"
//                 className="w-full h-auto object-cover rounded"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   ))}
// </div>












//          {/* Comprehension Questions */}
// {comprehensionQuestions.length > 0 && (
//   <div className="comprehension-questions mt-8 bg-white p-6 rounded-lg shadow-md">
//     <h2 className="text-3xl font-bold text-center mb-6">Comprehension Questions</h2>
//     {comprehensionQuestions.map((comp, compIndex) => (
//       <div key={compIndex} className="comprehension-item mb-6">
//         {/* Display Passage */}
//         <div className="passage mb-4 flex items-center">
//           <div className="passage-text flex-1">
//             <h3 className="text-xl font-semibold mb-2">Passage:</h3>
//             <p className="text-gray-700">{comp.passage}</p>
//           </div>

//           {/* Display Image beside the passage */}
//           {compimage && (
//             <div className="image-container ml-6 w-32 h-32 bg-gray-100 p-2 rounded-lg shadow-md">
//               <img
//                 src={compimage}
//                 alt="Comprehension Image"
//                 className="w-full h-full object-cover rounded"
//               />
//             </div>
//           )}
//         </div>

//         {/* Render Questions */}
//         {comp.questions.map((question, qIndex) => (
//           <div key={qIndex} className="question-item mb-4">
//             <h4 className="text-lg font-medium">
//               Q{qIndex + 1}: {question.text}
//             </h4>

//             {/* Render Options */}
//             <div className="options mt-2">
//               {question.options.map((option, oIndex) => (
//                 <label key={oIndex} className="block text-gray-600 mb-2">
//                   <input
//                     type="radio"
//                     name={`question-${compIndex}-${qIndex}`}
//                     value={option}
//                     onChange={() => handleAnswerChange(compIndex, qIndex, option)}
//                     className="mr-2"
//                   />
//                   {option}
//                 </label>
//               ))}
//             </div>

//             {/* Show Result for This Question */}
//             {results[`${compIndex}-${qIndex}`] !== undefined && (
//               <p
//                 className={`mt-2 font-medium ${results[`${compIndex}-${qIndex}`] ? 'text-green-600' : 'text-red-600'
//                   }`}
//               >
//                 {results[`${compIndex}-${qIndex}`] ? 'Correct!' : 'Incorrect.'}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     ))}
//   </div>
// )}





//           {/* Evaluation */}
//           <div className="evaluation-container mt-8 text-center">
//             <button
//               className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition"
//               onClick={allresults}
//             >
//               Submit
//             </button>

//           </div>
//         </>
//       ) : (
//         <p className="text-center text-xl font-medium">Loading form...</p>
//       )}
//     </div>
//   </DndProvider>
// );

// };

// export default Form;












import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { SERVER_URL } from './URL';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; // Backend for drag-and-drop
import axios from 'axios';
import { Buffer } from 'buffer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const ItemTypes = {
  ITEM: 'item',
};



const Form = () => {
  const [formData, setFormData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [clozeQuestions, setClozeQuestions] = useState([]);

  const [comprehensionQuestions, setComprehensionQuestions] = useState([]);
  const [itemCategories, setItemCategories] = useState({}); // Track which category each item is dropped into
  const [evaluationResult, setEvaluationResult] = useState('');

  const [answers, setAnswers] = useState([]);

  const [count, setcount] = useState(0)

  const [timer, setTimer] = useState(120); // Set initial timer to 2 minutes (120 seconds)

  const [userAnswers, setUserAnswers] = useState({}); // To track user-selected answers
  const [results, setResults] = useState({}); // To store evaluation results


  const [categorizeImage, setCategorizeImage] = useState(null);
  const [clozeimage, setclozeimage] = useState(null)
  const [compimage, setcompimage] = useState(null)

  const [userresponses, setuserresponses] = useState([])

  const [headerimage, setheaderimage] = useState(null)

  const { OID } = useParams();  // Retrieve form ID from URL





  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/forms/${OID}`);
        const data = await response.json();

       

        if (data && data.length > 0) {
          const questions = data[0].questions;

          setheaderimage(data[0].headerImage)

          setFormData(data);

          // Temporary array to store user responses
          let responses = [];

          

          // Separate questions by type
          questions.forEach((question , index) => {

            
          


            if (question.type === 'Categorize') {
              setCategories(question.categories || []); // Set categories for Categorize questions
              setItems(question.items || []); // Set items for Categorize questions
              setQuestionText(question.questionText); // Set question text for Categorize



              if (question.image) {
                // Convert the Buffer to a Base64 string


                // const base64Image = `data:image/jpeg;base64${Buffer.from(question.image.data).toString('base64')}`;
                // console.log(base64Image); // Log the Base64 string
                setCategorizeImage(question.image); // Save the image for display
              }


              // Add Categorize question to responses
              responses.push({
                Cat_question: question.questionText,
              });
            } else if (question.type === 'Cloze') {



              if (question.image) {
                // Convert the Buffer to a Base64 string


                // const base64Image = `data:image/jpeg;base64${Buffer.from(question.image.data).toString('base64')}`;
                // console.log(base64Image); // Log the Base64 string
                setclozeimage(question.image); // Save the image for display
              }


              setClozeQuestions((prev) => [

                {
                  questionText: question.questionText,
                  options: question.options || [], // Ensure options exists or use an empty array
                  correct_answer: question.correct_cloze_Answer,
                },
              ]);

              // Add Cloze question to responses
              responses.push({
                Cloze_question: question.questionText,
              });
            } else if (question.type === 'Comprehension') {


              if (question.image) {
                // Convert the Buffer to a Base64 string


                // const base64Image = `data:image/jpeg;base64${Buffer.from(question.image.data).toString('base64')}`;
                // console.log(base64Image); // Log the Base64 string
                setcompimage(question.image); // Save the image for display
              }




              setComprehensionQuestions((prev) => [

                {
                  passage: question.passage || '', // Ensure passage exists
                  questions: question.questions || [], // Ensure questions array exists
                },
              ]);

              // Add Comprehension question to responses
              responses.push({
                Comp_passage: question.passage,
              });
            }
          });

          // Deduplicate responses based on question keys
          responses = responses.filter(
            (response, index, self) =>
              index ===
              self.findIndex(
                (t) =>
                  JSON.stringify(t) === JSON.stringify(response) // Ensure uniqueness
              )
          );

          // Update `userresponses` with deduplicated responses
          setuserresponses((prev) => [
            ...prev.filter(
              (prevResponse) =>
                !responses.some(
                  (newResponse) =>
                    JSON.stringify(newResponse) === JSON.stringify(prevResponse)
                )
            ),
            ...responses,
          ]);
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, [OID]);










  // Handle drop of item into category
  const handleDrop = (item, category) => {
    setItemCategories((prevCategories) => ({
      ...prevCategories,
      [item.name]: category,
    }));

  };

  const handleMoveItemWithinCategory = (itemName, fromCategory, toCategory) => {
    setItemCategories((prevCategories) => ({
      ...prevCategories,
      [itemName]: toCategory,
    }));
  };

  const Category = ({ name, onDrop, itemsInCategory }) => {
    const [{ isOver }, drop] = useDrop({
      accept: ItemTypes.ITEM,
      drop: (item) => onDrop(item, name),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    return (
      <div
        ref={drop}
        className={`category-box p-4 m-2 rounded-lg border-2 border-dashed ${isOver ? 'bg-gray-200' : 'bg-white'}`}
      >
        <h3 className="font-semibold text-xl text-center">{name}</h3>
        {/* Display items placed inside this category */}
        <div className="item-list">
          {itemsInCategory.map((itemName) => (
            <DraggableItemInCategory
              key={itemName}
              item={{ name: itemName }}
              category={name}
              onMoveItem={handleMoveItemWithinCategory}
            />
          ))}
        </div>
      </div>
    );
  };

  const DraggableItem = ({ item }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.ITEM,
      item: { name: item.name },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        className={`draggable-item p-2 mb-2 bg-blue-500 text-white rounded-lg shadow-md ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {item.name}
      </div>
    );
  };

  const DraggableItemInCategory = ({ item, category, onMoveItem }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.ITEM,
      item: { name: item.name },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [{ isOver }, drop] = useDrop({
      accept: ItemTypes.ITEM,
      drop: (draggedItem) => {
        if (draggedItem.name !== item.name) {
          onMoveItem(draggedItem.name, category, item.name === draggedItem.name ? category : item.name);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    return (
      <div
        ref={(node) => drag(drop(node))}
        className={`draggable-item-in-category p-2 mb-2 bg-blue-500 text-white rounded-lg shadow-md ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        style={{
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: isOver ? 'lightgray' : '',
        }}
      >
        {item.name}
      </div>
    );
  };




  // Evaluation function to check if the items are placed in the correct categories
  const evaluateAnswer = () => {

    let count = 0
    const responses = []; // Temporary array to collect responses

    items.forEach((item) => {
      // Assuming each item has a correct category in the form data
      const correctCategory = item.category; // This should be passed from the backend if available
      if (itemCategories[item.name] === correctCategory) {


        responses.push({
          cat_response: { item_Name: item.name, item_category: item.category },
        })

        count += 5
      }



    });





    return { count, responses }

  };




  // Cloze




  // DragItem Component - Represents each option the user can drag
  const DragItem = ({ option, index }) => {
    const [, drag] = useDrag(() => ({
      type: ItemTypes.ITEM,
      item: { index, option },
    }));

    return (
      <li
        ref={drag}
        className="cursor-pointer p-2 border rounded bg-blue-500 text-white mb-2 hover:bg-blue-400 transition duration-200"
      >
        {option}
      </li>
    );
  };

  // DropZone Component - Represents each blank space in the sentence
  const DropZone = ({ onDrop, index, children }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: ItemTypes.ITEM,
      drop: (item) => onDrop(item, index),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    return (
      <span
        ref={drop}
        className={`inline-block p-1 border-dashed border-2 ${isOver ? 'bg-green-100' : 'bg-gray-100'
          }`}
      >
        {children || '______'}
      </span>
    );
  };



  // Handle the drop event and update the answers state
  const HandleDrop = (item, blankIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[blankIndex] = item.option; // Add the option into the blank index
    setAnswers(updatedAnswers);
  };




  // Function to render the question text with blanks
  const renderQuestionTextWithBlanks = (questionText, answers) => {

    const splitText = questionText.split('______');

    return splitText.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < splitText.length - 1 && (
          <DropZone index={index} onDrop={HandleDrop}>
            <span className="inline-block w-36 h-10 bg-gray-200 border-2 border-dashed text-center text-gray-800">
              {answers || "______"}
            </span>
          </DropZone>
        )}
      </React.Fragment>
    ));
  };







  // Comprehension

  // Handle answer selection
  const handleAnswerChange = (compIndex, qIndex, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [`${compIndex}-${qIndex}`]: value, // Store answer with unique key
    }));
  };




  // Evaluate answers
  const evaluateAnswers = () => {
    const newResults = {};

    const Response = []

    let count = 0

    comprehensionQuestions.forEach((comp, compIndex) => {
      comp.questions.forEach((question, qIndex) => {
        const userAnswer = userAnswers[`${compIndex}-${qIndex}`];
        const correctAnswer = question.correctAnswer;

        Response.push({
          cloze_response: userAnswer
        })

        const isCorrect = userAnswer === correctAnswer;

        // Check if user's answer is correct
        newResults[`${compIndex}-${qIndex}`] = userAnswer === correctAnswer;


        if (isCorrect) {


          count += 5
        }



      });
    });

    setResults(newResults); // Update results


    // setuserresponses((prev) => [...prev, ...Response]); // Update state once
    return { count, responses: Response }; // Return score and responses

  };




  const handleSubmit = () => {

    let count = 0

    const Response = []
    clozeQuestions.forEach((question, index) => {

      Response.push({
        comp_response: answers[index]
      })


      if (answers[index] && answers[index] === question.correct_answer) {


        count += 5

      }
    });

    // alert(`You scored ${score} out of ${clozeQuestions.length}`);

    // setuserresponses((prev) => [...prev, ...Response]); // Update state once


    return { count, responses: Response }; // Return score and responses



  };




  async function saveScore(data) {



    localStorage.getItem('User_Phone')
    try {
      const response = await axios.post(`${SERVER_URL}/api/save-score`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Score saved successfully:', response.data);
 Swal.fire({
          title: 'Successfully Completed!',
          text: 'You have completed the test.',
          icon: 'success',
          confirmButtonText: 'Go to Results',
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to the success page or another page
            window.location.href = '/success'; // Change this to your desired page URL
          }
        });
    


        
      } else {
        console.error('Failed to save score:', response.data);
      }
    } catch (error) {
      console.error('Error sending score:', error);

      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }




  async function allresults() {
    let totalScore = 0; // Local variable to hold the cumulative score


    let calcualtecount = 0

    const U_Email = localStorage.getItem('User_Email')

    const U_Phone = localStorage.getItem('User_Phone')

    // Collect all the responses and scores
    const evaluateAnswerResult = evaluateAnswer();
    const handleSubmitResult = handleSubmit();
    const evaluateAnswersResult = evaluateAnswers();

    if (evaluateAnswerResult.count) {

      calcualtecount += 1
    }

    if (handleSubmitResult) {

      calcualtecount += 1
    }

    if (evaluateAnswersResult) {
      calcualtecount += 1
    }


    setcount(calcualtecount)

    // Add the individual section scores to totalScore
    totalScore += evaluateAnswerResult.count;
    totalScore += handleSubmitResult.count;
    totalScore += evaluateAnswersResult.count;

    // Prepare the complete user responses data
    const allResponses = [
      ...evaluateAnswerResult.responses,
      ...handleSubmitResult.responses,
      ...evaluateAnswersResult.responses,
    ];




    // Prepare the data to send
    const data = {
      score: totalScore,
      User_Responses: allResponses, // Use combined responses

      U_Email: U_Email,

      U_Phone: U_Phone,

      User_Question: userresponses


    };


await saveScore(data)




  }



  const [isTimeUp, setIsTimeUp] = useState(false);

  const navigate = useNavigate();



  useEffect(() => {
    if (timer <= 0) {
      setIsTimeUp(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Cleanup interval on component unmount or when timer reaches zero
    return () => clearInterval(interval);
  }, [timer]); // Dependency on 'timer' ensures it runs when 'timer' changes

  useEffect(() => {
    if (isTimeUp) {
      // Redirect to success page when timer finishes
      navigate('/success');
    }
  }, [isTimeUp, navigate]);

  // Format time as mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };




  






  return (
    <DndProvider backend={HTML5Backend}>
  <div className="form-container p-8 max-w-4xl mx-auto space-y-8">
    {formData.length > 0 ? (
      <>
        {/* Header Image Section */}
        {headerimage && (
          <div className="header-image-container mb-6">
            <img
              src={`${SERVER_URL}${headerimage}`}
              alt="Form Header"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Categorize Questions */}
        {categories.length > 0 && (
          <div className="categorize-section bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-6">{questionText}</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Categories Section */}
              <div className="categories-container flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {categories.map((category, index) => {
                    const itemsInCategory = Object.entries(itemCategories)
                      .filter(([itemName, itemCategory]) => itemCategory === category)
                      .map(([itemName]) => itemName);
                    return (
                      <Category
                        key={index}
                        name={category}
                        onDrop={handleDrop}
                        itemsInCategory={itemsInCategory}
                      />
                    );
                  })}
                </div>
                <div className="items-container grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
                  {items
                    .filter((item) => !itemCategories[item.name]) // Filter out items already placed in a category
                    .map((item, index) => (
                      <DraggableItem key={index} item={item} />
                    ))}
                </div>
              </div>

              {/* Image Section */}
              {categorizeImage && (
                <div className="image-container w-full sm:w-1/2 md:w-1/3 flex-shrink-0 mt-4 md:mt-0">
                  <h4 className="font-medium text-center mb-2">Uploaded Image</h4>
                  <div className="bg-gray-100 p-2 rounded-lg shadow-md">
                    <img
                      src={categorizeImage}
                      alt="Categorize Question"
                      className="w-full h-auto object-cover rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cloze Questions */}
        <div className="cloze-questions mt-8 bg-white p-6 rounded-lg shadow-md">
          {clozeQuestions.map((cloze, index) => (
            <div key={index} className="cloze-item p-6 mb-6 bg-white rounded-lg shadow-md border">
              {/* Flex container for the question and image */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Cloze Question Text Section */}
                <div className="question-text-container flex-1">
                  <p className="text-xl font-semibold mb-4 text-gray-800">
                    {renderQuestionTextWithBlanks(cloze.questionText, answers[index] || [])}
                  </p>

                  {/* Display the options */}
                  {cloze.options.length > 0 && (
                    <div className="options-container mt-6">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Drag the options:</h3>
                      <ul className="list-none pl-0">
                        {cloze.options.map((option, idx) => (
                          <DragItem key={idx} option={option} index={idx} />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Cloze Image Section */}
                {clozeimage && (
                  <div className="image-container w-full sm:w-1/3 flex-shrink-0 mt-4 md:mt-0">
                    <h4 className="font-medium text-center mb-2">Uploaded Image</h4>
                    <div className="bg-gray-100 p-2 rounded-lg shadow-md">
                      <img
                        src={clozeimage}
                        alt="Cloze Question"
                        className="w-full h-auto object-cover rounded"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Comprehension Questions */}
        {comprehensionQuestions.length > 0 && (
          <div className="comprehension-questions mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-6">Comprehension Questions</h2>
            {comprehensionQuestions.map((comp, compIndex) => (
              <div key={compIndex} className="comprehension-item mb-6">
                {/* Display Passage */}
                <div className="passage mb-4 flex flex-col md:flex-row items-center">
                  <div className="passage-text flex-1">
                    <h3 className="text-xl font-semibold mb-2">Passage:</h3>
                    <p className="text-gray-700">{comp.passage}</p>
                  </div>

                  {/* Display Image beside the passage */}
                  {compimage && (
                    <div className="image-container ml-6 w-32 h-32 bg-gray-100 p-2 rounded-lg shadow-md">
                      <img
                        src={compimage}
                        alt="Comprehension Image"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                {/* Render Questions */}
                {comp.questions.map((question, qIndex) => (
                  <div key={qIndex} className="question-item mb-4">
                    <h4 className="text-lg font-medium">
                      Q{qIndex + 1}: {question.text}
                    </h4>

                    {/* Render Options */}
                    <div className="options mt-2">
                      {question.options.map((option, oIndex) => (
                        <label key={oIndex} className="block text-gray-600 mb-2">
                          <input
                            type="radio"
                            name={`question-${compIndex}-${qIndex}`}
                            value={option}
                            onChange={() => handleAnswerChange(compIndex, qIndex, option)}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>

                    {/* Show Result for This Question */}
                    {results[`${compIndex}-${qIndex}`] !== undefined && (
                      <p
                        className={`mt-2 font-medium ${results[`${compIndex}-${qIndex}`] ? 'text-green-600' : 'text-red-600'
                          }`}
                      >
                        {results[`${compIndex}-${qIndex}`] ? 'Correct!' : 'Incorrect.'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Evaluation */}
        <div className="evaluation-container mt-8 text-center">
          <button
            className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition"
            onClick={allresults}
          >
            Submit
          </button>
        </div>
      </>
    ) : (
      <p className="text-center text-xl font-medium">Loading form...</p>
    )}
  </div>
</DndProvider>

  );

};

export default Form;










