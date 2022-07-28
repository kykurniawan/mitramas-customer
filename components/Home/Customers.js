import _ from 'lodash'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'
import Swal from 'sweetalert2'
import Customer from './Customer'

const Customers = ({ token, baseUrl }) => {
    const { data, error, mutate } = useSWR(['/api/customers', token], fetcher)
    const [status, setStatus] = useState('all')
    const [sort, setSort] = useState('asc')
    const [customers, setCustomers] = useState([])
    const [search, setSearch] = useState('')
    const [deleteLoading, setDeleteLoading] = useState(false)

    const searchByText = (collection, text, exclude) => {
        return _.filter(collection, _.flow(
            _.partial(_.omit, _, exclude),
            _.partial(
                _.some, _,
                _.flow(_.toLower, _.partial(_.includes, _, _.toLower(text), 0))
            )
        ));
    }

    useEffect(() => {
        if (data) {
            let modifiedCustomers = data.customers
            switch (status) {
                case 'all':
                    modifiedCustomers = modifiedCustomers
                    break;
                case 'active':
                    const activeCustomers = modifiedCustomers.filter(customer => customer.status == true)
                    modifiedCustomers = activeCustomers
                    break;
                case 'inactive':
                    const inactiveCustomers = modifiedCustomers.filter(customer => customer.status == false)
                    modifiedCustomers = inactiveCustomers
                    break;
                default:
                    modifiedCustomers = data.customers
                    break;
            }
            if (sort == 'asc') {
                modifiedCustomers = _.orderBy(modifiedCustomers, 'name', ['asc'])
            } else if (sort == 'desc') {
                modifiedCustomers = _.orderBy(modifiedCustomers, 'name', ['desc'])
            }
            if (search !== '') {
                modifiedCustomers = searchByText(modifiedCustomers, search)
            }
            setCustomers(modifiedCustomers)
        }
    }, [status, data, sort, search])

    const deleteCustomer = async (customer) => {
        const confirmationResult = await Swal.fire({
            title: 'Delete customer: ' + customer.name + '?',
            text: "This customer will deleted from your database!",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Yes, go ahead!'
        })

        if (confirmationResult.isConfirmed) {
            setDeleteLoading(true)
            const response = await fetch(baseUrl + '/api/customers', {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                },
                method: 'delete',
                body: JSON.stringify({ id: customer.id }),
            })

            const result = await response.json()

            setDeleteLoading(false)

            if (result.success) {
                await Swal.fire(
                    'Deleted!',
                    'Customer data has been deleted.',
                    'success'
                )
                mutate()
            }
        }
    }

    if (!error && !data) {
        return (
            <div className='p-5 border-2 border-sky-300 rounded-lg bg-sky-50 text-sky-700'>
                Loading...
            </div>
        )
    }

    if (error) {
        return (
            <div className='p-5 border-2 border-red-300 rounded-lg bg-red-50 text-red-700'>
                Something error...
            </div>
        )
    }

    return (
        <>
            <div>{deleteLoading ? 'Deleting data...' : ''}</div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 bg-sky-50 shadow p-5 rounded-lg border'>
                <div className='mb-5'>
                    Filter by status:
                    <div className="flex gap-3">
                        <label className="inline-flex items-center mt-3">
                            <input onChange={evt => setStatus(evt.target.value)} checked={status == 'all'} type={'radio'} name={'status'} value={'all'} className="form-radio h-4 w-4" /><span className="ml-2 text-gray-700">All</span>
                        </label>

                        <label className="inline-flex items-center mt-3">
                            <input onChange={evt => setStatus(evt.target.value)} checked={status == 'active'} type={'radio'} name={'status'} value={'active'} className="form-radio h-4 w-4" /><span className="ml-2 text-gray-700">Active</span>
                        </label>

                        <label className="inline-flex items-center mt-3">
                            <input onChange={evt => setStatus(evt.target.value)} checked={status == 'inactive'} type={'radio'} name={'status'} value={'inactive'} className="form-radio h-4 w-4" /><span className="ml-2 text-gray-700">Inactive</span>
                        </label>
                    </div>
                </div>
                <div className='mb-5'>
                    Sort by name:
                    <div className="flex gap-3">
                        <label className="inline-flex items-center mt-3">
                            <input onChange={evt => setSort(evt.target.value)} checked={sort == 'asc'} type={'radio'} name={'sort'} value={'asc'} className="form-radio h-4 w-4" /><span className="ml-2 text-gray-700">Ascending</span>
                        </label>
                        <label className="inline-flex items-center mt-3">
                            <input onChange={evt => setSort(evt.target.value)} checked={sort == 'desc'} type={'radio'} name={'sort'} value={'desc'} className="form-radio h-4 w-4" /><span className="ml-2 text-gray-700">Descending</span>
                        </label>
                    </div>
                </div>
                <div className='mb-5'>
                    <div className='mb-3'>Search:</div>
                    <input name='search' onKeyUp={evt => setSearch(evt.target.value)} className='border-2 border-gray-400 px-2 w-full rounded' placeholder='Search' />
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {customers.map(customer => (<Customer deleteCustomer={deleteCustomer} customer={customer} key={customer.id} />))}
            </div>
        </>
    )
}

export default Customers