import configureMeasurements, {allMeasures} from 'convert-units';
export const convert = configureMeasurements(allMeasures);

// TODO: adjuste the use of convert-units lib

export function convertWeight(weight: string, sys: string) {
  let w = parseFloat(weight);
  if (sys === 'imperial') {
    // return cvtKgToLb(w);
    return convert(w).from('kg').to('lb');
  } else {
    // return cvtLbToKg(w);
    return convert(w).from('lb').to('kg');
  }
}

export function convertHeight(height: string, sys: string) {
  const h = parseFloat(height);
  if (sys === 'imperial') {
    // return cvtCmToFoot(h);
    return convert(h).from('cm').to('ft');
  } else {
    // return cvtFootToCm(h);
    return convert(h).from('ft').to('cm');
  }
}
