import React, { useState, useEffect } from 'react';
import ShowTariffTable from './ShowTariffTable';

const FrontPanel = () => {
    const [display, setDisplay] = useState('');
    const [cost, setCost] = useState('');
    const [tableData, setTableData] = useState([]); // Initialize with an empty array

    const tarrifConsumptionUpto500 = [
        { from: 1, to: 100, price: 0 },
        { from: 101, to: 200, price: 2.25 },
        { from: 201, to: 400, price: 4.50 },
        { from: 401, to: 500, price: 6 },
    ];

    const tarrifConsumptionAbove500 = [
        { from: 1, to: 100, price: 0 },
        { from: 101, to: 400, price: 4.50 },
        { from: 401, to: 500, price: 6 },
        { from: 501, to: 600, price: 8 },
        { from: 601, to: 800, price: 9 },
        { from: 801, to: 1000, price: 10 },
        { from: 1001, price: 11 },
    ];

    const calculateCost = (consumption, tariffSlabs) => {
        let totalCost = 0;
        let tableData = [];
        let remainingConsumption = consumption;

        for (const slab of tariffSlabs) {
            const { from, to, price } = slab;

            if (remainingConsumption <= 0) break;

            const maxTo = to !== undefined ? to : remainingConsumption + from - 1;
            const unitsInSlab = Math.min(remainingConsumption, maxTo - from + 1);
            const slabCost = unitsInSlab * price;
            totalCost += slabCost;
            tableData.push({
                slab: `${from}-${maxTo} Units`,
                consumption: unitsInSlab,
                cost: slabCost,
            });

            remainingConsumption -= unitsInSlab;
        }

        return { cost: totalCost, data: tableData }; // Return both cost and table data
    };

    const handleButtonClick = (value) => {
        setDisplay((prev) => prev + value);
    };

    const handleClear = () => {
        setDisplay('');
        setTableData([]); // Clear the table data as well
        setCost(''); // Clear the table data as well
    };

    const handleCalculate = () => {
        try {
            const consumption = parseInt(display, 10); // Convert input to number
            if (isNaN(consumption)) {
                throw new Error('Invalid input');
            }

            // Correctly get cost and data from calculateCost
            const { cost, data } =
                consumption > 500
                    ? calculateCost(consumption, tarrifConsumptionAbove500)
                    : calculateCost(consumption, tarrifConsumptionUpto500);

            setDisplay(cost.toFixed(2)); // Set display to the calculated cost
            setTableData(data); // Set the table data
            setCost(cost)
        } catch (error) {
            setDisplay('Error');
        }
    };

    return (
        <div className='bg-gray-100 grid grid-cols-2 gap-2 min-h-screen'>
            <div className='flex flex-col items-center justify-center mt-1'>
                <div className='bg-gray-600 p-4 rounded-lg'>
                    <div className='bg-gray-300 p-4 rounded-lg mb-4'>
                        <input
                            type='text'
                            value={display}
                            readOnly
                            className='w-full text-right p-2 bg-gray-200 border border-gray-400 rounded'
                        />
                    </div>
                    <div className='grid grid-cols-3 gap-2'>
                        {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
                            <button
                                key={num}
                                className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded'
                                onClick={() => handleButtonClick(num.toString())}
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            className='bg-red-500 hover:bg-red-700 text-white p-2 rounded'
                            onClick={handleClear}
                        >
                            C
                        </button>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded'
                            onClick={() => handleButtonClick('0')}
                        >
                            0
                        </button>
                        <button
                            className='bg-green-500 hover:bg-green-700 text-white p-2 rounded'
                            onClick={handleCalculate}
                        >
                            =
                        </button>
                    </div>
                </div>
            </div>
            <div className='bg-gray-800 text-white text-center'>
                <ShowTariffTable data={tableData} totalCost={cost} />
            </div>
        </div>
    );
};

export default FrontPanel;
