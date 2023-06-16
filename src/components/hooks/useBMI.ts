import {useEffect, useMemo, useState} from 'react';
import useUserBodyMeasureStore from 'src/store/useUserBodyMeasureStore';
import {convert} from 'src/utility/unitconversion';

export default function useBMI() {
  const bm = useUserBodyMeasureStore(s => s.bodyMeasurements);
  const setBmi = useUserBodyMeasureStore(s => s.setBmi);
  useEffect(() => {
    if (bm.weight !== undefined && bm.height !== undefined) {
      if (bm.metric == 'metric') {
        const heightInMeter = convert(parseFloat(bm.height)).from('cm').to('m');
        const newBmi = parseFloat(bm.weight) / Math.pow(heightInMeter, 2);
        setBmi(newBmi.toFixed(1));
      } else {
        const newBmi =
          703 *
          (parseFloat(bm.weight) /
            Math.pow(convert(parseFloat(bm.height)).from('ft').to('in'), 2));
        console.log('bmi: ', newBmi);
        setBmi(newBmi.toFixed(1));
      }
    }
  }, [bm.weight, bm.height]);
}
