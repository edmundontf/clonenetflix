const API_KEY = 'dd38c3fff6d507d59e308defc3ed2db3';
const API_BASE = 'https://api.themoviedb.org/3';

/*
- originais da netflix
- recomendados ( em destaque)
- em alta ( to rated)
- lista de filmes de ação
- lista de filmes de comedia
- romance
- documentarios
*/ 


const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`); //faço requisição para um serviço externo ( a linha é executada e espera a resposta)
    const json = await req.json(); // Ao receber a resposta ele executa esta linha com a requisição
    return json;
}

export default {

    //Aqui pego todas as listas de conteudo da NetFlix

    getHomeList : async () => {
        return [
            {
                slug:'originals',
                title: 'Originais do netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'Trending',
                title: 'Recomendados da semana',
                items:await basicFetch(`/trending/all/week?&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'toprated',
                title: 'Em Alta',
                items: await basicFetch (`/movie/top_rated?&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'documentation',
                title: 'Documentarios',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },            
        ];
    },
    getMovieInfo: async (movieID, type)=>{
        let info ={}
        if(movieID){
            switch(type){
                case 'movie':
                     info = await basicFetch(`/movie/${movieID}?language=pt-BR&language=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv': 
                     info = await basicFetch(`/tv/${movieID}?language=pt-BR&language=pt-BR&api_key=${API_KEY}`);
                break;
                default: 
                    info = null;
            }
        }
        return info;
    }

}