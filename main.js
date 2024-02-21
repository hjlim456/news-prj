


const API_KEY = "72f346a1d9624ee8b8e4625ec3216c7e"
let newsList = [];

const getLatestNews = async()=>{

    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
    const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`)
    // const url = new URL(`https://hj-news.netlify.app/top-headlines`)

    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles;
    render()
    console.log("nnn",newsList)
 

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
const searchNews = ( )=> {

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