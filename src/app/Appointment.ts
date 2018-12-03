
export class Appointment {

      message : String;
      uid : String;
      type : String;
      date : String;
      hospitalName: String;
      status : String;
      userName : String;
      key : String;

      constructor(message? : String, uid? : String, type? : String, date? : String, hn? : String, st? : String,
        un? : String, key? : String){

            this.message = message;
            this.uid = uid;
            this.type = type;
            this.date = date;
            this.hospitalName = hn;
            this.status = st;
            this.userName = un;
            this.key = key;
      }
    
}