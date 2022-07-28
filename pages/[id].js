import axios from 'axios'
import _ from 'lodash'
import Head from 'next/head'
import EditForm from '../components/Forms/EditForm'
import Header from '../components/Home/Header'
import Navbar from '../components/Navbar'

export default function Edit({ customer, token, baseUrl }) {
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
                <EditForm customer={customer} token={token} baseUrl={baseUrl} />
            </div>
        </div>
    )
}

export async function getServerSideProps({ req, query }) {
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

        const customerId = query['id']

        const customerResponse = await axios.get(baseUrl + '/api/customers', {
            headers: {
                Authorization: token
            }
        })

        const customer = _.find(customerResponse.data.customers, { 'id': parseInt(customerId) })

        return {
            props: {
                customer: customer,
                token: token,
                baseUrl: baseUrl,
            }
        }
    } catch (error) {
        return {
            props: {
                customer: null,
                token: '',
                baseUrl: '',
            }
        }
    }
}