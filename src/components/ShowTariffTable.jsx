import React from 'react';

const ShowTariffTable = ({ data, totalCost }) => {

    return (
        <div className='p-4'>
            <h2 className='text-xl font-semibold mb-4'>Tariff Calculation</h2>
            <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
                <thead className='bg-gray-200 text-gray-700'>
                    <tr>
                        <th className='py-2 px-4 border-b'>Slab</th>
                        <th className='py-2 px-4 border-b'>Units</th>
                        <th className='py-2 px-4 border-b'>Price</th>
                    </tr>
                </thead>
                <tbody className='text-gray-600'>
                    {data.map((row, index) => (
                        <tr className='hover:bg-gray-100' key={index}>
                            <td className='py-2 px-4 border-b'>{row.slab}</td>
                            <td className='py-2 px-4 border-b'>{row.consumption}</td>
                            <td className='py-2 px-4 border-b'>{row.cost}</td>
                        </tr>
                    ))}
                    <tr className='bg-gray-200'>
                        <td className='py-2 px-4 border-b'></td>
                        <td className='py-2 px-4 border-b text-right'>Total Cost</td>
                        <td className='py-2 px-4 border-b'>{totalCost}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ShowTariffTable;