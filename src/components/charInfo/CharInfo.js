// basic
import {Component} from 'react';

// components
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/error';
import Skeleton from '../skeleton/Skeleton';

// style
import './charInfo.scss';

// other
import MarvelService from '../../services/MarverService';




class CharInfo extends Component {
    state = {
        charData: null,
        loading: false,
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
        const {charId} = this.props;
        if(!charId) {
            return;
        }

        this.onCharLoading();
        this.marverService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    componentDidMount() {
        this.updateChar();
    }

    // didUpdate takes 2 arguments
    // so we can compare prev props or state with current
    // so we cant prevent loops
    componentDidUpdate(prevProps, prevState) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    render () {

        const {charData, loading, error} = this.state;

        const skeleton = loading || charData || error?  null: <Skeleton/> ;
        const errorState = error? <ErrorMessage/> : null;
        const spinner = loading? <Spinner/> : null;
        const content = !(loading || error || !charData)? <View charData={charData}/> : null;


        return (
            <div className="char__info">
                {skeleton}
                {errorState}
                {spinner}
                {content}
            </div>
        )    
    }
}

const View = ({charData}) => {
    const {name, description, homepage, wiki, thumbnail, comics} = charData;

    const errorImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    let styleImg;
    
    if (errorImg === thumbnail) {
        styleImg = 'contain'
    }
    else {
        styleImg = 'cover'
    }


    const comicsElem = comics.map((item, i) => {
        if (i > 9) {return}
        return (
            <li className="char__comics-item" key={i}>
            {item.name}
        </li>
        )
    })

    

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={{objectFit: styleImg}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length < 1 ? <div>There is no information</div> : comicsElem}
            </ul>
        </>
    )
}

export default CharInfo;