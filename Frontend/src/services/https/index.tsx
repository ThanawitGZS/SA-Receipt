import { EmployeeInterface } from "../../interfaces/Employee";
import { LoginInterface } from "../../interfaces/Login";
import { MemberInterface } from "../../interfaces/Member";
import axios from "axios";
import { ReceiptInterface } from "../../interfaces/Receipt";

const apiUrl = "http://localhost:8000";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};

async function SignIn(data: LoginInterface) {
  return await axios
    .post(`${apiUrl}/signIn`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateEmployee(data: EmployeeInterface) {
  return await axios
    .post(`${apiUrl}/employee`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetEmployees() {
  return await axios
    .get(`${apiUrl}/employees`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetEmployeeByID(id: string | undefined) {
  return await axios
    .get(`${apiUrl}/employee/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateEmployee(id: string | undefined, data: EmployeeInterface) {
  return await axios
    .patch(`${apiUrl}/employee/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteEmployeeByID(id: string | undefined) {
  return await axios
    .delete(`${apiUrl}/employee/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateMember(data: MemberInterface) {
  return await axios
    .post(`${apiUrl}/member`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetMembers() {
  return await axios
    .get(`${apiUrl}/members`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetMemberByID(id: string | undefined) {
  return await axios
    .get(`${apiUrl}/member/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateMember(id: string | undefined, data: MemberInterface) {
  return await axios
    .patch(`${apiUrl}/member/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteMemberByID(id: string | undefined) {
  return await axios
    .delete(`${apiUrl}/member/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
  }
  
async function CheckMembers(phonenumber: string) {
  return await axios
  .post(`${apiUrl}/api/check-member/${phonenumber}`, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
}

async function GetGenders() {
  return await axios
    .get(`${apiUrl}/genders`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetPositions() {
  return await axios
    .get(`${apiUrl}/positions`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetRanks() {
  return await axios
  .get(`${apiUrl}/ranks`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetReceipts() {
  return await axios
  .get(`${apiUrl}/receipt`, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
}

async function CreateReceipt(data: ReceiptInterface) {
  return await axios
    .post(`${apiUrl}/receipt`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetTablebys() {
  return await axios
  .get(`${apiUrl}/table`, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
}

async function GetBookingByID(id: string) {
  return await axios
  .get(`${apiUrl}/booking/${id}`, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
}

async function CheckCoupons(code: string) {
  return await axios
  .post(`${apiUrl}/api/check-coupon/${code}`, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
}


export {
  SignIn,
  CreateEmployee,
  GetEmployees,
  GetEmployeeByID,
  UpdateEmployee,
  DeleteEmployeeByID,
  CreateMember,
  GetMembers,
  GetMemberByID,
  CheckMembers,
  UpdateMember,
  DeleteMemberByID,
  GetGenders,
  GetPositions,
  GetRanks,
  GetReceipts,
  CreateReceipt,
  GetTablebys,
  GetBookingByID,
  CheckCoupons
};