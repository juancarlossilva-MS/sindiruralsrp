/*!

=========================================================
* * NextJS Material Dashboard v1.1.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import AccountBalance from "@material-ui/icons/AccountBalance";
import HomeWork from "@material-ui/icons/HomeWork";
import Unarchive from "@material-ui/icons/Unarchive";
import Museum from "@material-ui/icons/Museum";
import Web from "@material-ui/icons/Web";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import EmojiPeople from "@material-ui/icons/EmojiPeople";

const dashboardRoutes = [
  {
    path: "/noticias",
    name: "Noticias",
    rtlName: "لوحة القيادة",
    icon: Web,

    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Usuários",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,

    layout: "/admin",
  },
  {
    path: "/table-list",
    name: "Classificados",
    rtlName: "قائمة الجدول",
    icon: AddShoppingCart,

    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Diretoria",
    rtlName: "طباعة",
    icon: People,

    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Funcionários",
    rtlName: "الرموز",
    icon: EmojiPeople,

    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Estrutura Física",
    rtlName: "خرائط",
    icon: AccountBalance,

    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Empresas Parceiras",
    rtlName: "إخطارات",
    icon: HomeWork,

    layout: "/admin",
  },
  {
    path: "/rtl-page",
    name: "Mercado",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Museum,

    layout: "/rtl",
  },

];

export default dashboardRoutes;
