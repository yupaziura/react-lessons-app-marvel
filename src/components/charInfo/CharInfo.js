// basic
import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarverService';
import setContent from '../../utils/setContent';


// components

// style
import './charInfo.scss';




const CharInfo = (props) => {

    const [charData, setCharData] = useState(null);

    const {loading, error, getCharacter, clearError,process, setProcess} =  useMarvelService();

    const onCharLoaded = (char) => {
        setCharData(char);
    }


    const updateChar = () => {
        
        if(!props.charId) {
            return;
        }

        clearError();
        getCharacter(props.charId)
            .then(onCharLoaded)
            .then(()=>setProcess('confirmed'));
           
    }




    useEffect(() => {updateChar()}, [props.charId]);


    return (
        <div className="char__info">
            {setContent(process,View, charData)}
        </div>
    )    
}

const View = ({data}) => {
    const {name, description, homepage, wiki, thumbnail, comics} = data;

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