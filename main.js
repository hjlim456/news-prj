


const API_KEY = "72f346a1d9624ee8b8e4625ec3216c7e"
let newsList = [];
let menus = document.querySelectorAll(".menus button");
let searchInput = document.getElementById("search-input")

menus.forEach(menu=>{
    menu.addEventListener("click", (e)=>getNewsByCategory(e))
})



//api를 호출하는 함수를 추출했다
async function callApiData(url){

    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles
    render()

}


const getNewsByCategory = async (e)=> {

    const category = e.target.textContent.toLowerCase();
    console.log(category)
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`)//new api 사용
    const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?category=${category}`)// 사용

    callApiData(url)

}



//뉴스호출하기
const getLatestNews = async()=>{

    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
    const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`)
    // const url = new URL(`https://hj-news.netlify.app/top-headlines`)

    callApiData(url)
 

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


const getNewsByKeyword = async( )=> {
    let keyword = document.getElementById("search-input").value;
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`) //news api
    const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?q=${keyword}`)

    callApiData(url)
}
//엔터치면 검색되게하기
searchInput.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        getNewsByKeyword()
    }
})