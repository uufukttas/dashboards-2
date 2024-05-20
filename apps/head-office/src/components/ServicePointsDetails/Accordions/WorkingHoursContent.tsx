// File: TimeSchedule.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { hideAlert, showAlert } from '../../../../app/redux/features/alertInformation';
import { IWorkingHoursContentProps, ITimeSlot } from '../types';

const WorkingHoursContent = ({ slug }: IWorkingHoursContentProps) => {
    const dispatch = useDispatch();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [timeSlots, setTimeSlots] = useState<ITimeSlot[]>(() =>
        Array.from({ length: 7 * 24 }).map((_, index) => ({
            day: Math.floor(index / 24),
            hour: index % 24,
            isSelected: false,
            isPassive: false,
            isSelectable: true,
        }))
    );
    const sectionPrefix = 'working-hours';
    const [isUpdated, setIsUpdated] = useState(false);
    const [selectionStart, setSelectionStart] = useState<ITimeSlot | null>(null);

    let isReset = false;

    const applyDefaultTimes = (response: {
        RID: number;
        OpeningTime: string;
        ClosingTime: string;
        DayOfTheWeek: number;
    }[]) => {
        const newTimeSlots = [...timeSlots]; // Copy the initial state

        response.forEach(entry => {
            const rid = entry.RID;
            const startHour = parseInt(entry.OpeningTime.split(':')[0], 10);
            const endHour = parseInt(entry.ClosingTime.split(':')[0], 10);
            const day = entry.DayOfTheWeek;

            for (let hour = startHour; hour <= endHour; hour++) {
                const index = day * 24 + hour;
                newTimeSlots[index].isSelected = startHour === endHour ? false : true
                newTimeSlots[index].rid = rid; // Set the rid for the time slot
            }
        });

        setTimeSlots(newTimeSlots); // Update state with the modified time slots
    };
    const clearSelection = () => {
        setTimeSlots(currentSlots =>
            currentSlots.map(slot => ({
                ...slot,
                isSelected: false
            }))
        );
    };
    const completeRangeSelection = (startSlot: ITimeSlot, endSlot: ITimeSlot) => {
        const startHour = Math.min(startSlot.hour, endSlot.hour);
        const endHour = Math.max(startSlot.hour, endSlot.hour);
        const day = startSlot.day;

        updateTimeSlotsForRange(day, startHour, endHour, true);
    };
    const getWorkingHours = () => {
        axios
            .post(
                process.env.GET_WORKING_HOURS || '',
                JSON.stringify({ "stationID": slug }),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then(response => {
                console.log('response.data', response.data)
                applyDefaultTimes(response.data)

                if (response.data.length > 0) {
                    setIsUpdated(true);
                }
            })
            .catch(error => console.log(error));
    }
    const handleTimeSlotClick = (clickedSlot: ITimeSlot) => {
        if (clickedSlot.isPassive) return;

        if (selectionStart) {
            if (clickedSlot.day === selectionStart.day) {
                if (clickedSlot.hour === selectionStart.hour) {
                    updateTimeSlotSelection(clickedSlot, false);
                    setSelectionStart(null);
                } else {
                    completeRangeSelection(selectionStart, clickedSlot);
                    setSelectionStart(null);
                }
            } else {
                clearSelection();
                setSelectionStart(clickedSlot);
                updateTimeSlotSelection(clickedSlot, true);
            }
        } else {
            setSelectionStart(clickedSlot);
            updateTimeSlotSelection(clickedSlot, true);
        }
    };
    const sendRequest = async (url: string, data: string) => {
        const response = await axios
            .post(
                url,
                data,
                { headers: { 'Content-Type': 'application/json' } }
            )

        return response;
    };
    const handleSubmit = () => {
        const daysWeek = daysOfWeek.map((_, dayIndex) => {
            const dailySelectedSlots = timeSlots.filter(slot => slot.day === dayIndex && slot.isSelected);
            const firstSelectedSlot = dailySelectedSlots.length > 0 ? dailySelectedSlots[0] : null;
            const lastSelectedSlot = dailySelectedSlots.length > 0
                ? dailySelectedSlots[dailySelectedSlots.length - 1]
                : null;

            return {
                dayOfTheWeek: dayIndex,
                isClosed: dailySelectedSlots.length === 24,
                openingTime: firstSelectedSlot ? `${firstSelectedSlot.hour}:00` : null,
                closingTime: lastSelectedSlot ? `${lastSelectedSlot.hour}:00` : null,
                isDeleted: false,
                rid: firstSelectedSlot?.rid
            };
        }).filter(day => day.openingTime !== null && day.closingTime !== null);

        const updatedArr: {
            dayOfTheWeek: number;
            isClosed: boolean;
            openingTime: string | null;
            closingTime: string | null;
            isDeleted: boolean;
            rid: number;
        }[] = [];
        const createdArr: {
            dayOfTheWeek: number;
            isClosed: boolean;
            openingTime: string | null;
            closingTime: string | null;
            isDeleted: boolean;
            stationID: number;
        }[] = [];

        daysWeek.forEach(day => {
            if (typeof day.rid === 'undefined') {
                createdArr.push({
                    dayOfTheWeek: day.dayOfTheWeek,
                    isClosed: day.isClosed,
                    openingTime: day.openingTime,
                    closingTime: day.closingTime,
                    isDeleted: day.isDeleted,
                    stationID: slug
                })
            } else {
                debugger;
                updatedArr.push({
                    dayOfTheWeek: day.dayOfTheWeek,
                    isClosed: isReset ? false : day.isClosed,
                    openingTime: isReset ? '' : day.openingTime,
                    closingTime: isReset ? '' : day.closingTime,
                    isDeleted: day.isDeleted,
                    rid: day?.rid
                })
            }
        });

        isReset = false
        setWorkingHours(createdArr, updatedArr);
    };
    const setWorkingHours = (
        createdWorkingHours: {
            dayOfTheWeek: number;
            isClosed: boolean;
            openingTime: string | null;
            closingTime: string | null;
            isDeleted: boolean;
            stationID: number;
        }[], updatedWorkingHours: {
            dayOfTheWeek: number;
            isClosed: boolean;
            openingTime: string | null;
            closingTime: string | null;
            isDeleted: boolean;
            rid: number;
        }[]) => {

        if (createdWorkingHours.length > 0) {
            const response = sendRequest('https://sharztestapi.azurewebsites.net/ServicePoint/AddWorkHours', JSON.stringify(createdWorkingHours))

            dispatch(
                showAlert({
                    message: response?.data?.message,
                    type: 'success',
                })
            );
            setTimeout(() => dispatch(hideAlert()), 5000);
        }

        if (updatedWorkingHours.length > 0) {
            const response = sendRequest('https://sharztestapi.azurewebsites.net/ServicePoint/UpdateWorkHours', JSON.stringify(updatedWorkingHours))
        };

    };
    const resetSelection = () => {
        setTimeout(() => {
            clearSelection();
            handleSubmit();
        }, 750);
    };

    const updateTimeSlotsForRange = (day: number, startHour: number, endHour: number, isSelected: boolean) => {
        setTimeSlots(currentSlots =>
            currentSlots.map(slot =>
                slot.day === day && slot.hour >= startHour && slot.hour <= endHour
                    ? { ...slot, isSelected }
                    : slot
            )
        );
    };
    const updateTimeSlotSelection = (slot: ITimeSlot, isSelected: boolean) => {
        setTimeSlots(currentSlots =>
            currentSlots.map(currentSlot =>
                currentSlot.day === slot.day && currentSlot.hour === slot.hour
                    ? { ...currentSlot, isSelected }
                    : currentSlot
            )
        );
    };

    useEffect(() => {
        getWorkingHours();
    }, []);

    return (
        <div className={`${sectionPrefix}-content-container flex flex-col py-4 items-end`}>
            <h3 className={`${sectionPrefix}-header text-lg font-semibold w-full text-center py-2`}>Kapali olmasini istediginiz saatleri seciniz</h3>
            <table className={`${sectionPrefix}-time-table`}>
                <thead>
                    <tr>
                        <th>Time / Day</th>
                        {daysOfWeek.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 24 }).map((_, hour) => (
                        <tr key={hour}>
                            <td className={`${sectionPrefix}-hour-label`}>{hour}:00</td>
                            {
                                daysOfWeek.map((_, dayIndex) => {
                                    const slot = timeSlots.find(slot => slot.day === dayIndex && slot.hour === hour);

                                    return (
                                        <td key={dayIndex}
                                            className={`${sectionPrefix}-time-slot ${slot?.isSelected ? 'selected' : ''} ${slot?.isPassive ? 'passive' : ''}`}
                                            onClick={() => slot && handleTimeSlotClick(slot)}
                                            data-wh-id={slot?.rid}
                                        >
                                        </td>
                                    );
                                })
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex items-center w-full justify-end action-container'>
                <Button buttonText={`Temizle`}
                    className={`${sectionPrefix}-button bg-primary text-white rounded-md px-4 py-2 my-2 w-fit mx-4`}
                    id='working-hours-reset-button'
                    type='button'
                    onClick={() => {
                        isReset = true;
                        resetSelection();
                    }}
                />
                <Button buttonText={isUpdated ? 'Guncelle' : 'Kaydet'}
                    className={`${sectionPrefix}-button bg-primary text-white rounded-md px-4 py-2 my-2 w-fit`}
                    id={`working-hours-${isUpdated ? 'update' : 'add'}-button`}
                    type='button'
                    onClick={() => handleSubmit()}
                />
            </div>
        </div>
    );
};

export default WorkingHoursContent;
