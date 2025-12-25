document.querySelectorAll(".join-button").forEach(button => {
    button.addEventListener("click", () => {
        const groupName = button.getAttribute("data-group");
        let joinedGroups = JSON.parse(localStorage.getItem("joinedGroups")) || [];
        
        if (!joinedGroups.includes(groupName)) {
            joinedGroups.push(groupName);
            localStorage.setItem("joinedGroups", JSON.stringify(joinedGroups));
            alert(`You have joined ${groupName}!`);
        } else {
            alert(`You are already a member of ${groupName}.`);
        }
    });
});