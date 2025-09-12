function getLimitBreaches(timestamps, userIds, actions, m) {
    const sessions = {};   // user -> active session count
    const breached = new Set();

    for (let i = 0; i < timestamps.length; i++) {
        const user = userIds[i];
        const action = actions[i];

        if (!(user in sessions)) {
            sessions[user] = 0;
        }

        if (action === "login") {
            sessions[user] += 1;
            if (sessions[user] > m) {
                breached.add(user);
            }
        } else if (action === "logout") {
            if (sessions[user] > 0) {
                sessions[user] -= 1;
            }
        }
    }

    // Return lexicographically sorted array (empty if no breaches)
    return Array.from(breached).sort();
}

// -------------------- TEST CASES --------------------

// Case 1: Single user breaches
console.log(getLimitBreaches(
    [1, 2, 3, 4],
    ["A", "A", "A", "A"],
    ["login", "login", "login", "logout"],
    2
));
// Output: ["A"]


// Case 2: Multiple users, both breach
console.log(getLimitBreaches(
    [1, 2, 3, 4, 5, 6],
    ["A", "A", "B", "B", "B", "A"],
    ["login", "login", "login", "login", "login", "logout"],
    2
));
// User A -> 2 logins ok, then logout (safe)
// User B -> 3 logins → breach
// Output: ["B"]


// Case 3: Multiple users, both breach
console.log(getLimitBreaches(
    [1, 2, 3, 4, 5, 6, 7],
    ["A", "A", "A", "B", "B", "B", "B"],
    ["login", "login", "login", "login", "login", "login", "logout"],
    2
));
// A -> exceeds limit at 3 logins
// B -> exceeds limit at 3 logins
// Output: ["A", "B"]


// Case 4: No breaches
console.log(getLimitBreaches(
    [1, 2, 3],
    ["A", "B", "A"],
    ["login", "login", "logout"],
    2
));
// Both A and B stay within limit
// Output: []
