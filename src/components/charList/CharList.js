//basic
import React, {useState, useEffect } from 'react';

// components
import ErrorMessage from '../errorMessage/error';
import Spinner from '../spinner/Spinner';

// style
import './charList.scss';

// other
import MarvelService from '../../services/MarverService';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newLoading, setNewLoading] = useState(false);
    const [offset, setOffset] = useState(1542);
    const [end, setEnd] = useState(false);


    const marverService = new MarvelService();

    const onCharLoaded = (newChar) => {
        let isEnd;
        
        if (newChar.length < 9) {
            isEnd = true
        }
        

        setCharList(charList => [...charList, ...newChar]);
        setLoading(false);
        setNewLoading(false);
        setOffset(offset + 9);
        setEnd(isEnd);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
        setNewLoading(false);
    }


    const omListLoading = () => {
        setNewLoading(true)
    }



    const onRequest = (offset) => {
        omListLoading();
        marverService
            .getAllCharacters(offset)
            .then(onCharLoaded)
            .catch(onError);
    }


    useEffect(() => {onRequest()}, [])


    const selectChar = (item) => {

        props.setId(item.id);
    }



    const elem = <ListItem charList={charList}
                            selectChar={selectChar}
    />

    const list = charList? elem : null;
    const spinner = loading? <Spinner/> : null;
    const errorMess = error? <ErrorMessage/> : null;

    return (
        <div className="char__list" key={0}>
            <ul className="char__grid">
                {spinner}
                {errorMess}
                {list}
            </ul>
            <button className="button button__main button__long"
                    disabled={newLoading}
                    onClick={()=> {onRequest(offset)}}
                    style={{display: end? 'none' : 'block'}}
                    >
                <div className="inner">load more</div>
            </button>
        </div>
    )    
    
}

const ListItem = (props) => {

   
    const [charId, setCharId] = useState(null)

    const clickIt = (item) => {
        
        setCharId( item.id);
        props.selectChar(item)
    }


        const elem = props.charList.map((item) => {
            const errorImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
            let styleImg;
            
            if (errorImg === item.thumbnail) {
                styleImg = {objectFit: 'fill'}
            }
            else {
                styleImg = {objectFit: 'cover'}
            }

            let clazz;

            if(charId !== item.id) {
                clazz = 'char__item'
            }
            else {
                clazz = 'char__item char__item_sel'
            }


        
            return (

                <li className={clazz}
                    onClick = {()=>clickIt(item)}
                    key={item.id}
                >
                    
                    <img src={item.thumbnail} alt="abyss" style={styleImg}/>
                    <div className="char__name">{item.name}</div>
                </li>


            )
        });


        return (
            <>
            {elem}
            </>
        )
}

export default CharList;