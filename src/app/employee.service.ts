import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeData: object[] = [

  ]


  getAllEmployeeData(id) {
    return this.http.get(`http://localhost:8080/manager-employee-assignment/api/v1.0/employees/` + id).toPromise().then((response) => {
      if (response != null) {
        console.log("res", response)
        return response;
      }
      else {
        console.log('ERROR IN getAllEmployeeData() service');
        return null;
      }
    });
  }

  deleteEmployee(id) {
    return this.http.delete('http://localhost:8080/manager-employee-assignment/api/v1.0/delete/employee/' + id).toPromise().then((response) => {
      if (response != null) {
        return response;
      } else {
        console.log('Error in deleteEmployee() service');
        return null;
      }
    })
  }

  addEmployeeData(data) {
    // this.employeeData.push(data);
    if (data.employeeId) {
      {
        return this.http.put('http://localhost:8080/manager-employee-assignment/api/v1.0/update/employee/' + data.employeeId, data).toPromise().then((response) => {
          if (response != null) {
            return response;
          }
          else {
            console.log('Error in edit Employee Data service');
            return null;
          }
        });
      }
    } else {
      return this.http.post(`http://localhost:8080/manager-employee-assignment/api/v1.0/create/employee`, data).toPromise().then((response) => {
        if (response != null) {
          return response;
        }
        else {
          console.log('Error in addEmployeeData service');
          return null;
        }
      });
    }
  }



  constructor(private http: HttpClient) { }
}
