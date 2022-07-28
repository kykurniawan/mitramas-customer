import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Router from "next/router"

const CreateForm = ({ token, baseUrl }) => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    const createCustomer = async () => {
        if (name == '' || address == '' || country == '' || phoneNumber == '' || jobTitle == '' || status == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All input field is required!',
            })
            return
        }

        const confirmationResult = await Swal.fire({
            title: 'Are you sure?',
            text: "This customer data will added to your database!",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Yes, go ahead!'
        })

        if (confirmationResult.isConfirmed) {
            const customer = {
                name: name,
                address: address,
                country: country,
                phone_number: phoneNumber,
                job_title: jobTitle,
                status: status == 'active' ? true : false
            }

            setLoading(true)

            const response = await fetch(baseUrl + '/api/customers', {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(customer),
            })

            const result = await response.json()

            setLoading(false)
            if (result.success) {
                Swal.fire(
                    'Created!',
                    'New customer data has been created.',
                    'success'
                ).then(result => {
                    Router.push('/')
                })
            }
        }

    }

    if (loading) {
        return (
            <div className='p-5 border-2 border-sky-300 rounded-lg bg-sky-50 text-sky-700'>
                Creating customer data...
            </div>
        )
    }

    return (
        <div className='max-w-lg mx-auto'>
            <h4 className='text-lg font-semibold text-gray-600 mb-8'>Create New Customer</h4>
            <div className='mb-3'>
                <label className='block mb-3 font-semibold text-gray-600' htmlFor='name'>Name</label>
                <input onChange={evt => setName(evt.target.value)} placeholder='Customer name' id='name' className='border-2 border-gray-400 px-2 py-2 w-full rounded-lg' />
            </div>
            <div className='mb-3'>
                <label className='block mb-3 font-semibold text-gray-600' htmlFor='address'>Address</label>
                <textarea onChange={evt => setAddress(evt.target.value)} placeholder='Customer address' id='address' className='border-2 border-gray-400 px-2 py-2 w-full rounded-lg'></textarea>
            </div>
            <div className='mb-3'>
                <label className='block mb-3 font-semibold text-gray-600' htmlFor='country'>Country</label>
                <input onChange={evt => setCountry(evt.target.value)} placeholder='Country' id='country' className='border-2 border-gray-400 px-2 py-2 w-full rounded-lg' />
            </div>
            <div className='mb-3'>
                <label className='block mb-3 font-semibold text-gray-600' htmlFor='phone_number'>Phone Number</label>
                <input onChange={evt => setPhoneNumber(evt.target.value)} placeholder='Phone number' id='phone_number' className='border-2 border-gray-400 px-2 py-2 w-full rounded-lg' />
            </div>
            <div className='mb-3'>
                <label className='block mb-3 font-semibold text-gray-600' htmlFor='job_title'>Job Title</label>
                <input onChange={evt => setJobTitle(evt.target.value)} placeholder='Job title' id='job_title' className='border-2 border-gray-400 px-2 py-2 w-full rounded-lg' />
            </div>
            <div className='mb-3'>
                <label className='block mb-3 font-semibold text-gray-600' htmlFor='status'>Status</label>
                <div className="flex gap-3">
                    <label className="inline-flex items-center">
                        <input onChange={evt => setStatus(evt.target.value)} type={'radio'} name={'status'} value={'active'} className="form-radio h-4 w-4" /><span className="ml-2 text-gray-700">Active</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input onChange={evt => setStatus(evt.target.value)} type={'radio'} name={'status'} value={'inactive'} className="form-radio h-4 w-4" /><span className="ml-2 text-gray-700">Inactive</span>
                    </label>
                </div>
            </div>
            <div className='flex gap-3 justify-end'>
                <button onClick={evt => window.location.href = '/'} className='bg-red-600 px-3 py-1 rounded-lg text-white'>
                    Cancel
                </button>
                <button onClick={createCustomer} className='bg-sky-600 px-3 py-1 rounded-lg text-white'>
                    Save
                </button>
            </div>
        </div>
    )
}

export default CreateForm