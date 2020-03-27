import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import styles from './styles'
import logoImg from '../../assets/logo.png'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Incidents() {

    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)

    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    async function loadIncidents() {

        if(loading){
            return;
        }

        if(total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true)

        const res = await api.get('incidents', {
            params: {
                page
            }
        })

        setIncidents([...incidents, ...res.data])
        setTotal(res.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    const navigation = useNavigation()

    function navigateToDetail(incident) {
        navigation.navigate('Detail', {
            incident
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold} >{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList onEndReachedThreshold={0.2} onEndReached={loadIncidents} showsVerticalScrollIndicator={false} keyExtractor={item => String(item.id)} style={styles.incidentList} data={incidents} renderItem={({ item }) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{item.name}</Text>

                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>{item.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}</Text>

                    <TouchableOpacity onPress={() => navigateToDetail(item)} style={styles.detailsButton}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>
                 </View>
            ) } />

            
        </View>
    )
}