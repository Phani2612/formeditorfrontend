import logo from './logo.svg';
import './App.css';
import Body from './components/Body';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Form from './components/Form';
import FormPage from './components/Formpage';
import Success from './components/Success';

function App() {
  return (
    <BrowserRouter>



<Routes>




<Route path='/' element = {<Body/>} ></Route>



   


<Route path='/form/:OID' element = {<FormPage/>} ></Route>

<Route path='/question/:OID' element = {<Form/>}  ></Route>

<Route path='/success' element = {<Success/>} ></Route>


</Routes>






    </BrowserRouter>
  );
}

export default App;
