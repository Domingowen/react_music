const PLAYER = 'PLAYER';
const DELETE = 'DELETE';
const ADD_PLAYER = 'ADD_PLAYER';
const AUDIO = 'AUDIO';
const CONTROL = 'CONTROL';
const TIME = 'TIME';
const ISPLAY = 'ISPLAY';
const PLAYINDEX = 'PLAYINDEX';
export function player (item) {
    return {
        type: PLAYER,
        item
    }
}
export function deleteItem (item) {
    return {
        type: DELETE,
        item
    }
}
export function add_player (item) {
    return {
        type: ADD_PLAYER,
        item
    }
}
export function audio_player (item) {
    return {
        type: AUDIO,
        item
    }
}
export function audio_control (item) {
    return {
        type: CONTROL,
        item
    }
}
export function player_time (item) {
    return {
        type: TIME,
        item
    }
}