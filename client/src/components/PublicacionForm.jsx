import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { editarPublicacionRoute, nuevaPublicacionRoute, publicacionRoute } from "./../utils/APIRoutes";
import SearchResultado from "./SearchResultado";

const PublicacionForm = () => {

    const [cuerpo, setCuerpo] = useState('');
    const [cancion, setCancion] = useState();
    const [searchResults, setSearchResults] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    const user = JSON.parse(window.localStorage.getItem('loggedUser'));
    const isEditar = window.location.pathname.includes('editar');
    const clientId = '2d4fcc6bf9774175b3c6fbe7cab4a807';
    const clientSecret = 'd4d5a5ed8b05413a81ef88be9585b41c';

    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token
    }

    const _getTrack = async (query) => {
        const token = await _getToken();

        const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token },
        })

        const data = await result.json();
        return data.tracks.items
    }

    useEffect(() => {
        if (isEditar) {
            axios.get(`${publicacionRoute}/${id}`, { withCredentials: true })
                .then((res) => {
                    setCuerpo(res.data.cuerpo)
                    setCancion(res.data.cancion)
                })
                .catch((e) => console.log(e))
        }
    }, [id, isEditar])

    const Searching = async (e) => {
        if (e.target.value === '') {
            setSearchResults([])
        } else {
            setSearchResults(await _getTrack(e.target.value))
        }
    }

    const selectTrack = async (track) => {
        await setCancion({ titulo: track.name, imgUrl: track.album.images[0]['url'], artist: track.artists[0].name })
        await setSearchResults([])
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if (isEditar) {
            axios.put(`${editarPublicacionRoute}/${id}`, {
                cancion,
                cuerpo
            }, { withCredentials: true }).then(res => {
            })
                .catch((err) => {
                    console.log(err)
                })
            navigate('/home')
        } else {
            axios.post(`${nuevaPublicacionRoute}`, {
                cancion,
                cuerpo,
                usuario: { id: user._id, nombre: user.nombre },
                likes: []
            }, { withCredentials: true }).then(res => {
                console.log(res);
                navigate('/home')
            })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <div className={`form-control my-5 border-success text-center bg-light`}>
                    {isEditar ?
                        <h5 className="my-3 text-success">Editar Publicación</h5>
                        : null}
                    <div className="form-floating my-3">
                        <input name="cancion" type='search' className="form-control border-success-subtle" placeholder="Canción..." onChange={Searching}></input>
                        <label htmlFor="floatingTextarea2">Canción</label>

                    </div>
                    {
                        searchResults.map((track, key) => {
                            return <div key={key} onClick={() => selectTrack(track)} style={{ cursor: "pointer" }}><SearchResultado className="z-3 position-absolute" title={track.name} img={track.album.images[0]['url']} artist={track.artists[0].name} /></div>
                        })
                    }
                    {cancion ?
                        <div className="border" >
                            <SearchResultado title={cancion.titulo} img={cancion.imgUrl} artist={cancion.artist}></SearchResultado>
                        </div>
                        : null}
                    <div className="form-floating mt-3">
                        <textarea value={cuerpo ? cuerpo : ''} className="form-control border-success-subtle" placeholder="Comentario..." style={{ "height": "100px" }} onChange={e => { setCuerpo(e.target.value) }}></textarea>
                        <label htmlFor="floatingTextarea2">Comentario</label>
                    </div>
                    <div className="row justify-content-evenly mx-1">
                        {isEditar ?
                            <button onClick={() => { navigate(-1) }} className="col-4 btn btn-secondary my-3" >Cancelar</button>
                            : null}
                        <button className="col-4 btn btn-success my-3">Publicar</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default PublicacionForm;

