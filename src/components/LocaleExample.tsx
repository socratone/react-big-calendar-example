import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/dist/locale/ko';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const LocaleExample = () => {
  return (
    <div style={{ width: '1000px' }}>
      <Calendar
        messages={{
          week: '주',
          day: '일',
          month: '월',
          previous: '이전',
          next: '다음',
          today: '오늘',
          agenda: '아젠다',
          tomorrow: '내일',
          yesterday: '어제',
          showMore: (total) => `+${total} 더보기`,
        }}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={[
          {
            start: moment().toDate(),
            end: moment().add(1, 'days').toDate(),
            title: 'Some title',
          },
        ]}
        style={{ height: '100vh' }}
      />
    </div>
  );
};

export default LocaleExample;
