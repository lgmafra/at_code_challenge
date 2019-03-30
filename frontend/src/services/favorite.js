import localApi from './localApi'
import Utils from './utils'

export default class Favorite {

    static saveFavorite = async (movie) => {
        let favorite = await localApi.get('favorite/search', {
            params: {
                movie_id: movie.movie_id
            },
        })

        if(favorite.data.length === 0){
            favorite = await localApi.post('favorite/create', {
                params: movie
            })
        }

        return favorite.status === 200
    }

    static getFavorites = async (page) => {
        const response = await localApi.get('favorite',{
            params: {
                api_key: Utils.getAuthToken(),
                page: page
            }
        })

        return response
    }
}
