export class Employee {
  id: number;
  firstname: string;
  lastname: string;
  designation: string;
  department: string;
  mobile: string;
  mailId: string;
  location: string;
  skypeId: string;
  preferredName: string; // Add the preferredName property

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    designation: string,
    department: string,
    mobile: string,
    mailId: string,
    location: string,
    skypeId: string
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.designation = designation;
    this.department = department;
    this.mobile = mobile;
    this.mailId = mailId;
    this.location = location;
    this.skypeId = skypeId;
    this.preferredName = `${firstname} ${lastname}`; // Set preferredName
  }
}
