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
            loading: true,
            newLoading: false,
            offset: 1542,
            end: false,
        }    
    }

    marverService = new MarvelService();

    onCharLoaded = (newChar) => {
        let isEnd;
        console.log(newChar)
        if (newChar.length < 9) {
            isEnd = true
        }
        this.setState(({charList}) => ({
            charList: [...charList, ...newChar], 
            loading: false,
            newLoading: false,
            offset: this.state.offset + 9,
            end: isEnd,
            })) // or {char}
    }

    onError = () => {
        this.setState({loading: false, error: true, newLoading:false})
    }

    onCharLoading = () => {
        this.setState({loading: true})
    }

    omListLoading = () => {
        this.setState({newLoading: true})
    }

    onListLoad = () => {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.omListLoading();
        this.marverService
            .getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    componentDidMount(){
        this.onRequest();
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
                <button className="button button__main button__long"
                        disabled={this.state.newLoading}
                        onClick={()=> {this.onRequest(this.state.offset)}}
                        style={{display: this.state.end? 'none' : 'block'}}
                        >
                    <div className="inner">load more</div>
                </button>
            </div>
        )    
    }
}

export default CharList;