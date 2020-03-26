import React, { useState } from 'react'
import './styles.css'
import LogoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'


export default function(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            name, email , city, whatsapp, uf
        }

        try{
            const res = await api.post('ongs', data)
            alert(res.data.id)
            history.push('/')
        }catch(e){
            alert('Erro no cadastro, tente novamente.')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be the Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos em sua ONG.</p>
                    <Link className="backlink" to="/"><FiArrowLeft size={16} color="#E02041" /> Já me cadastrei</Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Nome da ONG"/>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="E-mail"/>
                    <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} type="text" placeholder="WhatsApp"/>
                    
                    <div className="input-group">
                        <input value={city} onChange={e => setCity(e.target.value)} type="text" placeholder="Cidade"/>
                        <input value={uf} onChange={e => setUf(e.target.value)} style={{ width: 80 }} type="text" placeholder="UF"/>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}