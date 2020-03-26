import React, { useState } from 'react'
import './styles.css'
import LogoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

export default function NewIncident() {

    const ongId = localStorage.getItem('ongId')
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    async function handleNewIncident() {
       
        const data = { title, description, value }

        try {
            await api.post('incidents', data, {
                headers: {
                    authorization: ongId
                }
            })
            history.push('/profile')
        } catch(e) {
            alert('Erro ao cadastrar o caso, tente novamente.')
        }

    }

    return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be the Hero" />
                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar o herói para resolver isso.</p>
                    <Link className="backlink" to="/profile"><FiArrowLeft size={16} color="#E02041" /> Voltar para a home</Link>
                </section>
                <form>
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Título do caso"/>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição"/>
                    <input value={value} onChange={e => setValue(e.target.value)} type="text" placeholder="Valor em reais"/>
                    
                    

                    <button onClick={handleNewIncident} className="button" type="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}