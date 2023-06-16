// import {scheduleData} from 'src/assets/dummy';
// get today object from Schedule main object
export function getTodayObject() {
  let date = new Date();
  date.setDate(date.getDate()); // get today or add or min
  const todayName = date.toLocaleDateString('en-us', {weekday: 'long'}); // get day name

  // very efficant way to pick day instead of array fuck
  let todayObj = {};
  // for (let i = 0; i < scheduleData.length; i++) {
  //   if (scheduleData[i].day === todayName) {
  //     todayObj = scheduleData[i];
  //   }
  // }

  return todayObj;
}
