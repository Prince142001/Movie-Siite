const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d4eccad01c9ec335e81e0511de58afa5&page=1";
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=d4eccad01c9ec335e81e0511de58afa5&query="';

console.log(APILINK);

const mainSection = document.getElementById("rows");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);
function returnMovies(url) {
    fetch(url).then(res => res.json())
        .then(function (data) {
            console.log(data.results);
            data.results.forEach(element => {
                const div_column=document.createElement('div');
                div_column.setAttribute('class', 'column');
                
                const div_card=document.createElement('div');
                div_card.setAttribute('class', 'card rounded-lg bg-white');
                div_column.appendChild(div_card);
                
                const figure=document.createElement('figure');
                div_card.appendChild(figure);
                
                const img=document.createElement('img');
                img.setAttribute('class','object-cover rounded-lg')
                figure.appendChild(img);
                img.src = IMG_PATH + element.poster_path;
                
                const movieDetail=document.createElement('div');
                movieDetail.setAttribute('class', 'movie-detail relative');
                div_card.appendChild(movieDetail);

                const movieTitle=document.createElement('h2');
                movieTitle.setAttribute('class','text-black font-semibold');
                movieDetail.appendChild(movieTitle);
                movieTitle.innerText = `${element.title}`;
                
                const data=document.createElement('div');
                data.setAttribute('class', 'data flex justify-between');
                movieDetail.appendChild(data);
                
                const releaseDate=document.createElement('h3');
                releaseDate.setAttribute('class','text-black text-base font-semibold');
                data.appendChild(releaseDate);
                releaseDate.innerHTML = `${element.release_date}`;
                
                const rating=document.createElement('div');
                rating.setAttribute('class', 'rating flex items-end w-fit');
                data.appendChild(rating);
                
                const star=document.createElement('div');
                star.setAttribute('class', 'star');
                rating.appendChild(star);
                
                const fontAwesomeStar=document.createElement('i');
                fontAwesomeStar.setAttribute('class', 'fa fa-star');
                star.appendChild(fontAwesomeStar);
                
                const span=document.createElement('span');
                span.setAttribute('class','font-bold');
                rating.appendChild(span)
                span.innerHTML = `${element.vote_average}/10`;
                
                mainSection.appendChild(div_column);
            });
        });
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    mainSection.innerHTML='';

    const searchItem=search.value;

    if(searchItem){
        returnMovies(SEARCHAPI+searchItem);
        search.value="";
    }
})