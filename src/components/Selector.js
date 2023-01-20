
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaAngleDown, FaSearch } from "react-icons/fa";

const Selector = () => {
    const [countries, setCountries] = useState([]);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');


    useEffect(() => {
        const url = 'https://restcountries.com/v3.1/all?fields=name';
        axios.get(url).then(res => setCountries(res.data)).catch((error) => console.log(error));
    }, []);

    const handlesearchValue = value => {
        setInputValue(value);
    }
    return (
        <div className='w-72 h-80 font-medium'>
            <div className={`bg-white w-full p-2 flex items-center justify-between rounded ${!selectedCountry && 'text-gray-700'}`} onClick={() => setOpen(!open)}>
                {selectedCountry
                    ?
                    selectedCountry?.length > 25 ?
                        selectedCountry.substring(0, 25) + '...'
                        :
                        selectedCountry
                    :
                    'Select Country'}
                <FaAngleDown size={20} />
            </div>
            {
                open && <>
                    <ul className='bg-white mt-2 rounded overflow-y-auto h-96'>
                        <div className='sticky top-0 flex items-center px-2 bg-white'>
                            <FaSearch size={18} className="text-gray-700" />
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => handlesearchValue(e.target.value)}
                                placeholder='Search country'
                                className="placeholder:text-gray-700 w-full p-2 outline-none"
                            />
                        </div>
                        {
                            countries?.map((country) => (
                                <li className={` p-2 text-sm hover:bg-sky-600 hover:text-white 
                                ${country?.name.common.toLowerCase() === selectedCountry?.toLowerCase() && 'bg-sky-600 text-white'}
                                ${country?.name.common.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'}`} key={country.name.common} onClick={() => {
                                        if (country?.name.common.toLowerCase() !== selectedCountry?.toLowerCase()) {
                                            setSelectedCountry(country.name.common);
                                            setOpen(false);
                                            setInputValue('');
                                        }
                                    }
                                    }>
                                    {country.name.common}
                                </li>
                            ))
                        }
                        {
                            inputValue?.length > 1 && countries.filter(country => country.name.common.toLowerCase() !== inputValue.toLowerCase()) ? <li className='px-2'>No data found</li> : ''
                        }

                    </ul>
                </>
            }
        </div>
    );
};

export default Selector;