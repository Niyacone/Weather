import React from 'react'

export default function Search(props) {
    return (
        <div>
            <form onSubmit={props.searchCity}>
                <input name="search" type="text" placeholder="Sök" onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Sök"}/>
                <button type="submit">Sök</button>
            </form>
        </div>
    )
}