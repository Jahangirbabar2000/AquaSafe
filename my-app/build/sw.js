/* eslint-disable no-restricted-globals */
self.addEventListener('push', function (event) {
    // console.log('[Service Worker] Push Received.');

    const data = event.data.json();

    // console.log(`[Service Worker] Push had this data:`, data);

    // Send the data to all the clients
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            // console.log(`[Service Worker] Sending message to client:`, client);
            client.postMessage(data);
        });
    });

    event.waitUntil(self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon
    }));
});
