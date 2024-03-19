import './Calendar.scss';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface SessionProps {
    id: number;
    description: string;
    score: number;
    date: string;
    sport_id: number;
    sport: {
        name: string;
        unit: string;
    };
}

interface CalendarProps {
    sessions: SessionProps[];
    selectedDate: Date;
    onChange: (date: Date) => void;
}

const Calendar = ({sessions, selectedDate, onChange}: CalendarProps) => { 

    //Highlight days in calendar
    const tileClassName = ({ date, view }: { date: Date; view: string }) => {

        //Check if each date is today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const isToday = date.getTime() === today.getTime(); //date is call for each day in the calendar to check if it's today

        //Check if each date has at least one session
        const sessionDate = date.getFullYear() + '-' +
            String(date.getMonth() + 1).padStart(2, '0') + '-' +
            String(date.getDate()).padStart(2, '0');
        const isSessionInDate = sessions.some(session => session.date === sessionDate); 

        //Return class name for each calendar tile 
        if (isToday && view === 'month') {
            return isSessionInDate ? 'session-active today' : 'today'; //if today has at least one session, add session-active class
        } else {
            return isSessionInDate ? 'session-active' : null; //if date has at least one session, add session-active class
        }
    };

    return (
        <ReactCalendar
            onClickDay={onChange}
            value={selectedDate}
            tileClassName={tileClassName}
            className={'maxrep-calendar'}
        />
    );
}

export default Calendar