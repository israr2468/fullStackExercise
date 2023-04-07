console.log('Fetching user data...')

const userContainer = document.getElementsByClassName('user-container')[0];
fetch('/api/mydata')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const userElement = document.createElement('div');
            userElement.textContent = `Name: ${user.name} Number: ${user.number} Email:${user.email}`;
            userContainer.appendChild(userElement);
        });
    })
    .catch(error => console.error(error));
