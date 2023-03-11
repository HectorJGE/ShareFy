import React from "react"

const SearchResultado = ({ title, img, artist }) => {
	return (
		<div className="d-flex m-2 align-items-center">
			<img src={img} style={{ height: "64px", width: "64px" }} alt="musica" />
			<div className="mx-auto text-center ml-3">
				<div>{title}</div>
				<div className="text-muted">{artist}</div>
			</div>
		</div>
	)
}

export default SearchResultado;

