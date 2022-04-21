// basics
import {Component} from 'react';
import MarvelService from '../../services/MarverService';

// components
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/error';

// style
import './randomChar.scss';

// other
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component{

    state = {
        charData: {},
        loading: true,
        error: false
    }

    marverService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({charData: char, loading: false}) // or {char}
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    onCharLoading = () => {
        this.setState({loading: true})
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marverService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    componentDidMount() {
        this.updateChar();
    }

    render () {
        
        const {charData, loading, error} = this.state;
        const errorState = error? <ErrorMessage/> : null;
        const spinner = loading? <Spinner/> : null;
        const content = !(loading || error)? <View char={charData}/> : null;


        return (
            <div className="randomchar">
                {errorState}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )    
    }
}

const View = ({char}) => {

    const {name, description, homepage, wiki, thumbnail} = char;

    const errorImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    let styleImg;
    
    if (errorImg === thumbnail) {
        styleImg = 'contain'
    }
    else {
        styleImg = 'cover'
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={{objectFit: styleImg}}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;