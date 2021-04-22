function init() {

    new Vue ({
        el: '#app',

        data: {
            search: 'ritorno al fut',

            films: [],
            filmCast: {},
            showIndexFilm: null,

            tvSeries: [],
            tvSeriesCast: [],
            showIndexTvSeries: null
        },

        methods: {
            // Get films data from API
            getFilms: function () {
                axios.get('https://api.themoviedb.org/3/search/movie', {

                    params: {
                        'api_key': '4112d8611cb3fa646e80b753d8213869',
                        'query': this.search
                    }
                })
                .then(data => {
                    this.films = data.data.results;
                })
            },

            // Get films cast data from API
            getFilmCast: function (id) {
                axios.get('https://api.themoviedb.org/3/movie/' + id + '/credits', {

                        params: {
                            'api_key': '4112d8611cb3fa646e80b753d8213869',
                        }
                    })
                    .then(data => {
                        
                        // link the created cast object to the data variable used in html
                        this.filmCast = this.getSelectedCast([...data.data.cast], id);
                    })
            },

            // Get tv series data from API
            getTvSeries: function () {
                axios.get('https://api.themoviedb.org/3/search/tv', {

                    params: {
                        'api_key': '4112d8611cb3fa646e80b753d8213869',
                        'query': this.search
                    }
                })
                .then(data => {
                    this.tvSeries = data.data.results;
                })
            },

            // Get tv series cast data from API
            getTvSeriesCast: function (id) {
                axios.get('https://api.themoviedb.org/3/tv/' + id + '/credits', {

                        params: {
                            'api_key': '4112d8611cb3fa646e80b753d8213869',
                        }
                    })
                    .then(data => {
                        
                        // link the created cast object to the data variable used in html
                        this.tvSeriesCast = this.getSelectedCast([...data.data.cast], id);
                    })
            },

            // Create the object of the selected film/tv series cast
            getSelectedCast: function (arrayCast, id) {
                let actors = arrayCast;
                    actors.splice(5);
                    
                    // Create the object of the selected tv series
                    let cast = {
                        id: id,
                        actors: actors
                    }

                    return cast;
            },

            // Get % of the full stars to show in html
            starsRating: function (elem) {
                return elem.vote_average * 20;
            },

            // Add flag key to an object
            getLanguageFlag: function (obj) {
                if (obj.original_language == 'en') {
                    obj.languageFlag = 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg';

                } else if (obj.original_language == 'it') {
                    obj.languageFlag = 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg';

                } else {
                    obj.languageFlag = 'https://upload.wikimedia.org/wikipedia/commons/6/61/Flag.svg';
                }
            }
        },

        mounted() {            
        },

        computed: {
            modifiedFilms: function () {
                let newFilmsArray = this.films.map(film => {

                    // Create a copy of every film object to manipulate without modifying the original object
                    let newFilm = {...film}
                    
                    // Add flag key to every film object
                    this.getLanguageFlag(newFilm);

                    // change the rating system from 1 / 10 to 1 / 5
                    newFilm.vote_average = Math.floor(newFilm.vote_average / 2);
                    
                    return newFilm;
                });

                return newFilmsArray;
            },

            modifiedTvSeries: function () {
                let newTvSeriesArray = this.tvSeries.map(tvSerie => {

                    // Create a copy of every film object to manipulate without modifying the original object
                    let newTvSerie = {...tvSerie}

                    // Add flag key to every film object
                    this.getLanguageFlag(newTvSerie);

                    // change the rating system from 1 / 10 to 1 / 5
                    newTvSerie.vote_average = Math.floor(newTvSerie.vote_average / 2);

                    return newTvSerie;
                });

                return newTvSeriesArray;
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", init);