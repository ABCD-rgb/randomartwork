import { useState } from "react";

export default function Home() {

    const [artwork, setArtwork] = useState("");

    const generateArtwork = () => {
        // gets a random id of an artwork
        var paintingId = "";
        fetch('https://api.artic.edu/api/v1/artworks?page=2&limit=100&fields=id')
            .then(response => response.json())
            .then(body => {
                const random = Math.floor(Math.random() * 100)
                console.log(body.data[random].id)
                paintingId = body.data[random].id.toString();
                
                // to display image
                var imageLink = "";
                fetch(`https://api.artic.edu/api/v1/artworks/${paintingId}?fields=id,title,image_id`)
                    .then(response => response.json())
                    .then(body => {
                        console.log("===============")
                        console.log(body.config.iiif_url + "/" + body.data.image_id + "/full/843,/0/default.jpg")
                        imageLink = body.config.iiif_url + "/" + body.data.image_id + "/full/843,/0/default.jpg";
                        setArtwork(imageLink)
                    })
            })
    }


    return (
        <>
            <h1>Random Artwork Generator</h1>
            <button onClick={generateArtwork}>Generate</button>
            <img src={artwork} alt="Here!!!" />
        </>
    )
}