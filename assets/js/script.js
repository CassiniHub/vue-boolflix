function init() {

    new Vue ({
        el: '#app',

        data: {
            search: 'ritorno al fut',
            films: [],
            tvSeries: [],
            flags: {
                ita: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg',
                en : 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg',
                unk: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Flag.svg'
            }
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
                    this.getStarRange(this.films);
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
                    this.getStarRange(this.tvSeries);
                })
            },

            getStarRange: function (array) {
                const oldMin = 0;
                const oldMax = 10;
                const newMin = 0;
                const newMax = 5;

                for (let i = 0; i < array.length; i++) {
                    const elem = array[i];
                    
                    const oldValue = elem.vote_average;

                    const newValue = Math.round((((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin);

                    elem.vote_average = newValue;
                    console.log(elem.vote_average);
                }
            },

            starsRating: function (elem) {
                return elem.vote_average * 20;
            }
        },

        mounted() {            
        },

        computed: {

        }
    });
}

document.addEventListener("DOMContentLoaded", init);