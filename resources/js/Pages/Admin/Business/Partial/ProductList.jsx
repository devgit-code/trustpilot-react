import React, { useState, useEffect, useRef } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Link, usePage, useForm} from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

const ProductList = ({ products }) => {
    const { data, setData, post, errors, clearErrors } = useForm({
        name: '',
        image:null,
    })

    const containerRef = useRef(null);
    const dialogRef = useRef(null);  // Reference for the dialog
    const [dialogVisible, setDialogVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [productData, setProductData] = useState({ title: '', image: null });

    const scrollLeft = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth / 2;
            containerRef.current.scrollBy({ left: -containerWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth / 2;
            containerRef.current.scrollBy({ left: containerWidth, behavior: 'smooth' });
        }
    };

    const handleOpenDialog = (product = null) => {
        if (product) {
            setEditMode(true);
            setProductData({ title: product.name, image: product.image });
        } else {
            setEditMode(false);
            setProductData({ title: '', image: null });
        }
        setDialogVisible(true);
    };

    const handleCloseDialog = () => {
        setDialogVisible(false);
        setProductData({ title: '', image: null });
    };

    // Handle clicking outside the dialog to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                handleCloseDialog();
            }
        };

        // Attach the event listener only when dialog is visible
        if (dialogVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Clean up the event listener when dialog is closed or component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dialogVisible]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('admin.products.update', productData.id), {
            onSuccess: () => {
                handleCloseDialog(); // Close dialog after successful submission
            },
        });
    };

    return (
        <div className="card py-6 bg-white container-md">
            {/* Title */}
            <div className="relative flex justify-between px-3">
                <h2 className="text-center text-xl font-bold mb-6">Products</h2>
                {/* See More Button */}
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => handleOpenDialog()}
                            className="btn btn-success mr-2" type="button"
                            >Add Product
                        </button>
                        <button
                            onClick={scrollLeft}
                            className="inline-flex items-center justify-center mr-2 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 z-10">
                            <FiArrowLeft size={20}
                            disabled={products.length < 6}/>
                        </button>
                        <button
                            onClick={scrollRight}
                            className="inline-flex items-center justify-center mr-2 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 z-10">
                            <FiArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative mt-3">
                {
                    products.length === 0 && (
                        <div className="flex items-center justify-center h-24 text-gray-800">
                        There is no product.
                        </div>
                    )
                }
                <div ref={containerRef}
                    className={`flex items-center gap-3 ${products.length < 6 ? "justify-center" : "justify-start"} overflow-hidden`}>
                    {products.map((product, index) => (
                        <div key={index} className="w-1/6 min-w-[120px] h-30 bg-white rounded-lg flex flex-col items-center justify-between">
                            <p  className="h-16 flex items-center text-center mb-0 no-underline text-black capitalize text-sm hover:underline" > {product.name.length > 35 ? `${product.name.slice(0, 35)}...` : product.name}</p>
                            <div className="inline-flex items-center justify-center w-12 h-12 ">
                                <img src={`/storage/${product.image}`}
                                    alt="product-logo"
                                    className='max-h-12 max-w-12 object-cover broder-1 rounded'
                                    style={{ maxWidth: '48px', maxHeight: '48px' }} />
                            </div>
                            <Link className='mt-2 text-xs no-underline p-1 border radius-lg' as='button' onClick={()=>console.log('d------')}>Remove</Link>
                            {/* <p className='mt-2 mb-0 text-gray-700 text-sm'>{product.count_reviews} reviews</p> */}
                        </div>
                    ))}
                </div>
            </div>


            {/* Dialog for Add/Edit Product */}
            {dialogVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        ref={dialogRef}
                        className="bg-white p-6 rounded-lg shadow-lg w-1/2"
                    >
                        <h3 className="text-xl font-bold mb-4">{editMode ? 'Edit Product' : 'New Product'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full"
                                    value={productData.name}
                                    onChange={(e)=>setProductData({ ...productData, name: e.target.value })}
                                    // required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            {/* <div className='my-4'>
                                <input
                                    // ref={inputRef}
                                    className="form-control"
                                    id="image-file"
                                    name="image"
                                    type="file"
                                    aria-label="file example"
                                    onChange={handleFileChange}
                                />

                                <InputError className="mt-2" message={errors.image} />
                            </div> */}

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setProductData({ ...productData, image: e.target.files[0] })
                                    }
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleCloseDialog}
                                    className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
