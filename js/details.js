export class gameDetails {
    constructor() {
        this.selectedGame = document.querySelectorAll(".innerGameCard").forEach((game) => {
            game.addEventListener("click", (e) => {
            this.gameId = game.dataset.id;
                this.showDetails(game.dataset.id);
                this.selectSpecificGame(this.gameId);
            });
        });
        this.closeDetails = document.getElementById("closebtn");
        this.closeDetails.addEventListener("click", () => {
            this.hideDetails()
        })
         document.addEventListener("keyup", (e)=> {
           switch (e.key) {
               case "Escape":
                   this.hideDetails();
               break;
           }
         });
    }
    showDetails(gameId) {
        document.querySelectorAll(".toogleSec").forEach((i) => {
            i.classList.add("d-none");
            });
        document.querySelector("#gameDetails").classList.replace("d-none", "d-block");
    }
    hideDetails() {
        document.querySelectorAll(".toogleSec").forEach((i) => {
            i.classList.remove("d-none");
        });
        document.querySelector("#gameDetails").classList.replace("d-block", "d-none");
    }
    async selectSpecificGame(id) {
        const loader = document.querySelector("#loaderSec");
        loader.classList.remove("d-none");
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "f25ef65557msh6b9a55741103d50p1d3b9ejsn59f6679f1f4b",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
        };
        const detailsApi = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,options);
        const detailsApiResult = await detailsApi.json();
        this.displyDetails(detailsApiResult);
        loader.classList.add("d-none");
    }
    displyDetails(detailsData) {
        let gameDetailsBox = `
                        <div class="col-lg-4 mb-lg-3">
                    <img src="${detailsData.thumbnail}" class="w-100" alt="">
                </div>
                <div class="col-md-8">
                    <h3>
                        title : <span >${detailsData.title}</span>
                    </h3>
                    <h4>
                        Platform: <span>${detailsData.platform}</span>
                    </h4>
                    <h5>
                        status: <span>${detailsData.status}</span>
                    </h5>
                    <p>
                        ${detailsData.description}
                    </p>
                    <a class="btn btn-outline-warning" target="_blank" href="${detailsData.freetogame_profile_url}">
                        show game
                    </a>
                </div>
        `;
        document.getElementById("detailsContainer").innerHTML = gameDetailsBox;
    }
    
}
       
