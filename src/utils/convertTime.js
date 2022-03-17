import moment from 'moment';
export const convertMySqlTime=(value)=>{
   return moment(value).format("YYYY-MM-DD")

}
export const convertTime=(value)=>{
   return moment(value).format('DD-MM-YYYY')

}
export const isDateBeforeToday=(date)=> {
   return new Date(date) < new Date(new Date());
}