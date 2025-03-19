


const apiKey = 'c0c24bea206f4159b70b4150f3098204'
const fetchNews = async (apiKey) => {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`,{})

    if (response.status === 200){
        console.log('Data')
        return await response.json()
    } else{
        throw new Error('Unable to fetch news')
    }
}


const renderNews = (newsList)=>{

    const container = document.querySelector('.cards')
    const gridSizer = document.createElement('div')
    gridSizer.classList.add('grid-sizer')
    container.appendChild(gridSizer)

    newsList.forEach(article => {
        //Creating the article cover
        const cover = document.createElement('div')
        cover.classList.add('entry__thumb')

        //Creating a link to see more details about article
        const readMore = document.createElement('a')
        readMore.classList.add('entry__thumb-link')
        readMore.href = `${article.url}`
        readMore.target = '_blank'
        cover.appendChild(readMore)//Adding the link into cover

        //Creating element to show the article image
        const image = document.createElement('img')
        image.src = `${article.urlToImage}`
        readMore.appendChild(image) //turning image to a link

        //creating the header(title, author e publishedDate)
        const entry__text = document.createElement('div')
        entry__text.style.marginBottom = '40px'
        entry__text.classList.add('entry__text')
        
        const articleHeader = document.createElement('div')
        articleHeader.classList.add('entry__header')
        
        const entry__title = document.createElement('h2')
        entry__title.classList.add('entry__title')
        articleHeader.appendChild(entry__title)

        const entry__title__link = document.createElement('a')
        entry__title__link.textContent = `${article.title}`
        entry__title__link.href = `${article.url}`
        entry__title.appendChild(entry__title__link) //Turning the title to a link to read more


        //Creating element to show the article author and published date

        const entry__meta = document.createElement('div')
        entry__meta.classList.add('entry__meta')
        
        const author = document.createElement('span')
        author.classList.add('entry__meta-cat')

        const authorChild = document.createElement('a')
        authorChild.href = `${article.url}`
        authorChild.textContent = `${article.author}`

        author.appendChild(authorChild)

        const publishedAt = document.createElement('span')
        publishedAt.classList.add('entry__meta-date')

        const publishedAtChild = document.createElement('a')
        publishedAtChild.href = `${article.url}`

        const dateISO =  `${article.publishedAt}`
        const date = new Date(dateISO)

        //Formating month. if month < 10, add 0.
        const formatMonth = (date.getUTCMonth() + 1) < 10 ? `0${date.getUTCMonth()}`:date.getUTCMonth()
        publishedAtChild.textContent = `${date.getUTCDate()}-${formatMonth}-${date.getUTCFullYear()}`

        publishedAt.appendChild(publishedAtChild)

        entry__meta.appendChild(author)
        entry__meta.appendChild(publishedAt)

        articleHeader.appendChild(entry__meta)

        // Creating description element
        const excerpt = document.createElement('div')
        excerpt.classList.add('entry__excerpt')
        const p = document.createElement('p')
        p.textContent = `${article.description}`
        excerpt.appendChild(p)

        entry__text.appendChild(articleHeader) //Adding a header
        entry__text.appendChild(excerpt) //Adding a description
 
        container.appendChild(cover)
        container.appendChild(entry__text)
        

    });

}


fetchNews(apiKey).then((data) => {
    renderNews(data.articles)
}).catch((e)=>{
    console.log(e)
})

//Search....

