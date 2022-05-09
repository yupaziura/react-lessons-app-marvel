// basic
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import MainPage from '../pages/MainPage';
import ComicsPage from '../pages/ComicsPage';
import AppHeader from "../appHeader/AppHeader";

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
                    <Switch>
                        <Route exact path='/'>
                            <MainPage/>
                        </Route>

                        <Route exact path='/comics'>
                            <ComicsPage/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )    
    
}

export default App;