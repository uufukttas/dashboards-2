import { Button } from '@projects/button';
import axios from 'axios';
import React, { useState } from 'react'
import '../ServicePointDetails.css'

interface IWorkingHoursContentProps {
    slug: string;
};

interface IHour {
    RID: number;
    DayOfTheWeek: number;
    IsClosed: boolean,
    OpeningTime: string,
    ClosingTime: string,
    IsDeleted: boolean
};

interface IResponseItem {
    day: number;
    hour: number;
}


interface IConvertedStructure {
    stationID: string;
    dayOfTheWeek: number;
    openingTime: string;
    closingTime: string;
    isClosed: boolean;
    isDeleted: boolean;
  }
  

const WorkingHoursContent = ({ slug }: IWorkingHoursContentProps) => {
    const [schedule, setSchedule] = useState([
        { day: 0, hours: Array(24).fill(false) },
        { day: 1, hours: Array(24).fill(false) },
        { day: 2, hours: Array(24).fill(false) },
        { day: 3, hours: Array(24).fill(false) },
        { day: 4, hours: Array(24).fill(false) },
        { day: 5, hours: Array(24).fill(false) },
        { day: 6, hours: Array(24).fill(false) }
    ]);
    const [selectedHours, setSelectedHours] = useState<IHour[]>([
        {
            "RID": 1906,
            "DayOfTheWeek": 0,
            "IsClosed": true,
            "OpeningTime": "23:00:00",
            "ClosingTime": "00:00:00",
            "IsDeleted": false
        },
        {
            "RID": 1907,
            "DayOfTheWeek": 1,
            "IsClosed": true,
            "OpeningTime": "23:00:00",
            "ClosingTime": "00:00:00",
            "IsDeleted": false
        },
        {
            "RID": 1900,
            "DayOfTheWeek": 1,
            "IsClosed": true,
            "OpeningTime": "01:00:00",
            "ClosingTime": "02:00:00",
            "IsDeleted": false
        },
        {
            "RID": 1901,
            "DayOfTheWeek": 2,
            "IsClosed": true,
            "OpeningTime": "01:00:00",
            "ClosingTime": "02:00:00",
            "IsDeleted": false
        },
        {
            "RID": 1902,
            "DayOfTheWeek": 2,
            "IsClosed": true,
            "OpeningTime": "02:00:00",
            "ClosingTime": "03:00:00",
            "IsDeleted": false
        },
        {
            "RID": 1908,
            "DayOfTheWeek": 2,
            "IsClosed": true,
            "OpeningTime": "23:00:00",
            "ClosingTime": "00:00:00",
            "IsDeleted": false
        },
        {
            "RID": 1909,
            "DayOfTheWeek": 3,
            "IsClosed": true,
            "OpeningTime": "23:00:00",
            "ClosingTime": "00:00:00",
            "IsDeleted": false
        },
        {
            "RID": 1903,
            "DayOfTheWeek": 3,
            "IsClosed": true,
            "OpeningTime": "03:00:00",
            "ClosingTime": "04:00:00",
            "IsDeleted": false
        },
        {
            "RID": 1904,
            "DayOfTheWeek": 4,
            "IsClosed": true,
            "OpeningTime": "03:00:00",
            "ClosingTime": "04:00:00",
            "IsDeleted": false
        },
        {
            "RID": 1905,
            "DayOfTheWeek": 4,
            "IsClosed": true,
            "OpeningTime": "04:00:00",
            "ClosingTime": "05:00:00",
            "IsDeleted": false
        },
        {
            "RID": 1910,
            "DayOfTheWeek": 4,
            "IsClosed": true,
            "OpeningTime": "23:00:00",
            "ClosingTime": "00:00:00",
            "IsDeleted": false
        },
        {
            "RID": 1911,
            "DayOfTheWeek": 5,
            "IsClosed": true,
            "OpeningTime": "23:00:00",
            "ClosingTime": "00:00:00",
            "IsDeleted": false
        },
        {
            "RID": 1912,
            "DayOfTheWeek": 6,
            "IsClosed": true,
            "OpeningTime": "23:00:00",
            "ClosingTime": "00:00:00",
            "IsDeleted": false
        }
    ]);
    const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

    const scheduleToHours = (schedule: { day: number, hours: boolean[][] }[]): { day: number, hour: number }[] => {
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

    const convertResponseToStructure = (response: IResponseItem[]): IConvertedStructure[] => {
        const result: IConvertedStructure[] = [];

        response.forEach(item => {
            const dayOfTheWeek = item.day;
            const openingHour = item.hour;
            const closingHour = (openingHour + 1) % 24; // Saat aralığı bir saat

            const structure: IConvertedStructure = {
                stationID: slug,
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

    const handleChange = (dayIndex: number, hourIndex: number) => {
        const newSchedule = [...schedule];
        newSchedule[dayIndex].hours[hourIndex] = !newSchedule[dayIndex].hours[hourIndex];
        setSchedule(newSchedule);
        setSelectedHours(scheduleToHours(schedule));
    };

    const setWorkingHours = () => {
        axios
            .post(
                'https://sharztestapi.azurewebsites.net/ServicePoint/AddWorkHours',
                JSON.stringify(convertResponseToStructure(selectedHours)),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => console.log('response', response));

    };

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
                                    <td key={dayIndex} className={`h-[20px] focus:ring-transparent ${day.hours[hourIndex] ? 'isPassive' : ''}`}>
                                        <input
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
                        buttonText='Kaydet'
                        className='bg-primary text-white rounded-md px-4 py-2'
                        type='button'
                        onClick={setWorkingHours}
                    />
                </div>
            </div>
        </div>
    )
}

export default WorkingHoursContent