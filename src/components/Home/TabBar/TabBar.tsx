import {AiOutlineBell} from 'react-icons/ai';
import {Link} from 'react-router-dom';

import styles from './TabBar.module.scss';

import {useGetAlarm} from '@/hooks/Notification/useNotification';

import SearchIcon from '@/assets/homeIcons/home/searchIcon.svg?react';

import {Alarmprop} from '@/types/alarm';

function TabBar({onAlarmOpen, isAlarmOpen}: Alarmprop) {
  const news = localStorage.getItem('news');
  const {data: AlarmData} = useGetAlarm(isAlarmOpen);

  if (AlarmData?.data.data.notificationDetail[0]) {
    localStorage.setItem('news', 'true');
  }

  return (
    <div className={styles.container}>
      <div className={styles.icons}>
        <Link to='/search'>
          <SearchIcon style={{textAlign: 'center', paddingTop: '2px', width: '24px'}} />
        </Link>
        <button onClick={onAlarmOpen} className={styles.icons__wrapper}>
          <AiOutlineBell />
          {news && <div className={styles.icons__wrapper__eclips} />}
        </button>
      </div>
    </div>
  );
}

export default TabBar;
