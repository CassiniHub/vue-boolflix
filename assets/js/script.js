function init() {

    new Vue ({
        el: '#app',

        data: {
            search: 'ritorno al fut',
            films: [],
            tvSeries: []
        },

        methods: {
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

            getStarRange: function (array) {
                // creating needed parameters to calculate the new rating range (from 0 / 10 to 0 / 5)
                const oldMin = 0;
                const oldMax = 10;
                const newMin = 0;
                const newMax = 5;

                for (let i = 0; i < array.length; i++) {
                    const elem = array[i];
                    
                    // get the old value
                    const oldValue = elem.vote_average;

                    // get the new value
                    const newValue = Math.round((((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin);

                    // change the old value inside the array (films / tvSeries) with the new value
                    elem.vote_average = newValue;
                }
            },

            // Get % ov the full stars to show in html
            starsRating: function (elem) {
                return elem.vote_average * 20;
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
                    if (newFilm.original_language == 'en') {
                        newFilm.languageFlag = 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg';

                    } else if (newFilm.original_language == 'it') {
                        newFilm.languageFlag = 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg';

                    } else {
                        newFilm.languageFlag = 'https://upload.wikimedia.org/wikipedia/commons/6/61/Flag.svg';
                    }

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
                    if (newTvSerie.original_language == 'en') {
                        newTvSerie.languageFlag = 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg';

                    } else if (newTvSerie.original_language == 'it') {
                        newTvSerie.languageFlag = 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg';

                    } else {
                        newTvSerie.languageFlag = 'https://upload.wikimedia.org/wikipedia/commons/6/61/Flag.svg';
                    }

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