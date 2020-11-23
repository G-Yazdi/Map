const initialState = {
    speed: 0,
    time: ''
}
const reducer = (state = initialState, action) =>{
    if(action.type === 'SPEEDCHANGE'){
        
        return{
            ...state,
            speed: action.speed
        }
    }
    if(action.type === 'TIMECHANGE'){
        
        return{
            ...state,
            time: action.time
        }
    }
    return state;
};

export default reducer;