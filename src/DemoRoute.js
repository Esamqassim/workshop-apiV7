import { Route,Routes,Link, BrowserRouter as Router } from 'react-router-dom' 
import About from './About'
import Home from './Home'
import Person from './Person'
import Wellcome from './Wellcome'
import Crud from './Table'
import PersonDetails from './PersonDetails'
import PersonUpdate from './PersonUpdate'

function DemoRoute(){
    return(
      <div  className="container">
        
        <Router>
   
     
    <nav>
   
      <ul>
      <li>
        <Link to="/wellcome">React</Link>
        </li>
        <li>
        <Link to="/home">Home</Link>
        </li>
        <li>
        <Link to="/person">Person</Link>
        </li>
        <li>
                <Link to="/about">About</Link>
        </li>

        <li>
                <Link to="/crud">Crud</Link>
        </li>
      </ul>
     
    </nav>
      <Routes>
      
      <Route path="about" element={<About />} />
      <Route path="home" element={<Home />} />
      <Route path="person" element={<Person />} />
      <Route path="wellcome" element={<Wellcome />} />
     
      <Route path="crud" element={<Crud />} />
      <Route path="/PersonDetails/:id" element={<PersonDetails />}></Route>
      <Route path="/PersonUpdate/:id" element={<PersonUpdate  />}></Route>
      </Routes>
     
     </Router>  
 
      </div>
    )
  }

  export default DemoRoute