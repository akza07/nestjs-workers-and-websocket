<script>
    import { io } from "socket.io-client";
    const socket = io("ws://localhost:3000/", {});
    let messages = ["Hello world!"];
    let chatText = "Hello";
    let isTyping = false;

    let logs = ["[ " + new Date().toDateString() + " ] " + "Client started."];

    function sendMessage() {
        console.log("sent:", chatText);
        addLog("Client sent :" + chatText);
        socket.emit("event.send", chatText);
    }

    function addLog(message) {
        logs = [...logs, `[ ${new Date().toDateString()} ] ${message}`];
    }
    /**
     * Listening to socket
     */
    socket.on("event.recieved", (msg) => {
        messages = [msg];
        addLog(msg);
    });
    socket.on("event.typing", (reply) => {
        isTyping = true;
    });
    socket.on("event.notTyping", (reply) => {
        isTyping = false;
    });
</script>

<main>
    <div class="container">
        <div class="left-section">
            {#each messages as message}
                <p>{message}</p>
            {/each}
            {#if isTyping}
                <div class="loader">Someone is typing...</div>
            {/if}
            <input
                type="text"
                bind:value={chatText}
                on:focusin={() => {
                    socket.emit("event.focused", chatText);
                }}
                on:focusout={() => {
                    socket.emit("event.unfocused", chatText);
                }}
            />
            <button type="submit" on:click|preventDefault={sendMessage}
                >Send</button
            >
        </div>
        <div class="right-section">
            {#each logs as log}
                <div>{log}</div>
            {/each}
        </div>
    </div>
</main>

<style>
    .container {
        display: flex;
        min-height: 600px;
        width: 100%;
    }
    .left-section {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-direction: column;
        min-width: 50%;
    }
    .right-section {
        max-height: 80vh;
        padding: 2rem;
        text-align: left;
        border-radius: 10px;
        border-color: green;
        border-width: 1px;
        border-style: solid;
        width: 50%;
        overflow-y: auto;
    }
    .loader {
        border: 2px solid green;
        position:absolute;
        top:0;
        left:0;
    }
</style>
