// basic
import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarverService';

// components
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ComicsList from '../comicsList/ComicsList';

// style
import decoration from '../../resources/img/vision.png';

const App = () => {
    const [charId, setChar] = useState(null);

    const setId = (id) => {
        setChar(id)
    }


   

        
    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* we cat paste component inside error boundary */}
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    {/* <ErrorBoundary>
                        <CharList setId={setId} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={charId}/>
                    </ErrorBoundary> */}
                    <ErrorBoundary>
                        <ComicsList/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )    
    
}

export default App;