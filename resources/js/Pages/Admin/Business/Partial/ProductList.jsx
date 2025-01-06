import React, { useState, useEffect, useRef } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Link, usePage, useForm} from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Swal from 'sweetalert2';

const ProductList = ({ business_id, products }) => {
    const { data, setData, post, errors, clearErrors } = useForm({
        name: '',
        image:null,
    })

    const [preview, setPreview] = useState(null); // Preview URL

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

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        clearErrors();

        // Generate preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            // setPreview(null);
        }
    };

    const handleOpenDialog = (product = null) => {
        if (product) {
            setEditMode(true);
            setProductData(product);
            setData({
                'name': product.name,
                'image': product.image
            })
        } else {
            setEditMode(false);
            setProductData(null);
        }
        setDialogVisible(true);
    };

    const handleCloseDialog = () => {
        setDialogVisible(false);
        setProductData(null);
        setData({
            'name': '',
            'image': null,
        })
        clearErrors();
        setPreview(null)
    };

    // Handle clicking outside the dialog to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                handleCloseDialog();
            }
        };

        if (dialogVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dialogVisible]);

    const handleRemove = (id) => {
        Swal.fire({
            title: 'Delete this product?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        }).then(async (result) => {
            if (result.isConfirmed) {
                post(route('admin.businesses.product.delete', {business:business_id, product:id}), {
                    onSuccess: () => {
                        handleCloseDialog(); // Close dialog after successful submission
                    },
                });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!editMode){
            post(route('admin.businesses.product.add', business_id), {
                onSuccess: () => {
                    handleCloseDialog(); // Close dialog after successful submission
                },
            });
        }else{
            post(route('admin.businesses.product.update', {business:business_id, product:productData.id}), {
                onSuccess: () => {
                    handleCloseDialog(); // Close dialog after successful submission
                },
            });
        }
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
                            <button className="h-16 flex items-center text-center mb-0 no-underline text-black capitalize text-sm hover:underline"
                                onClick={()=>handleOpenDialog(product)}> {product.name.length > 35 ? `${product.name.slice(0, 35)}...` : product.name}
                            </button>
                            <div className="inline-flex items-center justify-center w-12 h-12 ">
                                <img src={`/storage/${product.image}`}
                                    alt="product-logo"
                                    className='max-h-12 max-w-12 object-cover broder-1 rounded'
                                    style={{ maxWidth: '48px', maxHeight: '48px' }} />
                            </div>
                            <button className='mt-2 text-xs no-underline p-1 border rounded text-primary hover:bg-gray-100' onClick={()=>handleRemove(product.id)}>Remove</button>
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
                                    value={data.name}
                                    onChange={(e)=>setData('name', e.target.value )}
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className='my-4'>
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
                            </div>

                            {preview ? (
                                <div className='mt-2'>
                                    <p className='text-gray-700'>Preview:</p>
                                    <img src={preview} alt="Image Preview" style={{ maxWidth: '128px', maxHeight: '128px' }} />
                                </div>
                            ):(
                                <>
                                {productData.image ? (
                                    <img src={`/storage/${productData.image}`}
                                        alt="product-logo"
                                        className='inline'
                                        style={{ maxWidth: '128px', maxHeight: '128px' }} />
                                ):(
                                    <div className='h-32'>No image</div>
                                )}
                                </>
                            )}

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
