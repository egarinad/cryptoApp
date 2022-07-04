// import {loadCoins} from "../redux/coinsReducer";
//
// export const fetchCoins = () => {
//     const url = "https://api.coincap.io/v2/assets";
//     return function (dispatch) {
//         fetch(url)
//             .then(response => response.json())
//             .then(json => dispatch(loadCoins(json)))
//             .catch(e=>console.log(e))
//     }
// }