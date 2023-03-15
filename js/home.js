import { gameDetails } from "./details.js";
export class getGames {
    constructor() {
      document.querySelectorAll(".gameCategory").forEach((link) => {
            link.addEventListener("click", (e) => {
                document.querySelectorAll(".gameCategory").forEach((i)=> {
                    i.classList.remove("active")
                });
                e.target.classList.add("active");
                this.selectCategory(e.target.name);
            })
        })
    }                
    async selectCategory(category) {
        const loader = document.querySelector("#loaderSec");
        loader.classList.remove("d-none")
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "f25ef65557msh6b9a55741103d50p1d3b9ejsn59f6679f1f4b",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            }
        }
        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=${category}&sort-by=release-date`, options)
        const apiResult = await api.json()
        this.displayData(apiResult);
        loader.classList.add("d-none");
    }
    displayData(data) {
        let gamebox = ``;
        for (let i = 0; i < data.length; i++) {
            gamebox += `
                <div class="col-xl-3 col-lg-4 col-md-6 gameItem d-flex align-items-stretch p-3">
                    <div data-id="${data[i].id}" class="innerGameCard rounded d-flex flex-column">
                        <div class="gameImg p-3 w-100">
                            <img src="${
                              data[i].thumbnail
                            }" class="w-100 rounded " alt="">
                        </div>
                        <div class="gameData px-3 mb-3">
                            <div class="gDataHead d-flex justify-content-between align-items-center mb-1">
                                <div class="gName">
                                    ${data[i].title}
                                </div>
                                <div class="gPrice badge bg-primary">
                                    free
                                </div>
                            </div>
                            <p class="m-0 text-secondary">
                            ${data[i].short_description.slice("", 100)}
                            </p>
                        </div>
                        <div class="gameFooter px-3 py-2 d-flex justify-content-between align-items-center">
                            <span class="badge p-2">${data[i].genre}</span>
                            <span class="badge p-2">${data[i].platform}</span>
                        </div>
                    </div>
                </div>`;
            document.querySelector(`#games .container .row`).innerHTML = gamebox;

        }
        let gamedetail = new gameDetails();
    }
}
let gamesList = new getGames();
gamesList.selectCategory("MMORPG");



