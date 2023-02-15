import axios from "axios";
import React, { useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";

// const playlistsLocal = [
//     {
//         id: 1,
//         name: "Playlist 1"
//     },
//     {
//         id: 2,
//         name: "Playlist 2"
//     },
//     {
//         id: 3,
//         name: "Playlist 3"
//     },
//     {
//         id: 4,
//         name: "Playlist 4"
//     },
// ]


function Playlists() {
    const [playlists, setPlaylists] = useState([])
    const [nomePlaylist, setNomePLaylist] = useState("")
    const [novaPlaylists, setNovaPlaylists] = useState("")

    useEffect(() => {
        novaPlaylist()
    }, [])

    const novaPlaylist = () => {
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", {
            headers: {
                Authorization: "rafael-machado-barbosa"
            }
        })
            .then((resposta) => {
                setPlaylists(resposta.data.result.list)
            })
            .catch((erro) => {
                console.log(erro)
            })
    }
    

    useEffect(()=>{
        procurarPlaylist()
    }, [])

    const procurarPlaylist = async () => {
        try {
            const response = await axios
            .get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${nomePlaylist}`, {
                headers: {
                    Authorization: "rafael-machado-barbosa"
                }
            })
            
            setPlaylists(response.data.result.playlist)
            setNomePLaylist("")

        } catch (error) {
            console.log(error)
        }
        
    }

    const criarPlaylist = async () =>{
        try {
            const body = {
                name: novaPlaylists 
            }
            await axios
            .post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`, body, {
                headers: {
                    Authorization: "rafael-machado-barbosa"
                }
            })
            setPlaylists()
            setNomePLaylist("")

        } catch (error) {
            
        }
    }

        return (
        <div>
            <input
            placeholder="Procurar.."
            value={novaPlaylists}
            onChange={(e)=>setNovaPlaylists(e.target.value)}
            />
            <button onClick={criarPlaylist}>Criar Playlist</button>

            <input
            placeholder="Procurar.."
            value={nomePlaylist}
            onChange={(e)=>setNomePLaylist(e.target.value)}
            />
            <button onClick={procurarPlaylist}>Pesquisar</button>

            {playlists.map((playlist) => {
                return <Musicas
                    key={playlist.id}
                    playlist={playlist}
                    id={playlist.id}
                    setPlaylists={setPlaylists}
                />
            })}

            
        </div>
    );
}

export default Playlists;