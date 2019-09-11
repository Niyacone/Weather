import React from 'react'

export default function Favorites(props) {
    
    const favoriteList = props.favorites.length > 0 ? (props.favorites.map((f, i) => {
        return(
            <ul key={i} className="favorites">
                <li onClick={props.getFavoriteCity}>{f}</li>
            </ul>
        )
    })) : <h4 className="favorites-2">Finns inga Favoriter</h4> 
    return(
        <div>
            <h4 className="favorites-header">Favorites</h4>
            {favoriteList}
        </div>
    )
}