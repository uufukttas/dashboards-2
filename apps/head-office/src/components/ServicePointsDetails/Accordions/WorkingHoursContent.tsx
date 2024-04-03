import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@projects/button';
import '../ServicePointDetails.css';
import type { IWorkingHoursContentProps, IConvertedStructure, IResponseItem } from '../types';

const WorkingHoursContent = ({ slug }: IWorkingHoursContentProps) => {
    const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const [isPassive, setIsPassive] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [schedule, setSchedule] = useState([
        { day: 0, hours: Array(24).fill(false) },
        { day: 1, hours: Array(24).fill(false) },
        { day: 2, hours: Array(24).fill(false) },
        { day: 3, hours: Array(24).fill(false) },
        { day: 4, hours: Array(24).fill(false) },
        { day: 5, hours: Array(24).fill(false) },
        { day: 6, hours: Array(24).fill(false) }
    ]);

    const addWorkingHours = async () => {};
    const convertResponseToStructure = (response: IResponseItem[]): IConvertedStructure[] => {
        const result: IConvertedStructure[] = [];

        response.forEach(item => {
            const dayOfTheWeek = item.day;
            const openingHour = item.hour;
            const closingHour = (openingHour + 1) % 24;

            const structure: IConvertedStructure = {
                stationID: Number(slug),
                dayOfTheWeek: dayOfTheWeek,
                openingTime: openingHour.toString().padStart(2, '0') + ':00',
                closingTime: closingHour.toString().padStart(2, '0') + ':00',
                isClosed: true,
                isDeleted: false
            };

            result.push(structure);
        });

        return result;
    };
    const getWorkingHours = async () => {
        try {
            axios
                .post(
                    process.env.GET_WORKING_HOURS || '',
                    { stationID: 65824 },
                    { headers: { 'Content-Type': 'application/json' } }
                )
                .then((response) => console.log('response', response.data))
                .catch((error) => { console.log('error', error) }
                );
        }
        catch (error) {
            console.log('error', error)
        };
    };
    const handleChange = (dayIndex: number, hourIndex: number) => {
        const newSchedule = [...schedule];

        newSchedule[dayIndex].hours[hourIndex] = true;

        setSchedule(newSchedule);
    };
    // const handleChange = (dayIndex: number, hourIndex: number) => {
    //     const newSchedule = [...schedule];
    //     newSchedule[dayIndex].hours[hourIndex] = !newSchedule[dayIndex].hours[hourIndex];
    //     setSchedule(newSchedule);
    //     setSelectedHours(scheduleToHours());
    // };
    const scheduleToHours = () => {
        const hours: { day: number, hour: number }[] = [];

        schedule.forEach(day => {
            day.hours.forEach((isHourSelected, hourIndex) => {
                if (isHourSelected) {
                    const hour: { day: number, hour: number } = {
                        day: Number(day.day),
                        hour: hourIndex
                    };
                    hours.push(hour);
                }
            });
        });

        return hours;
    };
    // const setWorkingHours = () => {
    //     axios
    //         .post(
    //             'https://sharztestapi.azurewebsites.net/ServicePoint/AddWorkHours',
    //             JSON.stringify(convertResponseToStructure(selectedHours)),
    //             { headers: { 'Content-Type': 'application/json' } }
    //         )
    //         .then((response) => console.log('response', response));
    // };

    // const setDefaultHours = (response: IResponse[]) => {
    //     response.forEach(res => {
    //         const index = schedule.findIndex(item => item.day === res.DayOfTheWeek);
    //         if (index !== -1) {
    //             const newSchedule = [...schedule];
    //             newSchedule[index].hours[parseInt(res.OpeningTime)] = true;
    //             setSchedule(newSchedule);
    //         }
    //     });
    // };
    const togglePassive = () => setIsPassive(!isPassive);
    const updateWorkingHours = async () => {};

    useEffect(() => {
        getWorkingHours();
    }, []);

    return (
        <div className="working-hours-content py-8">
            <div className="charge-units-header flex justify-center p-4">
                <h3> <strong>Aktif olmayan</strong> gun ve saatleri seciniz</h3>
            </div>
            <div className='w-full'>
                <table className='w-full'>
                    <thead className='text-left'>
                        <tr>
                            <th>Time</th>
                            {schedule.map((day, index) => (
                                <th key={index}>{days[index]}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 24 }).map((_, hourIndex) => (
                            <tr key={hourIndex}>
                                <td className='w-[25px]'>{hourIndex}:00</td>
                                {schedule.map((day, dayIndex) => (
                                    <td key={dayIndex} className={`h-[20px] focus:ring-transparent ${isPassive ? 'isPassive' : ''}`} onClick={togglePassive}>
                                        <input
                                            checked={schedule[dayIndex].hours[hourIndex]}
                                            type="checkbox"
                                            value={schedule[dayIndex].hours[hourIndex]}
                                            onChange={(event) =>
                                                handleChange(dayIndex, hourIndex)
                                            }
                                            data-day-value={dayIndex}
                                            data-hour-value={hourIndex}
                                            className='text-center border-2 border-gray-200 p-1 text-sm w-full h-full focus:ring-transparent'
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-end mt-4'>
                    <Button
                        buttonText={isUpdated ? 'Güncelle' : 'Ekle'}
                        className='bg-primary text-white rounded-md px-4 py-2'
                        id='add-working-hours-button'
                        type='button'
                        onClick={isUpdated ? updateWorkingHours : addWorkingHours}
                    />
                </div>
            </div>
        </div>
    )
}

export default WorkingHoursContent;
