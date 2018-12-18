const initialState = {
    list: [],
    player: {},
    // audio: {},
    time: {},
    control: false,
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
                    singInterval: action.item.singInterval,
                    singAlbum: action.item.singAlbum,
                    singLyric: action.item.singLyric
                }
            });
        case 'ADD_PLAYER':
            state.list.unshift({
                singId: action.item.singId,
                singPic: action.item.singPic,
                singAuthor: action.item.singAuthor,
                singLrc: action.item.singLrc,
                singUrl: action.item.singUrl,
                singTitle: action.item.singTitle,
                singInterval: action.item.singInterval,
                singAlbum: action.item.singAlbum,
                singLyric: action.item.singLyric
            });
            // console.log(state.list);
            return Object.assign({}, state, {
                list: state.list
            });
        case 'DELETE':
            return Object.assign({}, state, {
                list: state.list.filter(val => val.singId !== action.item.singId)
            });
        case 'AUDIO':
            break;
        case 'TIME':
            return Object.assign({}, state, {
                time: {
                    currentTime: action.item.currentTime,
                    settingTime: action.item.settingTime
                }
            });
        case 'CONTROL':
            return Object.assign({}, state, {
                control: action.item.isPlay
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