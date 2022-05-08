import {useHttp} from '../hooks/http.hooks';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
    const _apiKey = 'apikey=cba563d54dbd68868980b1b6a1c84860';
    const _basicOffset = 210;


 


    const getAllCharacters = async (offset = _basicOffset) => {
        const res = await request(`${_apiBase}?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformData)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/${id}?${_apiKey}`);
        return _transformData(res.data.results[0])
    }

    const checkDescr = (descr) => {
        if (!descr) {
            return 'Sorry, there is no information about this character. Go to homepage.'
        }
        else if (descr.length >= 200) {
            return descr.substring(0, 200) + '...'
        }
        else {return descr}
    }

    const _transformData = (char) => {
         return {
            id: char.id,
            name: char.name,
            description: checkDescr(char.description),
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
         }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError}
}

export default useMarvelService;