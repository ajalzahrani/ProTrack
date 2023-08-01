import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import useUserBodyMeasureStore from 'src/store/useUserBodyMeasureStore';
import {convertWeight, convertHeight} from 'src/utility/unitconversion';

// Metric system or the International System of Units (SI). In this system, the unit of weight or mass is the kilogram (kg).

// Imperial system or the United States customary units. In this system, the unit of weight or mass is the pound (lb).

export default function useUnit() {
  const bm = useUserBodyMeasureStore(s => s.bodyMeasurements);
  const setWeight = useUserBodyMeasureStore(s => s.setWeight);
  const setHeight = useUserBodyMeasureStore(s => s.setHeight);

  const firstUpdate = useRef(true);
  const metricRef = useRef(bm.metric);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (bm.metric !== metricRef.current) {
      setWeight(convertWeight(bm.weight, bm.metric).toFixed(1));
      setHeight(convertHeight(bm.height, bm.metric).toFixed(1));
      metricRef.current = bm.metric;
      // bm.metric = metricRef.current;
      console.log('useUnit: ', bm.metric);
      console.log('weight: ', bm.weight);
      console.log('height: ', bm.height);
    }
  }, [bm.metric]);
}
