import React from 'react';
import styles from './Loading.module.css';

function Loading() {
  return (
    <div className={ styles.container }>
      <div className={ styles.lds_dual_ring } />
      <span>loading...</span>
    </div>
  );
}

export default Loading;
