import { createSlice } from "@reduxjs/toolkit";

const objectSlice = createSlice({
  name: "objects",
  initialState: {
    cards: [],
    user: {},
    footermenu: [],
    settings: {},
    menu: [],
    istanbulNufus: {},
    formSettings: {},
    allPieCharts: {},
    listOfResults: {},
    top10Desc: {},
    top10Asc: {},
  },
  reducers: {
    addCards: (state, action) => {
      let newArr = [...state.cards];
      newArr.push(action.payload);
      return { ...state, cards: newArr };
    },
    getCards: (state, action) => {
      return { ...state, cards: action.payload };
    },
    getUser: (state, action) => {
      return { ...state, user: action.payload };
    },
    getFooterMenu: (state, action) => {
      return { ...state, footermenu: action.payload };
    },
    getFormSettings: (state, action) => {
      return { ...state, formSettings: action.payload };
    },
    getIstanbulNufus: (state, action) => {
      const coordinates = JSON.parse(JSON.stringify(action.payload));

      const colors = { red: "red", yellow: "yellow", orange: "orange" };

      coordinates.features.forEach((feature) => {
        if (feature.properties.kira < 2500) {
          feature.properties.color = colors.yellow;
        } else if (feature.properties.kira < 3000) {
          feature.properties.color = colors.orange;
        } else if (feature.properties.kira < 5000) {
          feature.properties.color = colors.red;
        }
      });
      
      return { ...state, istanbulNufus: coordinates };
    },
    getMenu: (state, action) => {
      return { ...state, menu: action.payload };
    },
    getSettings: (state, action) => {
      return { ...state, settings: action.payload };
    },

    getAllPieCharts: (state, action) => {
      return { ...state, allPieCharts: action.payload };
    },
    getListOfResults: (state, action) => {
      return { ...state, listOfResults: action.payload };
    },
    getTop10Asc: (state, action) => {
      return { ...state, top10Asc: action.payload };
    },
    getTop10Desc: (state, action) => {
      return { ...state, top10Desc: action.payload };
    },
  },
});

export const {
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
  getTop10Asc,
  addCards,
} = objectSlice.actions;

export default objectSlice.reducer;
