

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
    _apiKey = 'apikey=cba563d54dbd68868980b1b6a1c84860';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error (`could not fetch, status ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}/${id}?${this._apiKey}`);
    }
}

export default MarvelService;