


const API_KEY = "72f346a1d9624ee8b8e4625ec3216c7e"

const getLatestNews = async()=>{

    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
    // const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`)
    const url = new URL(`https://hj-news.netlify.app/top-headlines`)

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    let news = data.articles;
    console.log("nnn",news)
 

}
getLatestNews()