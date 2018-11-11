const initialState = {
    list: [],
    player: {},
    audio: {},
    time: {},
    // isPlay: false,
    // playIndex: 0,
    control: {},
    status: false,
};
const Player = (state = initialState, action) => {
    // console.log(action.item);
    switch(action.type) {
        case 'PLAYER':
            return Object.assign({}, state, {
                player: {
                    singId: action.item.singId,
                    singPic: action.item.singPic,
                    singAuthor: action.item.singAuthor,
                    singLrc: action.item.singLrc,
                    singUrl: action.item.singUrl,
                    singTitle: action.item.singTitle,
                }
            });
        case 'ADD_PLAYER':
            // console.log(state.list);
            return Object.assign({}, state, {
                list: [...state.list,
                    {
                        singId: action.item.singId,
                        singPic: action.item.singPic,
                        singAuthor: action.item.singAuthor,
                        singLrc: action.item.singLrc,
                        singUrl: action.item.singUrl,
                        singTitle: action.item.singTitle
                    }
                ].reverse()
            });
        case 'DELETE':
            return Object.assign({}, state, {
                list: state.list.filter(val => val.singId !== action.item.singId)
            });
        case 'AUDIO':
            // console.log(action.item);
            // console.log(state.list);
            return Object.assign({}, state, {
                audio: {
                    singId: action.item.singId ? action.item.singId : null,
                    singUrl: action.item.singUrl ? action.item.singUrl : null,
                    // currentTime: action.item.currentTime,
                    // durationTime: action.item.durationTime,
                    playList: state.list,
                }
            });
        case 'TIME':
            return Object.assign({}, state, {
                time: {
                    currentTime: action.item.currentTime,
                    durationTime: action.item.durationTime,
                }
            });
        case 'CONTROL':
            return Object.assign({}, state, {
                control: {
                    isPlay: action.item.isPlay !== undefined ? action.item.isPlay : true ,
                }
            });
        case 'PLAYINDEX':
            return Object.assign({}, state, {
                playIndex: action.playIndex
            });
        case 'PLAYSTATUS':
            return Object.assign({}, state, {
                status: action.item.status
            });
        default:
            return state

    }
};
export default Player