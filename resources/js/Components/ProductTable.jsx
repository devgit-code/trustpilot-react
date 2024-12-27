
import SearchBar from '@/Components/SearchBar';

export default function ProductTable({ products, show_link }){
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="table-responsive text-center">
            <table className="table">
                <thead>
                    <tr className="border-bottom-primary">
                        <th>No</th>
                        <th>Image</th>
                        <th>Name</th>
                        {/* <th>Description</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length == 0 ? (
                        <tr className='text-center'>
                            <td colSpan="4">There is no product</td>
                        </tr>
                    ):(
                        <>
                        {products
                        .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((item, index) => (
                        <tr className="border-bottom-secondary align-middle" key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                            {item.image ? (
                                <img src={`/storage/${item.image}`}
                                    alt="item-logo"
                                    className='inline'
                                    style={{ maxWidth: '64px', maxHeight: '64px' }} />
                            ):(
                                <>No image</>
                            )}
                            </td>
                            <td>{item.name}</td>
                            <td>
                                <ul className="action d-flex align-items-center list-unstyled m-0 justify-content-center">
                                    <li className="edit">
                                        <Link href={route('yonetici.products.edit', item.id)}>
                                            <FaEdit className='text-primary fs-4 me-2' />
                                        </Link>
                                    </li>
                                    <form
                                        // action={route('yonetici.products.destroy', item.id)}
                                        onSubmit={(e) => handleDelete(e, item.id)}
                                        method="POST"
                                    >
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <li className="delete d-flex align-items-center">

                                            <button type="submit" className="border-0 bg-transparent">
                                                <BsTrashFill className="text-danger fs-4" />

                                            </button>
                                        </li>
                                    </form>
                                </ul>
                            </td>
                        </tr>
                        ))
                        }
                        </>
                    )}
                </tbody>
            </table>
        </div>
    )
}
