import { useState } from "react";
import './Home.css';

import qmark from '../assets/qmark.png';

export default function Home() {

    const [artwork, setArtwork] = useState("");
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");

    const generateArtwork = () => {
        // gets a random id of an artwork
        var paintingId = "";
        fetch('https://api.artic.edu/api/v1/artworks?has_not_been_viewed_much=false&is_on_view=true&page=2&limit=100&fields=id')
            .then(response => response.json())
            .then(body => {
                const random = Math.floor(Math.random() * 100)
                console.log(body.data[random].id)
                paintingId = body.data[random].id.toString();
                
                // to display image
                var imageLink = "";
                fetch(`https://api.artic.edu/api/v1/artworks/${paintingId}?fields=id,title,image_id,artist_display`)
                    .then(response => response.json())
                    .then(body => {
                        console.log("===============")
                        console.log(body.config.iiif_url + "/" + body.data.image_id + "/full/843,/0/default.jpg")
                        imageLink = body.config.iiif_url + "/" + body.data.image_id + "/full/843,/0/default.jpg";
                        setArtwork(imageLink)
                        setTitle(body.data.title)
                        setArtist(body.data.artist_display)
                    })
            })
    }


    return (
        <>
            <div id="header">
                <div class="headername">
                    <div id="header1">Random</div>
                    <div id="header2">Artwork</div>
                </div>
                <button onClick={generateArtwork}>Generate</button>
            </div>

            <div id="content">
            {
                (artwork==="")
                ? (
                    <div id="qmarkContainer">
                        <img src={qmark} alt="Question" />
                    </div>
                ) 
                : (
                    <div id="artworkSection">
                        <div id="imgContainer">
                            <img src={artwork} alt={title} />
                        </div>
                        <div id="detailContainer">
                            <h1>{title}</h1>
                            <h3>{artist}</h3>
                        </div>
                    </div>
                )
            }
            </div>
        </>
    )
}