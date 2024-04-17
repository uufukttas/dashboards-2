// File: TimeSchedule.tsx
import { Button } from '@projects/button';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IWorkingHoursContentProps } from '../types';

interface TimeSlot {
    rid?: number; // Add the missing rid property
    day: number;
    hour: number;
    isSelected: boolean;
    isSelectable: boolean;
    isPassive: boolean; // Add the missing isPassive property
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const WorkingHoursContent = ({ slug }: IWorkingHoursContentProps) => {
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(() =>
        Array.from({ length: 7 * 24 }).map((_, index) => ({
            day: Math.floor(index / 24),
            hour: index % 24,
            isSelected: false,
            isPassive: false, // Initially no slots are passive
            isSelectable: true // Add the missing isSelectable property
        }))
    );
    const [isUpdated, setIsUpdated] = useState(false); // Add the missing isUpdated state
    const [selectionStart, setSelectionStart] = useState<TimeSlot | null>(null);

    const getWorkingHours = () => {
        axios
            .post(
                'https://sharztestapi.azurewebsites.net/ServicePoint/GetWorkHours',
                JSON.stringify({ "stationID": slug }),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then(response => {
                applyDefaultTimes(response.data)

                if (response.data.length > 0) {
                    setIsUpdated(true);
                }
            })
            .catch(error => console.log(error));
    }

    const handleTimeSlotClick = (clickedSlot: TimeSlot) => {
        if (clickedSlot.isPassive) return; // Ignore click if the slot is passive

        // Check if we are currently in a selection process
        if (selectionStart) {
            if (clickedSlot.day === selectionStart.day) {
                if (clickedSlot.hour === selectionStart.hour) {
                    // Deselect if the same slot is clicked again
                    updateTimeSlotSelection(clickedSlot, false);
                    setSelectionStart(null);
                } else {
                    // Complete the range selection
                    completeRangeSelection(selectionStart, clickedSlot);
                    setSelectionStart(null); // Reset after completing range
                }
            } else {
                // Deselect previous range and start new
                clearSelection();
                setSelectionStart(clickedSlot);
                updateTimeSlotSelection(clickedSlot, true);
            }
        } else {
            // No current selection, start a new one
            setSelectionStart(clickedSlot);
            updateTimeSlotSelection(clickedSlot, true);
        }
    };

    const completeRangeSelection = (startSlot: TimeSlot, endSlot: TimeSlot) => {
        // Ensure we select from the earlier to the later hour
        const startHour = Math.min(startSlot.hour, endSlot.hour);
        const endHour = Math.max(startSlot.hour, endSlot.hour);
        const day = startSlot.day;
        updateTimeSlotsForRange(day, startHour, endHour, true);
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

    const updateTimeSlotSelection = (slot: TimeSlot, isSelected: boolean) => {
        setTimeSlots(currentSlots =>
            currentSlots.map(s =>
                s.day === slot.day && s.hour === slot.hour
                    ? {
                        ...s, isSelected
                    } : s
            )
        );
    };



    const clearSelection = () => {
        setTimeSlots(currentSlots =>
            currentSlots.map(slot => ({
                ...slot,
                isSelected: false
            }))
        );
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

        if (createdWorkingHours.length > 0)
            axios
                .post(
                    'https://sharztestapi.azurewebsites.net/ServicePoint/AddWorkHours',
                    JSON.stringify(createdWorkingHours),
                    { headers: { 'Content-Type': 'application/json' } }
                )
                .then((response) => { console.log(response.data); })
                .catch((error) => {
                    console.log(error);
                }
                );

        if (updatedWorkingHours.length > 0)
            axios
                .post(
                    'https://sharztestapi.azurewebsites.net/ServicePoint/UpdateWorkHours',
                    JSON.stringify(updatedWorkingHours),
                    { headers: { 'Content-Type': 'application/json' } }
                )
                .then((response) => { console.log(response.data); })
                .catch((error) => {
                    console.log(error);
                }
                );
    };

    const handleSubmit = () => {
        const daysWeek = daysOfWeek.map((_, dayIndex) => {
            const dailySelectedSlots = timeSlots.filter(slot => slot.day === dayIndex && slot.isSelected);
            const firstSelectedSlot = dailySelectedSlots.length > 0 ? dailySelectedSlots[0] : null;
            const lastSelectedSlot = dailySelectedSlots.length > 0 ? dailySelectedSlots[dailySelectedSlots.length - 1] : null;

            return {
                dayOfTheWeek: dayIndex,
                isClosed: dailySelectedSlots.length === 0,
                openingTime: firstSelectedSlot ? `${firstSelectedSlot.hour}:00` : null,
                closingTime: lastSelectedSlot ? `${lastSelectedSlot.hour}:00` : null,
                isDeleted: false,
                rid: firstSelectedSlot?.rid
            };
        }).filter(day => day.openingTime !== null && day.closingTime !== null);  // Filter out days where times are null

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
                updatedArr.push({
                    dayOfTheWeek: day.dayOfTheWeek,
                    isClosed: day.isClosed,
                    openingTime: day.openingTime,
                    closingTime: day.closingTime,
                    isDeleted: day.isDeleted,
                    rid: day?.rid
                }
                )
            }
        });
        setWorkingHours(createdArr, updatedArr);
    };
    // Parse and apply default times from the response
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
                newTimeSlots[index].isSelected = true; // Set selected based on default times
                newTimeSlots[index].rid = rid; // Set the rid for the time slot
            }
        });

        setTimeSlots(newTimeSlots); // Update state with the modified time slots
    };

    // Example of using this function after fetching data (you should call this in useEffect if fetching from API)
    useEffect(() => {
        getWorkingHours();
    }, []);

    return (
        <div className='working-hours-content-container py-4'>
            <table className="time-table">
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
                            <td className="hour-label">{hour}:00</td>
                            {daysOfWeek.map((_, dayIndex) => {
                                const slot = timeSlots.find(slot => slot.day === dayIndex && slot.hour === hour);
                                return (
                                    <td key={dayIndex}
                                        className={`time-slot ${slot?.isSelected ? 'selected' : ''} ${slot?.isPassive ? 'passive' : ''}`}
                                        onClick={() => slot && handleTimeSlotClick(slot)}
                                        data-wh-id={slot?.rid}
                                    >
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            <Button buttonText={isUpdated ? 'Guncelle' : 'Kaydet'}
                className='bg-primary text-white rounded-md px-4 py-2'
                id='working-hours-save-button'
                type='button'
                onClick={() => handleSubmit()}
            />
        </div>
    );
};

export default WorkingHoursContent;
