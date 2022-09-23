import {useState} from 'react';
import { Helmet } from 'react-helmet';


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
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
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