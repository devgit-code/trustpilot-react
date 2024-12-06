import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import AdminLayout from '@/Layouts/adminLayout';
import Swal from 'sweetalert2';
import { BsTrashFill } from "react-icons/bs"
import Select from "react-select";

const customStyles = {
  input: (provided) => ({
    ...provided,
    boxShadow: "none", // Remove any focus shadow
    border: "none", // Remove the input border
    outline: "none", // Remove the browser outline
  }),
};


const Index = ({categories, sub_categories}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const formattedData = sub_categories.map((sub) => ({
        value: sub.id, // Map the ID to the "value" field
        label: sub.name, // Map the name to the "label" field
    }));
    const availableData = formattedData.filter(
        (item) => !categories.some((selected) => selected.sub_category_id === item.value)
    )

    const handleSelectChange = (option) => {
        setSelectedOption(option);
    };

    const handleAddClick = () => {
        if (selectedOption) {
            // onAddCategory(selectedOption);
            router.post(route('business.categories.store'), {
                'id':selectedOption.value
            });
            setSelectedOption(null); // Reset the dropdown
        }
    };

    const handleSetAsPrimary = (id) => {
        router.put(route('business.categories.update', id));
    };

    const handleDelete = (id) => {
        router.delete(route('business.categories.destroy', id));
    };

    useEffect(() => {
    }, []);

    return (
        <div className='content-wrapper m-3'>

            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="m-3 flex items-center justify-between">
                            <div className="">
                                <h3 className="m-0 text-center text-lg-start">Categories</h3>
                            </div>
                            <div className="flex items-center">
                                <Select
                                    options={availableData}
                                    value={selectedOption}
                                    styles={customStyles}
                                    onChange={handleSelectChange}
                                    placeholder="Select a sub category..."
                                    isClearable
                                    className="w-64 inline"
                                />

                                <div className="ml-4 text-center text-lg-end">
                                    <button onClick={handleAddClick} className="btn btn-success" type="button">
                                        <i className="fa-solid fa-plus"></i> Add
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive text-center">
                            <table className="table">
                                {/* <thead>
                                    <tr className="border-bottom-primary">
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead> */}
                                <tbody>
                                    {categories.length == 0 ? (
                                        <tr className='text-center'>
                                            <td>Please select categories. You can select up to 6 categories.</td>
                                        </tr>
                                    ):(
                                        <>
                                        {categories.map((item, index) => (
                                        <tr className="border-bottom-secondary" key={index}>
                                            <td>
                                                <div className='flex justify-between mx-3'>
                                                    <div className='flex items-center px-3'>
                                                        <p className='mb-0 text-gray-700'>{item.sub_category.name}</p>
                                                        {
                                                            item.is_primary !== 0 && (
                                                                <p className='ml-5 mb-0 py-1 px-3 rounded-full text-sm text-gray-200 bg-primary'>
                                                                    Primary
                                                                </p>
                                                            )
                                                        }
                                                    </div>
                                                    <div className='flex items-center'>
                                                        {
                                                            item.is_primary == 0 && (
                                                                <button
                                                                    onClick={()=>handleSetAsPrimary(item.id)}
                                                                    className="no-underline mr-3 inline py-1 min-w-[120px] ml-4 border border-blue-500 text-sm text-bold text-blue-500 rounded-full hover:bg-blue-100">
                                                                Set as Primary
                                                                </button>
                                                            )
                                                        }

                                                        {
                                                            categories.length !== 1 && (
                                                                <button
                                                                    onClick={()=>handleDelete(item.id)}
                                                                    className="mr-3 inline py-1 min-w-[120px] ml-4 border border-blue-500 text-sm text-bold text-gray-800 rounded-full bg-yellow-500 hover:bg-yellow-400">
                                                                Remove
                                                                </button>

                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        ))
                                        }
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;

Index.layout = (Page) => <AdminLayout>{Page}</AdminLayout>;
