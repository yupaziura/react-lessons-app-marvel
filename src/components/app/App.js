// basic
import {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';

// style
import decoration from '../../resources/img/vision.png';

const App = () => {
    const [charId, setChar] = useState(null);

    const setId = (id) => {
        setChar(id)
    }


   
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
                            {/* we cat paste component inside error boundary */}
                            <ErrorBoundary>
                                <RandomChar/>
                            </ErrorBoundary>
                            <div className="char__content">
                                <ErrorBoundary>
                                    <CharList setId={setId} />
                                </ErrorBoundary>
                                <ErrorBoundary>
                                    <CharInfo charId={charId}/>
                                </ErrorBoundary>
                            </div>
                            
                            <img className="bg-decoration" src={decoration} alt="vision"/>
                        </Route>

                        <Route exact path='/comics'>
                            <AppBanner/>              
                            <ComicsList/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )    
    
}

export default App;