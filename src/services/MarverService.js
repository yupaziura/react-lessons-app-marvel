

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

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformData)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/${id}?${this._apiKey}`);
        return this._transformData(res.data.results[0])
    }

    checkDescr = (descr) => {
        if (!descr) {
            return 'Sorry, there is no information about this character. Go to homepage.'
        }
        else if (descr.length >= 200) {
            return descr.substring(0, 200) + '...'
        }
        else {return descr}
    }

    _transformData = (char) => {
         return {
            id: char.id,
            name: char.name,
            description: this.checkDescr(char.description),
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
         }
    }
}

export default MarvelService;