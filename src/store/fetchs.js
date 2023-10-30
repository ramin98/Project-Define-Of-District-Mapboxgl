import  {
    getCards,
    getUser,
    getFooterMenu,
    getFormSettings,
    getIstanbulNufus,
    getMenu,
    getSettings,
    getAllPieCharts,
    getListOfResults,
    getTop10Desc,
    getTop10Asc
  } from './reducer';

export const fetchCards = () => (dispatch) =>
  fetch("data/cards.json")
    .then((res) => res.json())
    .then((data) => dispatch(getCards(data)));

export const fetchUser = () => (dispatch) =>
  fetch("data/user.json")
    .then((res) => res.json())
    .then((data) => dispatch(getUser(data)));

export const fetchFooterMenu = () => (dispatch) =>
  fetch("data/footer-menu.json")
    .then((res) => res.json())
    .then((data) => dispatch(getFooterMenu(data)));

export const fetchFormSettings = () => (dispatch) =>
  fetch("data/form-settings.json")
    .then((res) => res.json())
    .then((data) => dispatch(getFormSettings(data)));

export const fetchIstanbulNufus = () => (dispatch) =>
  fetch("data/istanbul-nufus-geojson.geojson")
    .then((res) => res.json())
    .then((data) => dispatch(getIstanbulNufus(data)));

export const fetchMenu = () => (dispatch) =>
  fetch("data/menu.json")
    .then((res) => res.json())
    .then((data) => dispatch(getMenu(data)));

export const fetchSettings = () => (dispatch) =>
  fetch("data/settings.json")
    .then((res) => res.json())
    .then((data) => dispatch(getSettings(data)));

export const fetchAllPieCharts = () => (dispatch) =>
  fetch("data/3-item-view/all-pie-chart.json")
    .then((res) => res.json())
    .then((data) => dispatch(getAllPieCharts(data)));

export const fetchListOfResults = () => (dispatch) =>
  fetch("data/3-item-view/list-of-results.json")
    .then((res) => res.json())
    .then((data) => dispatch(getListOfResults(data)));

export const fetchTop10Desc = () => (dispatch) =>
  fetch("data/3-item-view/top-10-desc.json")
    .then((res) => res.json())
    .then((data) => dispatch(getTop10Desc(data)));

    export const fetchTop10Asc = () => (dispatch) =>
  fetch("data/3-item-view/top-10-ascending.json")
    .then((res) => res.json())
    .then((data) => dispatch(getTop10Asc(data)));