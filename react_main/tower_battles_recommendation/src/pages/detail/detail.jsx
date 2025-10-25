import styles from './detail.module.css';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

import scoutImg from '~/src/assets/images/Scout.webp';
import creditsIconImg from '~/src/assets/images/CreditsIcon.png';


function Co_detail() {

    const navigate = useNavigate();
    const { towerId } = useParams();

    const [tower_description, setTower_description] = useState('tower_description');
    const [tower_name, setTower_name] = useState('tower_name');
    const [tower_icon, setTower_icon] = useState(scoutImg);
    const [placement_price, setPlacement_price] = useState(0);
    const [unlock_price, setUnlock_price] = useState(0);
    const [pair_with, setPair_with] = useState([]);

    const handleTurnBack = () => {
        navigate('/pages/menu');
    };

    const fetchTowerData = useCallback(async () => {
        try {
            // console.log(`towerId in detail: ${towerId}`);
            const res = await axios.get(`/api/v1/towers/detail/${towerId}`);

            setTower_name(res.data.detailTowerData.name);
            setTower_description(res.data.detailTowerData.description);
            setTower_icon(res.data.detailTowerData.tower_icon);
            setPlacement_price(res.data.detailTowerData.placement_price);
            setUnlock_price(res.data.detailTowerData.unlock_price);

            const newPairWith = res.data.detailTowerData.pair_with;

            // check if pair_with has any elements
            if (newPairWith.length > 0) {
                const list = newPairWith.join(",");
                const res2 = await axios.get(`/api/v1/towers/names?list=${list}`);
                setPair_with(res2.data.towersMatchName);
            }

        } catch (err) {
            console.error("Failed to fetch towers:", err.message);
        }
    }, [towerId]);

    useEffect(() => {
        fetchTowerData();
    }, [fetchTowerData]);

    return(
        <div className={styles.main_detail}>
            <div className={styles.menu_top}>
                <FontAwesomeIcon icon="fa-solid fa-left-long" 
                    className={styles.icon} 
                    onClick={handleTurnBack}
                />
            </div>

            <div className={styles.menu_body}>
                <div className={styles.menu_main}>
                    <div className={styles.details}>
                        <p className={styles.tower_description}>{tower_description}</p>

                        <div className={styles.details_stats}>
                            <p className={styles.tower_name}>{tower_name}</p>
                            <p className={styles.placement_price}>${placement_price}</p>

                            <div className={styles.credit_section}>
                                <img src={creditsIconImg} alt="credits icon" className={styles.credits_icon} />
                                <p className={styles.unlock_price}>{unlock_price}</p>
                            </div>
                        </div>

                        {/* scoutImg placeholder icon for now */}
                        <img src={tower_icon} alt="tower icon" className={styles.tower_icon} />
                    </div>

                    <div className={styles.best_pair_with}>
                        <p>Best pair with:</p>

                        {pair_with.map((pairTower) => (
                            <img
                                key={pairTower._id}
                                src={pairTower.tower_icon}
                                alt={pairTower.name}
                                className={styles.tower_pair_icon}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Co_detail