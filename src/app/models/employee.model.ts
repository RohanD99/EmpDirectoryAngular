export class Employee { 
    firstname: string;
    lastname: string;
    designation: string;
    department: string;
    mobile: string;
    mailId: string;
    location: string;
    skypeId: string;
   
    constructor(  
      firstname: string,
      lastname: string,
      designation: string,
      department: string,
      mobile: string,
      mailId: string,
      location: string,
      skypeId: string,
    ) 
    {
      this.firstname = firstname;
      this.lastname = lastname;
      this.designation = designation;
      this.department = department;
      this.mobile = mobile;
      this.mailId = mailId;
      this.location = location;
      this.skypeId = skypeId;
    }
  }
  