import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayoout/Index';
import ProductHeader from './Partial/ProductHeader.jsx'
import ClickableWrite from './Partial/ClickableWrite.jsx'
import Filter from './Partial/Filter.jsx'
import PaginationList from './Partial/PaginationList.jsx'
import ProductRecent from './Partial/ProductRecent.jsx'
import ProductList from './Partial/ProductList.jsx'

export default function Product({ data }) {
    return (
        <>
            <FrontendLayout>
                <Head title={data.product.name} />

                <ProductHeader company={data.company} product={data.product}/>
{/* href={`/evaluate/product/${product.id}/${website}`} */}
                <div className="p-2 bg-[#FCFBF3]">
                    <div className='container-sm my-2'>
                        <div className="p-2 grid lg:grid-cols-3 gap-4 grid-cols-1 mb-3">
                            <div className="col-span-2">
                                <div className='flex flex-col gap-4'>
                                    <ClickableWrite url={`/evaluate/product/${data.product.id}/${data.company.website}`}/>

                                    <Filter ratings={data.company.rating_statistic}/>

                                    <PaginationList reviews={data.reviews}/>
                                </div>
                            </div>

                            <div className='flex flex-col gap-4'>
                                <ProductRecent products={data.recent_products}/>
                            </div>
                        </div>
                    </div>
                </div>

            </FrontendLayout>
        </>
    );
}
