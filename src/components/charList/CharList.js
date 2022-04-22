//basic
import { Component } from 'react';

// components
import ErrorMessage from '../errorMessage/error';
import Spinner from '../spinner/Spinner';

// style
import './charList.scss';

// other
import MarvelService from '../../services/MarverService';

class CharList extends Component{
    constructor (props) {
        super(props);
        this.state = {
            charList: [],
            error: false,
            loading: true
        }    
    }

    marverService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({charList: char, loading: false}) // or {char}
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    onCharLoading = () => {
        this.setState({loading: true})
    }


    onListLoad = () => {
        this.onCharLoading();
        this.marverService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    componentDidMount(){
        this.onListLoad();
    }




    render () {

        const elem = this.state.charList.map ((item) => {
            const errorImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
            let styleImg;
            
            if (errorImg === item.thumbnail) {
                styleImg = {objectFit: 'fill'}
            }
            else {
                styleImg = {objectFit: 'cover'}
            }
        
            return (
                <li className="char__item" 
                    key={item.id}
                    onClick={() => {this.props.setId(item.id)}}
                    >
                <img src={item.thumbnail} alt="abyss" style={styleImg}/>
                <div className="char__name">{item.name}</div>
            </li>
            )
        });

        const list = this.state.charList? elem : null;
        const spinner = this.state.loading? <Spinner/> : null;
        const errorMess = this.state.error? <ErrorMessage/> : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {spinner}
                    {errorMess}
                    {list}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )    
    }
}

export default CharList;