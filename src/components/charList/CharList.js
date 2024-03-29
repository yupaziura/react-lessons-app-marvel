//basic
import React, {useState, useEffect } from 'react';
import Skeleton from '../skeleton/Skeleton';

// components
import ErrorMessage from '../errorMessage/error';
import Spinner from '../spinner/Spinner';

// style
import './charList.scss';

// other
import useMarvelService from '../../services/MarverService';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newLoading, setNewLoading] = useState(false);
    const [offset, setOffset] = useState(1542);
    const [end, setEnd] = useState(false);

    const setContent = (process, selectChar, charList, newLoading) => {
        switch (process) {
            case 'waiting':
                return <Skeleton/>
                break;
            case 'loading': 
                return newLoading? <ListItem selectChar={selectChar} charList={charList}/> :  <Spinner/>
                break;
            case 'confirmed':
                return <ListItem selectChar={selectChar} charList={charList}/>;
                break
            case 'error' :
                return <ErrorMessage/>
                break;
    
            default :
                throw new Error('unexpected error')
        }
    }


    const {loading, error, getAllCharacters,process, setProcess} = useMarvelService();

    const onCharLoaded = (newChar) => {
        let isEnd;
        
        if (newChar.length < 9) {
            isEnd = true
        }
        

        setCharList(charList => [...charList, ...newChar]);
        setNewLoading(false);
        setOffset(offset + 9);
        setEnd(isEnd);
    }


    const onRequest = (offset, init) => {
        init ?  setNewLoading(false) :  setNewLoading(true);
       
        
            getAllCharacters(offset)
            .then(onCharLoaded)
            .then(()=> setProcess('confirmed'));
            
    }


    useEffect(() => {onRequest(offset, true)}, [])


    const selectChar = (item) => {

        props.setId(item.id);
    }




    
    const spinner = loading && !newLoading? <Spinner/> : null;
    const errorMess = error? <ErrorMessage/> : null;

    return (
        <div className="char__list" key={0}>
            <ul className="char__grid">
                {setContent(process, selectChar, charList, newLoading)}
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