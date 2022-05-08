import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarverService';

import './comicsList.scss';


const ComicsList = () => {

        const [data, setData] = useState([]);

        const {loading, error, getAllComics} = useMarvelService();

        const onLoaded = () => {
            setData(data => [...data]);
        }

        const onRequest = () => {
            getAllComics().then(setData);
                
        }
    
    
        useEffect(() => {onRequest()}, [])


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

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {elem}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;