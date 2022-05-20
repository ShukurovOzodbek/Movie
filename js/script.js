import { movies } from "../modules/db.js";

let ul = document.querySelector('.promo__interactive-list')
let promo__bg = document.querySelector('.promo__bg')
let promo__genre = document.querySelector(".promo__genre");
let promo__title = document.querySelector(".promo__title");
let imdb = document.querySelector(".imdb");
let reserch = document.querySelector(".reserch");
let inp = document.querySelector('#search')

inp.onkeyup = () => {
    let filtered = movies.filter(item => item.Title.toLowerCase().includes(inp.value.toLowerCase()))

    changeFilm(filtered[0])

    reload(filtered)
}

let promo__adv = document.querySelector('.promo__adv')

for(let item of promo__adv.childNodes){
    item.hidden = true
}
promo__genre.innerHTML = 'ДРАМА'
let promo__interactive_list = document.querySelector('.promo__interactive-list')
let adding__input = document.querySelector('.adding__input')
let button = document.querySelector('button')


let promo__menu_item = document.querySelectorAll('.promo__menu-item')


function reload(arr) {
    ul.innerHTML = ""

    arr.forEach((movie, index) => {
        let li = document.createElement('li')
        let del = document.createElement('div')

        li.innerHTML = `${index + 1}. ${movie.Title}`
        li.classList.add('promo__interactive-item')
        del.classList.add('delete')

        li.append(del)
        ul.append(li)

        li.onclick = () => {
            changeFilm(movie)
        }

        del.onclick = () => {
            arr.splice(index, 1)
            promo__interactive_list.innerHTML = ''
            reload(movies)
        }
        promo__menu_item.forEach(element => {
            element.onclick = () => {
                let promo__menu_item_1 =document.querySelector('.promo__menu-item_1')
                promo__menu_item.forEach(element => {
                    element.classList.remove('promo__menu-item_active')
                    promo__menu_item_1.style.color = 'white'
                });
                element.classList.add('promo__menu-item_active')
                let filterEd = movies.filter(item => item.Genre.toLowerCase().includes(element.innerHTML.toLowerCase()))
                reload(filterEd)
                changeFilm(filterEd[0])
            }
        });      
    });
    
}

reload(movies)

let promo__descr = document.querySelector('.promo__descr')

function changeFilm(props) {
    promo__bg.style.backgroundImage = `url("${props.Poster}")`
    promo__genre.innerHTML = `${props.Genre};`
    promo__title.innerHTML = `${props.Title};`
    imdb.innerHTML = `IMDb: ${props.imdbRating}`
    promo__descr.innerHTML = props.Plot
    reserch.innerHTML = `Кинопоиск: ${props.Metascore}`
}