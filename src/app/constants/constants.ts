export const NAME_PATTERN = '[A-Za-z]+';
export const EMAIL_PATTERN = '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}';

export function noEmpMsg(this: any){
    if (this.filtereddEmployees.length === 0) {
        this.noEmployeesMessage = 'No employees found!!';
      } else {
        this.noEmployeesMessage = '';
      }
}