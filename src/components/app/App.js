// basic
import {Component} from 'react';

// components
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

// style
import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        charId: null,
    }

    setId = (id) => {
        this.setState({charId: id});
    }

    render () {

        
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    {/* we cat paste component inside error boundary */}
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList setId={this.setId} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={this.state.charId}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )    
    }
}

export default App;