const form = document.getElementById('form');
const user = document.getElementById('search');
const main = document.getElementById('main');

const API_url = 'https://api.github.com/users/';

let userInfo;

try {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const user = e.target[0].value;
		e.target[0].value = '';
		getData(user);
	})


	const getData = async (user) => {
		const dataObject = await axios.get(API_url + user);
		const data = dataObject.data;
		const {
			avatar_url,
			name,
			bio,
			followers,
			following,
			public_repos,
			repos_url
		} = data;
		const reposObject = await axios.get(repos_url);
		const reposData = reposObject.data;
		const repos = [];
		for (let i = 0; i < Math.min(5, reposData.length); i++) {
			repos.push(reposData[i].name);
		}

		if (name) {
			main.innerHTML = `<div class="user">
			<div class="user-avatar">
				<img src=${avatar_url}>
			</div>
			<div class="user-info">
				<h1 class="user-name">${name}</h1>
				<p class="user-description">${bio}</p>
				<ul>
					<li>
						${followers} <strong>Followers</strong>
					</li>
					<li>
						${following} <strong>Following</strong>
					</li>
					<li>
						${public_repos} <strong>Repos</strong>
					</li>
				</ul>
			</div>`
			userInfo = document.querySelector('.user-info');
			getRepos(repos);
		}
		else {
			main.innerHTML = `<h1 class="notFound">No profile with this username</h1>`
		}
	}

	const getRepos = arr => {
		const repos = document.createElement('div');
		repos.classList.add('user-repos');
		for (let i = 0; i < arr.length; i++) {
			const repo = document.createElement('div');
			repo.classList.add('repo');
			repo.innerHTML = arr[i];
			repos.append(repo);
		}
		userInfo.append(repos);
	}
}

catch (e) {
	console.log(e);
}