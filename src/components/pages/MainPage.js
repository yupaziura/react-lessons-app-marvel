import {useState} from 'react';


import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';


import decoration from '../../resources/img/vision.png';


const MainPage = () => {

    const [charId, setChar] = useState(null);

    const setId = (id) => {
        setChar(id)
    }

    return (
        <>
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
        </>
    )
}

export default MainPage;