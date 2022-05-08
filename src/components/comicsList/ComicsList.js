import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarverService';

// components
import ErrorMessage from '../errorMessage/error';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';


const ComicsList = () => {

        const [data, setData] = useState([]);
        const [offset, setOffset] = useState(0);

        const {loading, error, getAllComics} = useMarvelService();
        const [newLoading, setNewLoading] = useState(false);
        const limit = 5;

        const onLoaded = (newData) => {
           
            setData(data => [...data, ...newData]);
            setNewLoading(false);
            setOffset(offset + limit);
        }

        const onRequest = (offset, init) => {
            init ? setNewLoading(false) :  setNewLoading(true);

            getAllComics(offset, limit).then(onLoaded);

            console.log(data);
            console.log(offset)
        }
    
    
        useEffect(() => {onRequest(offset, true)}, [])


        const elem = data.map((item) => {
            return (
                <li className="comics__item" key={item.id}>
                <a href="#">
                    <img src={item.img} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </a>
            </li> 
            )
        })

        const errorMessage = error? <ErrorMessage/> : null;
        const spinner = loading && !newLoading? <Spinner/> : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {errorMessage}
                {spinner}
                {elem}
            </ul>
            <button className="button button__main button__long"
                    onClick={()=>{onRequest(offset)}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;