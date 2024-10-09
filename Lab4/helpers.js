// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

import * as paramUtils from './paramUtils.js';

export let assertPlayer = (v, varName) => {
    if (!v.firstName) throw `${varName || v} must be a player. does not have a "firstName" property.`;
    if (!v.lastName) throw `${varName || v} must be a player. does not have a "lastName" property.`;
    if (!v.position) throw `${varName || v} must be a player. does not have a "position" property.`;

    paramUtils.assertStr(v.firstName, `(${varName || v}).firstName`);
    paramUtils.assertStr(v.lastName, `(${varName || v}).lastName`);
    paramUtils.assertStr(v.position, `(${varName || v}).position`);
}


export let assertPlayerArray = (v, varName) => {
    paramUtils.assertArray(v, varName)
    if (v.length == 0) throw `(${varName || v}) must contain at least one player.`;

    for (let i in v) {
        let player = v[i];
        assertPlayer(player, `${varName || "Player Array"}[${i}]`)
    }
}
