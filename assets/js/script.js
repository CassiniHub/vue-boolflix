function init() {
    console.log('hello world');
    new Vue ({
        el: '#app',

        data: {
            searchFilm: '',
            films: [],
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
                        'query': this.searchFilm
                    }
                })
                .then(data => {
                    this.films = data.data.results;
                    console.log(this.films);
                })
            }
        },

        mounted() {            
        },

        computed: {
            
        }
    });
}

document.addEventListener("DOMContentLoaded", init);