import styles from "./menu.module.css";
import { useRef, useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Co_tower_panel from "./props/tower_panel/tower_panel";

function Co_menu() {
    const navigate = useNavigate();

    const [currentRank, setCurrentRank] = useState("D");
    const [isChangeRankReady, setIsChangeRankReady] = useState(false);

    const ranks_D_buttonRef = useRef(null);
    const ranks_C_buttonRef = useRef(null);
    const ranks_B_buttonRef = useRef(null);
    const ranks_A_buttonRef = useRef(null);
    const ranks_S_buttonRef = useRef(null);

    const [towers, setTowers] = useState([]);
    const fetchTowerData = useCallback(async () => {
        try {
            const res = await axios.get(`/api/v1/towers/ranks/${currentRank}`);
            setTowers(res.data.rankTowersData); // Axios auto-parses JSON
            setIsChangeRankReady(true);
        } catch (err) {
            console.error("Failed to fetch towers:", err.message);
        }
    }, [currentRank]);

    const handleRankButton = (rank) => {
        if (!isChangeRankReady || currentRank == rank) return;
        setIsChangeRankReady(false);

        setCurrentRank(rank);
    };

    const handleLogout = () => {
        // todo logout user
        localStorage.removeItem("token");
        localStorage.removeItem("user");


        navigate("/pages/login");
    };

    useEffect(() => {
        ranks_D_buttonRef.current.classList.remove(styles.selected);
        ranks_C_buttonRef.current.classList.remove(styles.selected);
        ranks_B_buttonRef.current.classList.remove(styles.selected);
        ranks_A_buttonRef.current.classList.remove(styles.selected);
        ranks_S_buttonRef.current.classList.remove(styles.selected);

        if (currentRank == "D") {
            ranks_D_buttonRef.current.classList.add(styles.selected);
        } else if (currentRank == "C") {
            ranks_C_buttonRef.current.classList.add(styles.selected);
        } else if (currentRank == "B") {
            ranks_B_buttonRef.current.classList.add(styles.selected);
        } else if (currentRank == "A") {
            ranks_A_buttonRef.current.classList.add(styles.selected);
        } else if (currentRank == "S") {
            ranks_S_buttonRef.current.classList.add(styles.selected);
        }

        fetchTowerData();
    }, [currentRank, fetchTowerData]);

    return (
        <div className={styles.main_menu}>
            <div className={styles.menu_top}>
                <FontAwesomeIcon
                    icon="fa-solid fa-right-from-bracket"
                    className={styles.icon}
                    onClick={handleLogout}
                />
            </div>

            <div className={styles.menu_body}>
                <div className={styles.ranks}>
                    <button
                        type="button"
                        ref={ranks_D_buttonRef}
                        onClick={() => handleRankButton("D")}
                    >
                        D
                    </button>

                    <button
                        type="button"
                        ref={ranks_C_buttonRef}
                        onClick={() => handleRankButton("C")}
                    >
                        C
                    </button>

                    <button
                        type="button"
                        ref={ranks_B_buttonRef}
                        onClick={() => handleRankButton("B")}
                    >
                        B
                    </button>

                    <button
                        type="button"
                        ref={ranks_A_buttonRef}
                        onClick={() => handleRankButton("A")}
                    >
                        A
                    </button>

                    <button
                        type="button"
                        ref={ranks_S_buttonRef}
                        onClick={() => handleRankButton("S")}
                    >
                        S
                    </button>
                </div>

                <div className={styles.menu_main}>
                    {towers.map((tower) => (
                        // console.log("towerId passed:", tower._id),
                        <Co_tower_panel
                            key={tower._id}
                            towerId={tower._id}
                            tower_icon={tower.tower_icon}
                            name={tower.name}
                            placement_price={tower.placement_price}
                            unlock_price={tower.unlock_price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Co_menu;
