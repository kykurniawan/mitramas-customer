import { PencilIcon, TrashIcon } from '@heroicons/react/solid'

const Customer = ({ deleteCustomer, customer }) => {
    const classNames = customer.status ? 'border-2 border-sky-300 bg-sky-50 p-5 rounded-lg shadow-sm hover:shadow-lg' : 'border-2 border-red-300 bg-red-50 p-5 rounded-lg shadow-sm hover:shadow-lg'
    const nameClassNames = customer.status ? 'text-sky-700 font-bold' : 'text-red-700 font-bold'

    return (
        <div className={classNames}>
            <div className='text-center border-b pb-5 mb-5'>
                <h3 className={nameClassNames}>{customer.name}</h3>
            </div>
            <div className='mb-3'>
                <h5 className='text-gray-400'>Status</h5>
                <h5 className='text-gray-600 font-bold'>{customer.status ? 'Active' : 'Inactive'}</h5>
            </div>
            <div className='mb-3'>
                <h5 className='text-gray-400'>Job Title</h5>
                <h5 className='text-gray-600 font-bold'>{customer.job_title}</h5>
            </div>
            <div className='mb-3'>
                <h5 className='text-gray-400'>Address</h5>
                <h5 className='text-gray-600 font-bold'>{customer.address}</h5>
            </div>
            <div className='mb-3'>
                <h5 className='text-gray-400'>Country</h5>
                <h5 className='text-gray-600 font-bold'>{customer.country}</h5>
            </div>
            <div className='mb-3'>
                <h5 className='text-gray-400'>Phone Number</h5>
                <h5 className='text-gray-600 font-bold'>{customer.phone_number}</h5>
            </div>
            <div className='border-t pt-3 flex justify-center gap-3'>
                <button onClick={evt => window.location.href = '/' + customer.id} className='border border-green-600 text-green-600 p-2 rounded-full hover:bg-green-600 hover:text-white'>
                    <PencilIcon className='h-5 w-5 ' />
                </button>
                <button onClick={evt => deleteCustomer(customer)} className='border border-red-600 text-red-600 p-2 rounded-full hover:bg-red-600 hover:text-white'>
                    <TrashIcon className='h-5 w-5 ' />
                </button>
            </div>
        </div>
    )
}

export default Customer