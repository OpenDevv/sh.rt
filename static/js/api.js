async function cutLink() {
    let link = document.getElementById('link').value;
    document.getElementById('link').value = "";

    let response = await fetch('../api/v1/cutLink/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'link': link,
        })
    });
    let result = await response.json();

    if (result['status'] === 'OK') {
        let link = getSitePath() + result['data']['key'];
        document.getElementById('last-link').style.display = 'block';
        document.getElementById('old-link').innerHTML = result['data']['link'];
        document.getElementById('new-link').innerHTML = link;

        document.getElementById('copy').onclick = function () {
            copyText(link);
        }
    }
}

async function updateStatistics() {
    let response = await fetch('../api/v1/allStatistics/', {
        method: 'GET',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        }
    });
    let result = await response.json();

    if (result['status'] === 'OK') {
        document.getElementById('links-count').innerHTML = result['data']['links']['count'];
    }
}

// TODO: Закончить статистику ссылки

async function setLinkStatistics(key) {
    console.log(getSitePath());
    let response = await fetch(getSitePath() + 'api/v1/link/' + key, {
        method: 'GET',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        }
    });
    let result = await response.json();

    if (result['status'] === 'OK') {
        console.log(result);
        document.getElementById('link').innerHTML = result['data']['link'];
        document.getElementById('passed').innerHTML = result['data']['passed'];
        document.getElementById('uniquePassed').innerHTML = result['data']['unique_passed'];
    }
}

