import React from 'react'

export default function Favorites(props) {
    const favoriteList = props.favorites.map((f, i) => {
        return(
            <ul key={i} className="favorites">
                <li onClick={props.getFavoriteCity}>{f}</li>
            </ul>
        )
    })
    return(
        <div>
            <h4 className="favorites-header">Favorites</h4>
            {favoriteList}
        </div>
    )
}