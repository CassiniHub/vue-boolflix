function init() {

    new Vue ({
        el: '#app',

        data: {
            search: 'ritorno al fut',
            films: [],
            tvSeries: []
            // Ver #1 img poster
            // flags: {
            //     ita: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg',
            //     en : 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg',
            //     unk: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Flag.svg'
            // }
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

            getLanguageFlag: function (elem) {
                let urlImg = '';
                let language = elem.original_language;

                switch (true) {
                    case language === 'en':
                        urlImg = 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg';
                        break;
                    
                    case language === 'it':
                        urlImg = 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg';
                        break;

                    default:
                        urlImg = 'https://upload.wikimedia.org/wikipedia/commons/6/61/Flag.svg';
                        break;
                }

                return urlImg;
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
                    console.log(elem.vote_average);
                }
            },

            // 
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