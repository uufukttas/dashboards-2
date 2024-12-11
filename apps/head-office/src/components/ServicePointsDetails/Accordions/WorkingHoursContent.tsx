import { Button } from '@projects/button';
import React, { MouseEvent, useEffect, useState } from 'react';
import {
  useAddWorkingHoursMutation,
  useGetWorkingHoursMutation,
  useUpdateWorkingHoursMutation,
} from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import { DAYS } from '../constants';
import type {
  IPositionProps,
  IScheduleItemProps,
  ISelectedTimeByDayProps,
  ISelectedTimeProps,
  ITimeFromAPIProps,
  IWorkingHoursContentProps,
} from '../types';

const WorkingHoursContent: React.FC<IWorkingHoursContentProps> = ({ stationId }) => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [oldData, setOldData] = useState<ITimeFromAPIProps[]>([]);
  const [startPosition, setStartPosition] = useState<IPositionProps | null>(null);
  const [schedule, setSchedule] = useState<IScheduleItemProps[]>([]);

  const [addWorkingHours] = useAddWorkingHoursMutation();
  const [getWorkingHours] = useGetWorkingHoursMutation();
  const [updateWorkingHours] = useUpdateWorkingHoursMutation();

  const fillSelection = (
    startHourIndex: number,
    startDayIndex: number,
    endHourIndex: number,
    endDayIndex: number,
  ): void => {
    const updatedSchedule = schedule.map((hour, hourIndex) => {
      const newDays = hour.days.map((day, dayIndex) => {
        if (
          hourIndex === endHourIndex &&
          hourIndex === startHourIndex &&
          dayIndex >= Math.min(startDayIndex, endDayIndex) &&
          dayIndex <= Math.max(startDayIndex, endDayIndex)
        ) {
          return {
            selected: true,
            rid: day.rid,
          };
        } else if (
          dayIndex === startDayIndex &&
          dayIndex === endDayIndex &&
          hourIndex >= Math.min(startHourIndex, endHourIndex) &&
          hourIndex <= Math.max(startHourIndex, endHourIndex)
        ) {
          return {
            selected: true,
            rid: day.rid,
          };
        }

        return day;
      });

      return {
        ...hour,
        days: newDays,
      };
    });

    setSchedule(updatedSchedule);
  };
  const getSelectedTimes = (): ISelectedTimeProps[] => {
    const selectedTimesByDay: { [key: string]: ISelectedTimeByDayProps } = {};

    DAYS.forEach((day, dayIndex) => {
      selectedTimesByDay[day] = { startTime: null, endTime: null, rid: null };
      schedule.forEach((hour) => {
        const dayData = hour.days[dayIndex];

        if (dayData.selected) {
          if (selectedTimesByDay[day].startTime === null) {
            selectedTimesByDay[day].startTime = hour.time;
            selectedTimesByDay[day].rid = dayData.rid;
          }

          selectedTimesByDay[day].endTime = hour.time;
        }
      });
    });

    const formattedSelectedTimes: ISelectedTimeProps[] = Object.keys(selectedTimesByDay)
      .filter((day) => selectedTimesByDay[day].startTime !== null)
      .map((day) => ({
        day,
        startTime: selectedTimesByDay[day].startTime!,
        endTime: selectedTimesByDay[day].endTime!,
        rid: selectedTimesByDay[day].rid,
      }));

    return formattedSelectedTimes;
  };
  const getTimes = async (): Promise<void> => {
    try {
      const response = await getWorkingHours({ body: { stationId } });
      // @ts-ignore
      const getTimesByDay: ITimeFromAPIProps[] = response.data.data;
      const updatedSchedule = [...schedule];

      getTimesByDay.forEach((time) => {
        const dayIndex = time.DayOfTheWeek - 1;
        const endHourIndex = updatedSchedule.findIndex((item) => item.time === time.ClosingTime.slice(0, 5));
        const startHourIndex = updatedSchedule.findIndex((item) => item.time === time.OpeningTime.slice(0, 5));

        if (startHourIndex !== -1 && endHourIndex !== -1) {
          for (let i = startHourIndex; i <= endHourIndex; i++) {
            updatedSchedule[i].days[dayIndex] = { selected: true, rid: time.RID };
          }
        }
      });

      setDataLoaded(true);
      setOldData(getTimesByDay);
      setSchedule(updatedSchedule);
    } catch (error) {
      console.error('Error fetching times:', error);
    }
  };
  const handleMouseDown = (hourIndex: number, dayIndex: number, event: MouseEvent<HTMLTableCellElement>): void => {
    event.preventDefault();

    setIsSelecting(true);
    setStartPosition({ hourIndex, dayIndex });
    toggleSelection(hourIndex, dayIndex);
  };
  const handleMouseOver = (hourIndex: number, dayIndex: number): void => {
    if (isSelecting && startPosition) {
      fillSelection(startPosition.hourIndex, startPosition.dayIndex, hourIndex, dayIndex);
    }
  };
  const handleMouseUp = (): void => {
    setIsSelecting(false);
    setStartPosition(null);
  };
  const saveTimesToAPI = async (): Promise<void> => {
    const timesToSend = getSelectedTimes();
    const updatedDays = timesToSend.map((time) => time.day);
    const closedTimes = oldData
      .filter((time) => !updatedDays.includes(DAYS[time.DayOfTheWeek - 1]) && time.RID !== null)
      .map((time) => ({
        rid: time.RID,
        isClosed: true,
        openingTime: '00:00',
        closingTime: '00:00',
        isDeleted: true,
      }));

    if (timesToSend.length === 0 && closedTimes.length === 0) {
      console.log('No times selected.');
      return;
    }

    const addTimes = timesToSend
      .filter((time) => time.rid === null)
      .map((time) => ({
        stationID: stationId,
        dayOfTheWeek: DAYS.indexOf(time.day) + 1,
        openingTime: time.startTime,
        closingTime: time.endTime,
        isClosed: false,
        isDeleted: false,
      }));

    const updateTimes = timesToSend
      .filter((time) => time.rid !== null)
      .map((time) => ({
        rid: time.rid!,
        isClosed: false,
        openingTime: time.startTime,
        closingTime: time.endTime,
        isDeleted: false,
      }));

    try {
      if (addTimes.length > 0) {
        await addWorkingHours({ body: addTimes });
      }

      if (updateTimes.length > 0) {
        const updateResponse = await updateWorkingHours({ body: updateTimes });
        console.log('Update Response:', updateResponse.data);
      }

      if (closedTimes.length > 0) {
        const closedResponse = await updateWorkingHours({ body: updateTimes });
        console.log('Closed Response:', closedResponse.data);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  const toggleSelection = (hourIndex: number, dayIndex: number): void => {
    const updatedSchedule = [...schedule];
    updatedSchedule[hourIndex].days[dayIndex] = {
      selected: !updatedSchedule[hourIndex].days[dayIndex].selected,
      rid: updatedSchedule[hourIndex].days[dayIndex].rid,
    };

    setSchedule(updatedSchedule);
  };

  useEffect(() => {
    const initializeSchedule = () => {
      const hours: string[] = [];

      for (let hour = 0; hour < 24; hour++) {
        for (let min = 0; min < 60; min += 30) {
          hours.push(`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
        }
      }

      const newSchedule: IScheduleItemProps[] = hours.map((time) => ({
        time,
        days: new Array(DAYS.length).fill({ selected: false, rid: null }),
      }));

      setSchedule(newSchedule);
    };

    initializeSchedule();
  }, []);

  useEffect(() => {
    if (schedule.length > 0 && !dataLoaded) {
      getTimes();
    }
  }, [schedule, dataLoaded]);

  return (
    <div className="bg-white">
      <h1 className="text-center w-full">Haftalık Çalışma Saatleri Seçimi</h1>
      <p className="text-center w-full m-4">Kapalı Çalışma saatlerini seçmek için tıklayıp sürükleyin.</p>
      <table className="working-hours-time-table">
        <thead>
          <tr>
            <th>Saat / Gün</th>
            {DAYS.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedule.map((hour, hourIndex) => (
            <tr key={hourIndex}>
              <td>{hour.time}</td>
              {hour.days.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  data-wh-id={day.rid}
                  className={day.selected ? 'selected' : ''}
                  onMouseDown={(e) => handleMouseDown(hourIndex, dayIndex, e)}
                  onMouseOver={() => handleMouseOver(hourIndex, dayIndex)}
                  onMouseUp={handleMouseUp}
                >
                  {/* {day.selected ? '  ' : ' '}  Hücrelerdeki içeriği göster */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        className={`sh-working-hours-save-button bg-primary text-white rounded-md px-4 py-2 my-4 mx-auto justify-end items-end w-full`}
        id={`sh-working-hours-save-button`}
        type={'submit'}
        onClick={saveTimesToAPI}
      >
        Kaydet
      </Button>
    </div>
  );
};

export default WorkingHoursContent;
