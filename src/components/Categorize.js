// import React, { useState } from 'react';
// import '../styles/Categorize.css';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const Categorize = ({ onSave }) => {
//   const [questionText, setQuestionText] = useState('');
//   const [categories, setCategories] = useState(['']);
//   const [items, setItems] = useState([{ name: '', category: '' }]);



//   // Handle adding a new category input field
//   const handleAddCategory = () => {
//     setCategories([...categories, '']);
//   };

//   // Handle category input change
//   const handleCategoryChange = (index, value) => {
//     const newCategories = [...categories];
//     newCategories[index] = value;
//     setCategories(newCategories);
//   };

//   // Handle adding a new item
//   const handleAddItem = () => {
//     setItems([...items, { name: '', category: '' }]);
//   };

//   // Handle item input changes (name and category)
//   const handleItemChange = (index, field, value) => {
//     const newItems = [...items];
//     newItems[index][field] = value;
//     setItems(newItems);
//   };

  

//   // Handle save action
//   const handleSave = () => {
//     onSave({
//       type: 'Categorize',
//       questionText,
//       categories,
//       items,
//     });
//   };

//   return (
//     <div className="categorize-question p-4 border rounded bg-white shadow-md">
//       <h3 className="text-lg font-semibold">Categorize Question</h3>
      
//       {/* Main question input */}
//       <textarea
//         value={questionText}
//         onChange={(e) => setQuestionText(e.target.value)}
//         placeholder="Enter your main question"
//         className="w-full p-2 border rounded mt-2"
//       />

//       {/* Category inputs */}
//       <div className="categories mt-4">
//         <h4 className="font-medium">Categories</h4>
//         {categories.map((category, index) => (
//           <div key={index} className="flex items-center mt-2">
//             <input
//               type="text"
//               value={category}
//               onChange={(e) => handleCategoryChange(index, e.target.value)}
//               placeholder={`Category ${index + 1}`}
//               className="w-full p-2 border rounded"
//             />
//             {index === categories.length - 1 && (
//               <button
//                 type="button"
//                 onClick={handleAddCategory}
//                 className="ml-2 text-blue-500"
//               >
//                 Add Category
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Item inputs */}
//       <div className="items mt-4">
//         <h4 className="font-medium">Items</h4>
//         {items.map((item, index) => (
//           <div key={index} className="flex items-center mt-2">
//             <input
//               type="text"
//               value={item.name}
//               onChange={(e) => handleItemChange(index, 'name', e.target.value)}
//               placeholder={`Item ${index + 1}`}
//               className="w-full p-2 border rounded"
//             />
//             <select
//               value={item.category}
//               onChange={(e) => handleItemChange(index, 'category', e.target.value)}
//               className="ml-2 p-2 border rounded"
//             >
//               <option value="">Select Category</option>
//               {categories.map((category, categoryIndex) => (
//                 <option key={categoryIndex} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//             {index === items.length - 1 && (
//               <button
//                 type="button"
//                 onClick={handleAddItem}
//                 className="ml-2 text-blue-500"
//               >
//                 Add Item
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Save button */}
//       <button onClick={handleSave} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
//         Save Question
//       </button>
//     </div>
//   );
// };

// export default Categorize;










// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import '../styles/Categorize.css'; // Add any custom CSS here


// const Categorize = ({ onSave }) => {
//   const [questionText, setQuestionText] = useState('');
//   const [categories, setCategories] = useState(['']);
//   const [items, setItems] = useState([{ name: '', category: '' }]);

//   const [image, setImage] = useState(null); // State for the uploaded image

//   const handleAddCategory = () => {
//     setCategories([...categories, '']);
//   };

//   const handleCategoryChange = (index, value) => {
//     const newCategories = [...categories];
//     newCategories[index] = value;
//     setCategories(newCategories);
//   };

//   const handleAddItem = () => {
//     setItems([...items, { name: '', category: '' }]);
//   };

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...items];
//     newItems[index][field] = value;
//     setItems(newItems);
//   };

//   const handleDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const newItems = Array.from(items);
//     const [movedItem] = newItems.splice(source.index, 1);
//     newItems.splice(destination.index, 0, movedItem);

