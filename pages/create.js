import Head from 'next/head'
import React from 'react'
import axios from 'axios'
import CreateForm from '../components/Forms/CreateForm'
import Header from '../components/Home/Header'
import Navbar from '../components/Navbar'

export default function Create({ token, baseUrl }) {
    return (
        <div>
            <Head>
                <title>Mitramas Infosys Global</title>
                <meta name="description" content="Mitramas Infosys Global" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className='container max-w-7xl mx-auto px-8 pb-10'>
                <Header />
                <CreateForm token={token} baseUrl={baseUrl} />
            </div>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    try {
        const protocol = req.headers['x-forwarded-proto'] || 'http'
        const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

        let token = req.cookies.token || ''

        if (token === '') {
            const response = await axios.post(baseUrl + '/api/login')
            if (response.data.success) {
                token = response.data.token
            }
        }

        return {
            props: {
                token: token,
                baseUrl: baseUrl
            }
        }
    } catch (error) {
        return {
            props: {
                token: '',
                baseUrl: ''
            }
        }
    }
}