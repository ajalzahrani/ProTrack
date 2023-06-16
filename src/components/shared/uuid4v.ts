import uuid from 'react-native-uuid';

export default function uuidv4(): string {
  const stringUuid = uuid.v4({
    random: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  });
  // return stringUuid.toString(); // "7b896a6a-1e2f-411e-9fb9-f8ccf2c20a1d"
  return parseInt(Math.random().toString().substring(5)).toString();
}
