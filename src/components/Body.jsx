import React, { useEffect } from "react"

export default function Body() {

  const [memeInfo, setMemeInfo] = React.useState({
    topText: "One does not simply",
    bottomText: "Get sick on a weekend",
    imgUrl: "http://i.imgflip.com/1bij.jpg"
  })

  const [allMemes, setAllMemes] = React.useState([])

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))
  }, [])

  function handleChange(event) {
    const {value, name} = event.currentTarget
    setMemeInfo((prevInfo) => (
      {...prevInfo, [name]:value}
    ))
  }

  function newMeme() {
    const randomNum = Math.floor(Math.random() * allMemes.length)
    setMemeInfo((prevInfo) => (
        {...prevInfo, imgUrl: allMemes[randomNum].url}
    )
    )
  }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={memeInfo.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Get sick on a weekend"
                        name="bottomText"
                        onChange={handleChange}
                        value={memeInfo.bottomText}
                    />
                </label>
                <button className="overkill-btn" onClick={newMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={memeInfo.imgUrl} />
                <span className="top">{memeInfo.topText}</span>
                <span className="bottom">{memeInfo.bottomText}</span>
            </div>
        </main>
    )
}