// basic
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// components
import MainPage from '../pages/MainPage';
import ComicsPage from '../pages/ComicsPage';
import AppHeader from "../appHeader/AppHeader";
import NotFoundPage from '../pages/404';

const App = () => {



   
    // to switch between pages we need to create Router
    // then wrap all pages into Switch
    // each page content wrap into Route
    // each route has path
        
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route  path='/' element={<MainPage/>}/>
                        <Route  path='/comics' element={ <ComicsPage/>}/>
                        <Route  path='/*' element={ <NotFoundPage/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )    
    
}

export default App;