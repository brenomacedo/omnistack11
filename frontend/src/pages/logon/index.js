import React, { useState } from 'react'
import './styles.css'
import HeroesImg from '../../assets/heroes.png' 
import Logo from '../../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function Logon(){
    const [id, setId] = useState('')
    const history = useHistory()
    async function handleLogin(e) {
        e.preventDefault()

        try{
            const res = await api.post('/sessions', { id })
            
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', res.data.name)
            history.push('/profile')
        }catch(e){
            alert('Falha no login, verifique o id.')
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={Logo} alt="heroes"></img>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input value={id} onChange={e => setId(e.target.value)} type="text" placeholder="Seu ID"></input>
                    <button className="button" type="submit">Entrar</button>
                    <Link className="backlink" to="/register"><FiLogIn size={16} color="#E02041" /> Não tenho cadastro</Link>
                </form>
            </section>
                <img src={HeroesImg} alt="heroes"></img>
        </div>
    )
}