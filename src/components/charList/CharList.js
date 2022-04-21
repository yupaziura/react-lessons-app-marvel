import { Component } from 'react';
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarverService';

class CharList extends Component{
    constructor (props) {
        super(props);
        this.state = {
            charList: []
        }    
    }

    marverService = new MarvelService();

    onSetState = (char) => {
        this.setState({charList: char})
    }

    onListLoad = () => {
        this.marverService
            .getAllCharacters()
            .then(this.onSetState);
    }

    componentDidMount(){
        this.onListLoad();
    }




    render () {

        const elem = this.state.charList.map ((item) => {
            const errorImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
            let styleImg;
            
            if (errorImg === item.thumbnail) {
                styleImg = {objectFit: 'contain', transform: 'translate(-15px, -30px)'}
            }
            else {
                styleImg = {objectFit: 'cover'}
            }
        
            return (
                <li className="char__item" key={item.id}>
                <img src={item.thumbnail} alt="abyss" style={styleImg}/>
                <div className="char__name">{item.name}</div>
            </li>
            )
        })

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {elem}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )    
    }
}

export default CharList;