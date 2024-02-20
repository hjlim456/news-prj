


const API_KEY = "72f346a1d9624ee8b8e4625ec3216c7e"

const getLatestNews = async()=>{

    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
    const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?q=조선`)

    const response = await fetch(url)
    const data = await response.json()
    let news = data.articles;
    console.log("nnn",news)


}
getLatestNews()