//     setItems(newItems);
//   };


//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result); // Store the image as a base64 string
//       };
//       reader.readAsDataURL(file);
//     }
//   };



//   const handleSave = () => {
//     onSave({
//       type: 'Categorize',
//       questionText,
//       categories,
//       items,
//       image, // Include the image in the saved data
//     });
//   };

//   return (
//     <div className="categorize-question p-4 border rounded bg-white shadow-md">
//       <h3 className="text-lg font-semibold">Categorize Question</h3>

//       {/* Main question input */}
//       <textarea
//         value={questionText}
//         onChange={(e) => setQuestionText(e.target.value)}
//         placeholder="Enter your main question"
//         className="w-full p-2 border rounded mt-2"
//       />





// {/* Image Upload */}
// <div className="image-upload mt-4">
//         <h4 className="font-medium">Upload Image</h4>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="mt-2"
//         />
//         {image && (
//           <div className="mt-2">
//             <img
//               src={image}
//               alt="Uploaded Preview"
//               className="w-32 h-32 object-cover border"
//             />
//           </div>
//         )}
//       </div>









//       {/* Categories Section */}
//       <div className="categories mt-4">
//         <h4 className="font-medium">Categories</h4>
//         {categories.map((category, index) => (
//           <div key={index} className="flex items-center mt-2">
//             <input
//               type="text"
//               value={category}
//               onChange={(e) => handleCategoryChange(index, e.target.value)}
//               placeholder={`Category ${index + 1}`}
//               className="w-full p-2 border rounded"
//             />
//             {index === categories.length - 1 && (
//               <button
//                 type="button"
//                 onClick={handleAddCategory}
//                 className="ml-2 text-blue-500"
//               >
//                 Add Category
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Items Section */}
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="items">
//           {(provided) => (
//             <div
//               className="items mt-4"
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//             >
//               <h4 className="font-medium">Items</h4>
//               {items.map((item, index) => (
//                 <Draggable
//                   key={`item-${index}`}
//                   draggableId={`item-${index}`}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <div
//                       className="flex items-center mt-2"
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                     >
//                       {/* Drag Handle */}
//                       <span
//                         className="cursor-move p-2 text-gray-600"
//                         {...provided.dragHandleProps}
//                       >
//                         ☰
//                       </span>

//                       {/* Item Input */}
//                       <input
//                         type="text"
//                         value={item.name}
//                         onChange={(e) =>
//                           handleItemChange(index, 'name', e.target.value)
//                         }
//                         placeholder={`Item ${index + 1}`}
//                         className="w-full p-2 border rounded ml-2"
//                       />

