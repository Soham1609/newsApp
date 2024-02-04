let currentQuery = "sports";
let currentPage = 1;
let limit = 1;

const fetchNews = async (page, q) => {
    console.log(`Fetching News for ${q}, page number :${page}`);
    var url =
        "https://newsapi.org/v2/everything?" +
        "q=" +
        q +
        "&from=2024-02-03&" +
        "pageSize=20&" +
        "language=en&" +
        "page=" +
        page +
        "&sortBy=popularity&" +
        "apiKey=bc083cca3b1b403f85fcf4d437fcdac8";

    var req = new Request(url);

    let a = await fetch(req);
    let response = await a.json();

    limit = Math.ceil(response.totalResults / 20);
    console.log(limit);

    let str = "";
    resultcount.innerHTML = response.totalResults;
    for (let item of response.articles) {
        str =
            str +
            `<div class="card my-4 mx-2" style="width: 18rem">
          <img height = "184" src="${item.urlToImage}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${item.title.slice(0, 23)}</h5>
            <p class="card-text">
              ${item.description.slice(0, 123)}...
            </p>
            <a href="${item.url}" target = "_blank" class="btn btn-primary">Know More</a>
          </div>
        </div>`;
    }
    document.querySelector(".content").innerHTML = str;
};

fetchNews(1, currentQuery);

document.getElementById('search').addEventListener("click", (e) => {
    e.preventDefault();
    let query = document.getElementById('searchInput').value;
    currentQuery = query;
    fetchNews(1, currentQuery);
});
document.getElementById('prev').addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        fetchNews(currentPage, currentQuery);
    }
});
document.getElementById('next').addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < limit) {
        currentPage++;
        fetchNews(currentPage, currentQuery);
    }
});
