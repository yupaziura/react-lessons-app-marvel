import { useEffect, useState } from 'react';
import {useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarverService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/error';

import './singleComic.scss';

const SingleComicPage = () => {
    // const params = useParams();
    // console.log(params) {comicId: '384'}

    const {comicId} = useParams();

    const {loading, error, getComic, clearError} =  useMarvelService();

    const [data, setData] = useState({});

    const onComicLoaded = (comic) => {
        setData(comic);
        console.log(data)
    }

    const updateChar = () => {
        
        if(!comicId) {
            return;
        }

        clearError();
        getComic(comicId)
            .then(onComicLoaded);
           
    }


    useEffect(() => {updateChar()}, []);

    const errorState = error? <ErrorMessage/> : null;
    const spinner = loading? <Spinner/> : null;
    const element = !loading && !error ? <>
        <img src={data.img} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{data.title}</h2>
                <p className="single-comic__descr">{data.descr}</p>
                <p className="single-comic__descr">{data.pages} pages</p>
                <p className="single-comic__descr">Language: {data.language}</p>
                <div className="single-comic__price">{data.price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
    </> : null;



    return (
        <>
            {errorState}
            {spinner}

            <div className="single-comic">
                {element}
            </div>
        </>
    )
}

export default SingleComicPage;