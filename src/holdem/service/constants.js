module.exports = {
    PLAYER_INACTIVE: 0,
    PLAYER_FOLDED: 1,
    PLAYER_ALLIN: 2,
    PLAYER_ACTIVE: 3,
    PLAYER_DISCONNECTED: 4,

    PHASE_NONE: -1,
    PHASE_PREFLOP: 0,
    PHASE_FLOP: 1,
    PHASE_TURN: 2,
    PHASE_RIVER: 3,
    PHASE_SHOWDOWN: 4,

    phases: [
        "Pre Flop", "Flop", "Turn", "River", "Showdown"
    ],
}