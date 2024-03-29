import styles from './Tab.module.scss';

import {TabProps} from '@/types/user';

function Tab({tab, setTab}: TabProps) {
  return (
    <nav className={styles.container}>
      <div
        className={`${styles.target} ${tab === 'upcoming' ? styles.selected : ''}`}
        onClick={() => {
          setTab('upcoming');
        }}
      >
        다가오는 여행
      </div>
      <div
        className={`${styles.target} ${tab === 'outdated' ? styles.selected : ''}`}
        onClick={() => {
          setTab('outdated');
        }}
      >
        지난 여행
      </div>

      <div className={`${styles.bar} ${tab === 'upcoming' ? styles.left : styles.right}`}></div>
    </nav>
  );
}

export default Tab;
