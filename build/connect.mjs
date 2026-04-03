export async function connect(obs) {
    //since OBS can throw we need to wrap it in a try catch block
    try {
        //NOTE(skc): if you use a password on your obs websock[which you should]
        //you will need to edit this...
        await obs.connect("ws://127.0.0.1:4455", "password", {
            rpcVersion: 1,
        });
        return true;
    }
    catch (e) {
        //console.error(e);
        return false;
    }
}
export async function await_connection(obs, attempts = 3, connection_try = 1) {
    let t = await connect(obs);
    if (t) {
        return true;
    }
    if (!t) {
        console.log(`unable to connect ${connection_try}/${attempts}`);
        if (connection_try == 3) {
            process.exit(0);
        }
        return new Promise(() => {
            setTimeout(() => {
                await_connection(obs, attempts, ++connection_try);
            }, 1000);
        });
    }
}
export async function disconnect(obs) {
    try {
        await obs.disconnect();
    }
    catch (e) {
    }
}
//# sourceMappingURL=connect.mjs.map