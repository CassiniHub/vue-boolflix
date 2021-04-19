function init() {
    console.log('hello world');
    new Vue ({
        el: '#app',

        data: {
            searchFilm: ''
        },

        methods: {
            getFilms: function () {
                axios.get('https://api.themoviedb.org/3/search/movie', {

                    params: {
                        'api_key': '4112d8611cb3fa646e80b753d8213869',
                        'query':'ritorno al futuro'
                    }
                })
                .then(data => {console.log(data);})
            }
        },

        mounted() {            
        },

        computed: {

        }
    });
}

document.addEventListener("DOMContentLoaded", init);