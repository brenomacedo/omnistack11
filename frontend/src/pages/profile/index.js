import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'

export default function Profile() {
    
    const [incidents, setIncidents] = useState([])

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    const history = useHistory()

    function handleLogOut() {
        localStorage.clear()
        history.push('/')
    }

    async function handleDeleteIncident(id) {
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        }catch(err){
            alert('Erro ao deletar o caso, tente novamente.')
        }
    }
    
    useEffect(() => {
        api.get('profile', {
            headers: {
                authorization: ongId
            }
        }).then(res => {
            setIncidents(res.data)
        }).catch(err => {alert('err')})
    }, [ongId])

    function renderRows() {
        return incidents.map(incident => (
            <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>
                <strong>DESCRIÇÃO:</strong>
                <p>{incident.desc}</p>
                <strong>VALOR:</strong>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                    <FiTrash2 size={20} color="#a8a8b3" />
                </button>
            </li>
        ))
    }
    
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="incidents/new">Cadastrar Novo Caso</Link>
                <button onClick={handleLogOut} type="button"><FiPower size={18} color='#e02041'/></button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {renderRows()}
            </ul>
        </div>
    )
}