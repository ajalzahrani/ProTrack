import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import useUserBodyMeasureStore from 'src/store/useUserBodyMeasureStore';
import {convertWeight} from 'src/utility/unitconversion';
import {convertHeight} from 'src/utility/unitconversion';

// Metric system or the International System of Units (SI). In this system, the unit of weight or mass is the kilogram (kg).

// Imperial system or the United States customary units. In this system, the unit of weight or mass is the pound (lb).

export default function useUnit() {
  const bm = useUserBodyMeasureStore(s => s.bodyMeasurements);
  const setWeight = useUserBodyMeasureStore(s => s.setWeight);
  const setHeight = useUserBodyMeasureStore(s => s.setHeight);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setWeight(convertWeight(bm.weight, bm.metric).toFixed(1));
    setHeight(convertHeight(bm.height, bm.metric).toFixed(1));
  }, [bm.metric]);
}
