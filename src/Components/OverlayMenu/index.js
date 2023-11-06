import React from "react";
import Nav from "../Nav";
import styles from "./styles.module.scss";
import Button from "../Elements/Button";
import { useOverlayContext } from "../../Context/OverlayContext";

export default function OverlayMenu() {
  const {overlayState, setOverlayState} = useOverlayContext();
  
  const handleBtnClick = ()=>{
    setOverlayState({...overlayState, isOpen: false})
  }
  if(overlayState.isOpen){
    return (
      <aside className={styles.overlayMenu} >
        <div className= {styles.overlayHeader}>
            <h1>Little Lemon</h1>
        </div>
        <div className={styles.closeButton} onClick={handleBtnClick}>X</div>
        
        <div onClick={()=>{setOverlayState({isOpen:false})}}>
          <Nav position="overlay" />
        </div>
      </aside>
    );
  }
  
}
