import React, {useState} from 'react'

const FiltersBar = ({query, setQuery, sort, setSort, order, setOrder, future, setFuture}) => {
	const [queryField, setQueryField] = useState("");
	const [sortDropdown, setSortDropdown] = useState(false);
	const [orderDropdown, setOrderDropdown] = useState(false);

	const handleSearch = (e) => {
		if(e.key == "Enter") {
			setQuery(queryField);
		}
	}; 

	return (
		<section className='flex max-xl:flex-col'>
			<input onKeyDown={(e) => handleSearch(e)} value={queryField} onChange={(e) => setQueryField(e.target.value)} placeholder="Mission title, description, host, status..." className="mx-5 my-5 xl:w-full text-gray-200 tracking-wider lg:text-lg bg-gray-800 border border-gray-600 hover:bg-gray-600 rounded-lg transition duration-300 p-1"/>

			<div className='flex my-5 mx-5'>
				<p className='py-1 text-gray-200 tracking-wider lg:text-lg text-nowrap'>Future missions:</p>
				<input type="checkbox" onChange={(e) => setFuture(e.target.checked)} className="ml-2 my-auto w-5 h-5" />
			</div>

			<div className='flex my-5 mx-5 select-none'>
				<p className='my-auto py-1 text-gray-200 tracking-wider lg:text-lg text-nowrap'>Sort by:</p>
				<div className='flex ml-2 my-auto py-1 w-full text-gray-200 bg-gray-800 border border-gray-600 rounded-lg '>
					<div className='flex flex-col'>
						<p className='m-auto ml-4 text-gray-200 tracking-wider lg:text-lg'>{sort}</p>
						{sortDropdown && (
							<div className={`absolute flex flex-col mt-10 p-2 bg-gray-800 border border-gray-600 rounded-lg w-60 max-lg:w-40`}>
								{["Title", "Date"].map((item) => (
									<button type="button" onClick={(e) => setSort(e.target.value)} value={item} className='text-gray-200 text-start border-b py-1 border-transparent hover:border-gray-200 transition duration-300'>{item}</button>
								))}
							</div>
						)}
					</div>
					<p onClick={() => setSortDropdown(!sortDropdown)} className={`m-auto mr-4 text-gray-200 tracking-wider text-xl hover:text-red-600 cursor-pointer transition duration-300 ${sortDropdown && "rotate-180"}`}>▼</p>
				</div>
			</div>

			<div className='flex my-5 mx-5 select-none'>
				<p className='my-auto py-1 text-gray-200 tracking-wider lg:text-lg text-nowrap'>Order by:</p>
				<div className='flex ml-2 py-1 w-full text-gray-200 bg-gray-800 border border-gray-600 rounded-lg '>
					<div className='flex flex-col'>
						<p className='m-auto ml-4 text-gray-200 tracking-wider lg:text-lg'>{order}</p>
						{orderDropdown && (
							<div className={`absolute flex flex-col mt-10 p-2 bg-gray-800 border border-gray-600 rounded-lg w-60 max-lg:w-40`}>
								{["Asc", "Desc"].map((item) => (
									<button type="button" onClick={(e) => setOrder(e.target.value)} value={item} className='text-gray-200 text-start border-b py-1 border-transparent hover:border-gray-200 transition duration-300'>{item}</button>
								))}
							</div>
						)}
					</div>
					<p onClick={() => setOrderDropdown(!orderDropdown)} className={`m-auto mr-4 text-gray-200 tracking-wider text-xl hover:text-red-600 cursor-pointer transition duration-300 ${orderDropdown && "rotate-180"}`}>▼</p>
				</div>
			</div>
		</section>
	)
}

export default FiltersBar