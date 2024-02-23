


const API_KEY = "72f346a1d9624ee8b8e4625ec3216c7e"
let newsList = [];
let menus = document.querySelectorAll(".menus button");
let searchInput = document.getElementById("search-input")
// let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
let url = new URL(`https://hj-news.netlify.app/top-headlines`)

menus.forEach(menu=>{
    menu.addEventListener("click", (e)=>getNewsByCategory(e))
})








//뉴스호출하기
const getLatestNews = async()=>{
    try{
        const response = await fetch(url);
        const data = await response.json();

        if(response.status === 200){
            if(data.articles.length === 0){
                throw new Error("검색어에 대한 뉴스가 존재하지않습니다.")
            }
            newsList = data.articles
            render()
        }else{
            throw new Error(data.message)
        }

    }catch(error){
        errorRender(error.message)
    }
}


getLatestNews()





const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };
  
const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

const openSearchBox = ( )=> {
    let inputArea = document.getElementById("input-area");
    if (inputArea.classList.contains("hide")) {
        inputArea.classList.remove("hide");
    } else {
        inputArea.classList.add("hide");
    }
}




const render = ( ) =>{
    const newsHTML = newsList.map((news)=>
        `
        <div class="row news">
            <div class="col-lg-4">
                <img class="news-img-size" src=${news.urlToImage || "https://my-goodlife.com/img.php?imgsrc=&size=400x400"} alt="이미지가 없습니다.">
            </div>
            <section class="col-lg-8">
                <h2>${news.title}</h2>
                <p>${ 
                    news.description == null || news.description == ""
                    ? "내용없음"
                    : news.description.length > 200
                    ? news.description.substring(0, 200) + "(...생략)"
                    : news.description}
               
                
                </p>
                <div>
                    ${news.source.name || "no source"} * ${moment(news.publishedAt).fromNow()}
                </div>
            </section>
        </div>
        `
    ).join('')

    document.getElementById("news-board").innerHTML = newsHTML

}

//에러창 띄우는 기능
const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-warning" role="alert">
                            ${errorMessage}
                       </div>`


    document.getElementById("news-board").innerHTML = errorHTML;
  };


//카테고리 클릭하면 카테고리내용대로 api호출
const getNewsByCategory = async (e)=> {

    const category = e.target.textContent.toLowerCase();
    console.log(category)
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`)//new api 사용
    // url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?category=${category}`)// 사용
    url = new URL(`https://hj-news.netlify.app/top-headlines?category=${category}`)

    callApiData(url)

}


//키워드로 검색한 내용  api호출
const getNewsByKeyword = async( )=> {
    let keyword = document.getElementById("search-input").value;
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`) //news api
    // url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?q=${keyword}`)
    url = new URL(`https://hj-news.netlify.app/top-headlines?q=${keyword}`)

    getLatestNews(url)
}


//엔터치면 검색되게하기
searchInput.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        getNewsByKeyword()
    }
})


//api를 호출하는 함수를 추출했다
async function callApiData(url){

    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles
    render()

}