//                       {/* Category Dropdown */}
//                       <select
//                         value={item.category}
//                         onChange={(e) =>
//                           handleItemChange(index, 'category', e.target.value)
//                         }
//                         className="ml-2 p-2 border rounded"
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map((category, categoryIndex) => (
//                           <option key={categoryIndex} value={category}>
//                             {category}
//                           </option>
//                         ))}
//                       </select>

//                       {/* Add Item Button */}
//                       {index === items.length - 1 && (
//                         <button
//                           type="button"
//                           onClick={handleAddItem}
//                           className="ml-2 text-blue-500"
//                         >
//                           Add Item
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>

//       {/* Save Button */}
//       <button
//         onClick={handleSave}
//         className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
//       >
//         Save Question
//       </button>
//     </div>
//   );
// };

// export default Categorize;







import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import '../styles/Categorize.css'; // Add any custom CSS here
import swal from 'sweetalert';



const Categorize = ({ onSave }) => {
  const [questionText, setQuestionText] = useState('');
  const [categories, setCategories] = useState(['']);
  const [items, setItems] = useState([{ name: '', category: '' }]);
  const [image, setImage] = useState(null); // State for the uploaded image

  const handleAddCategory = () => {
    setCategories([...categories, '']);
  };

  const handleCategoryChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', category: '' }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === 'category') {
      const newCategories = Array.from(categories);
      const [movedCategory] = newCategories.splice(source.index, 1);
      newCategories.splice(destination.index, 0, movedCategory);
      setCategories(newCategories);
    } else if (type === 'item') {
      const newItems = Array.from(items);
      const [movedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, movedItem);
      setItems(newItems);
    }
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
        text: "Please enter the question.",
        icon: "warning",
        buttons: "OK",
      });
      return;
    }
  
    if (categories.length === 0 || categories.some(category => !category.trim())) {
      swal({
        title: "Missing Categories!",
        text: "Please add at least one category and ensure all categories are filled out.",
        icon: "warning",
        buttons: "OK",
      });
      return;
    }
  
    if (items.length === 0 || items.some(item => !item.name.trim() || !item.category.trim())) {
      swal({
        title: "Incomplete Items!",
        text: "Please add at least one item and ensure all items have a name and a category.",
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
    onSave({
      type: 'Categorize',
      questionText,
      categories,
      items,
      image, // Include the image in the saved data
    });
  
    swal({
      title: "Success!",
      text: "Your question has been saved successfully.",
      icon: "success",
      buttons: "OK",
    });



    // setQuestionText('')
    // setCategories([''])

    // setItems([{ name: '', category: '' }])

    // setImage(null)

  };







  return (
    <div className="categorize-question p-4 border rounded bg-white shadow-md max-w-4xl mx-auto">
  <h3 className="text-lg font-semibold">Categorize Question</h3>

  {/* Main question input */}
  <textarea
    value={questionText}
    onChange={(e) => setQuestionText(e.target.value)}
    placeholder="Enter your main question"
    className="w-full p-2 border rounded mt-2 resize-none"
  />

  {/* Image Upload */}
  <div className="image-upload mt-4">
    <h4 className="font-medium">Upload Image</h4>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="mt-2"
    />
    {image && (
      <div className="mt-2">
        <img
          src={image}
          alt="Uploaded Preview"
          className="w-32 h-32 object-cover border rounded"
        />
      </div>
    )}
  </div>

  {/* Categories Section */}
  <div className="categories mt-4">
    <h4 className="font-medium">Categories</h4>
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="categories" type="category">
        {(provided) => (
          <div
            className="flex flex-col mt-2 space-y-2"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {categories.map((category, index) => (
              <Draggable
                key={index}
                draggableId={`category-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    className="flex items-center"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    {/* Drag Handle */}
                    <span
                      className="cursor-move p-2 text-gray-600"
                      {...provided.dragHandleProps}
                    >
                      ☰
                    </span>

                    {/* Category Input */}
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => handleCategoryChange(index, e.target.value)}
                      placeholder={`Category ${index + 1}`}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    <button
      type="button"
      onClick={handleAddCategory}
      className="mt-2 text-blue-500 hover:underline"
    >
      Add Category
    </button>
  </div>

  {/* Items Section */}
  <DragDropContext onDragEnd={handleDragEnd}>
    <Droppable droppableId="items" type="item">
      {(provided) => (
        <div
          className="items mt-4"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h4 className="font-medium">Items</h4>
          {items.map((item, index) => (
            <Draggable
              key={`item-${index}`}
              draggableId={`item-${index}`}
              index={index}
            >
              {(provided) => (
                <div
                  className="flex items-center mt-2 space-x-2"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                >
                  {/* Drag Handle */}
                  <span
                    className="cursor-move p-2 text-gray-600"
                    {...provided.dragHandleProps}
                  >
                    ☰
                  </span>

                  {/* Item Input */}
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, 'name', e.target.value)
                    }
                    placeholder={`Item ${index + 1}`}
                    className="w-full p-2 border rounded"
                  />

                  {/* Category Dropdown */}
                  <select
                    value={item.category}
                    onChange={(e) =>
                      handleItemChange(index, 'category', e.target.value)
                    }
                    className="p-2 border rounded"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category, categoryIndex) => (
                      <option key={categoryIndex} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  {/* Add Item Button */}
                  {index === items.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="text-blue-500 ml-2 hover:underline"
                    >
                      Add Item
                    </button>
                  )}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>

  {/* Save Button */}
  <button
    onClick={handleSave}
    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
  >
    Save Question
  </button>
</div>

  );
};

export default Categorize;
