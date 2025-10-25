import styles from './App.module.css';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();
  const box_leftRef = useRef(null);
  const box_rightRef = useRef(null);

  const [isNavigating, setIsNavigating] = useState(false);

  const handleLoginNavigate = () => {
    if (isNavigating == false) {
      setIsNavigating(true);

      box_leftRef.current.classList.add(styles.hidden);
      box_rightRef.current.classList.add(styles.fullScreen);
      
      setTimeout(() => {
        navigate('/pages/login')
      }, 2000);
    }
  }

  return (
    <div className={styles.main_App}>
      <div className={styles.box_left} ref={box_leftRef}>
        <img 
          src="https://boimaawsbucket.s3.ap-southeast-2.amazonaws.com/temp_assets/welcome_panel1.png" 
          alt="a welcome image">
        </img>
      </div>

      <div className={styles.box_right} ref={box_rightRef}>
        <button type="button"
          onClick={handleLoginNavigate}
        >Sign up cuz yes</button>
      </div>
    </div>
  )
}

export default App