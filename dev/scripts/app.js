import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	NavLink as Link,
	Route
} from 'react-router-dom';

  // Initialize Firebase
  var config = {
	apiKey: "AIzaSyBEgr2IMuDGrIGTqzil5hZE6GP56P68OP0",
	authDomain: "hi-5-ceea4.firebaseapp.com",
	databaseURL: "https://hi-5-ceea4.firebaseio.com",
	projectId: "hi-5-ceea4",
	storageBucket: "hi-5-ceea4.appspot.com",
	messagingSenderId: "1013054352030"
  };
  firebase.initializeApp(config);

// Store what user types in from form	
class CityGallery extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			form: {
				pic: [],
				city: '',
				cool1: '',
				cool2: '',
				cool3: '',
				cool4: '',
				cool5: '',
				userName: ''
			}
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
	}
	render() {
		return (
			<div>
				<h1 className="subTitle">Top 5 cool things about a City</h1>
				<div className="cityContainer">
					{/*Maps over the posts array and grabs all the object values and spits it out*/}
					<ol className="gallery">
					{this.state.posts.map((post, i) => {
						return (
							<li className="galleryPost" key={i}>
								<Link to={`/citydetails/${post.key}`}>
									<img src={post.pic} className="galleryPost-Image"/>
								</Link>
							</li>
						)
					})}
					</ol>
				</div>
				<div className="title-form">
					<h2>POST YOUR ADVENTURE!</h2>
					<h3>Share Your Favourite City Pic & Hi 5 Moments By Posting here! </h3>
				</div>
				<form>
					<label htmlFor="pic">Upload:</label>
					 <input name="pic" accept="image/*" onChange={this.handleUpload} type type="file" />
					 <label htmlFor="city">City:</label>
					<input name="city" value={this.state.city} onChange={this.handleChange} type type="text" placeholder="Enter the City" />
					<label htmlFor="cool1">Hi 5s:</label>
					<input name="cool1" value={this.state.cool1} onChange={this.handleChange} type type="text" placeholder="#1 cool thing" />
					<input name="cool2" value={this.state.cool2} onChange={this.handleChange} type type="text" placeholder="#2 cool thing" />
					<input name="cool3" value={this.state.cool3} onChange={this.handleChange} type type="text" placeholder="#3 cool thing" />
					<input name="cool4" value={this.state.cool4} onChange={this.handleChange} type type="text" placeholder="#4 cool thing" />
					<input name="cool5" value={this.state.cool5} onChange={this.handleChange} type type="text" placeholder="#5 cool thing" />
					<label htmlFor="userName">Name:</label>
					<input name="userName" value={this.state.userName} onChange={this.handleChange} type type="text" placeholder="Enter your name" />
					<div className="buttonContainer">
						<button onClick={(e) => this.handleSubmit(e)} type="submit"><span>POST</span></button>
					</div>
				</form>
				<footer>
					<p>&hearts;Thank you for visiting! &copy; 2017 KodeByKhim</p>
				</footer>
			</div>
		)
	}
	componentDidMount() {
		const dbRef = firebase.database().ref('/');
		dbRef.on('value', (res) => {
			const posts = res.val();
			const postsArray = [];
			for (let key in posts) {
				posts[key].key = key;
				postsArray.push(posts[key]);
		// assign the objects default key to be its new unique key!
			}
			this.setState({
				posts: postsArray
			});
		});	
	}
		handleSubmit(e) {
			e.preventDefault();
			if (anyEmpty(this.state)) return;
			
			const dbRef = firebase.database().ref('/');
			const post = {
				pic: this.state.pic,
				city: this.state.city,
				cool1: this.state.cool1,
				cool2: this.state.cool2,
				cool3: this.state.cool3,
				cool4: this.state.cool4,
				cool5: this.state.cool5,
				userName: this.state.userName	
			}
	
			dbRef.push(post);
			this.setState({
					pic:  '',
					city: '',
					cool1: '',
					cool2: '',
					cool3: '',
					cool4: '',
					cool5: '',
					userName: ''
			});
		}

		handleChange(e) {
			console.log(e);
			this.setState({
				//.name refers to "inputs below  = the value they type in 'string' set states
				 [e.target.name]: e.target.value
			});
		}
		handleUpload(e) {
			// 	Get file from UserInput
			let file = e.target.files[0];
			console.log(file.name);
			const storageRef = firebase.storage().ref('cityPics/' + file.name)
			// Upload file and store results of uploaded pic
			const uploadTask = storageRef.put(file).then(() => {
				// After the upload completes, download URL for the object. 
				const URLObject = storageRef.getDownloadURL().then((data) => {
					this.setState (
						{
							pic: data 
						}
					)
				})
			});
		}
}
class CityDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			dbCity: {}
		}
	}
	componentWillMount() {
		// console.log(this.props.match.params.id);
		// //Connect to firebase DB with this.props.match.params.id as the ref,
			const dbRef = firebase.database().ref(`/${this.props.match.params.id}`);
			dbRef.on('value', (snapshot) => {
				const dbCity = snapshot.val()
	  		// console.log(dbCity);
			    this.setState ({
			    	dbCity
			    })
			 });  		
	}
			
	componentWillUnmount() {
		const dbRef = firebase.database().ref(`/${this.props.match.params.id}`);
		dbRef.off();	
	}
		
	render() {
		return (
			<div>
				<h1 className="cityTitle">Top 5 cool things about <span>{this.state.dbCity.city}</span></h1>
				<p className="backTo">Back to</p>
				<div className="city">
					<div className="city-image">
						<img src={this.state.dbCity.pic} className="city-image__image"/>
					</div>
					<div className="city-item">
						<ol className="city-item-list">
							<li className="city-item-list__cool">{this.state.dbCity.cool1}</li>
							<li className="city-item-list__cool">{this.state.dbCity.cool2}</li>
							<li className="city-item-list__cool">{this.state.dbCity.cool3}</li>
							<li className="city-item-list__cool">{this.state.dbCity.cool4}</li>
							<li className="city-item-list__cool">{this.state.dbCity.cool5}</li>
						</ol>
						<p className="city-item__name">Traveler: {this.state.dbCity.userName}</p>
						<Counter SelectedCity={this.props.match.params.id} />
					</div>
	            </div>
            </div>
		)
	}
}

const anyEmpty = obj => {
	for (let key in obj) {
		if (obj[key] === '') {
			// if any unfilled input alert!
			alert('Fill out all fields please!');
			return true;
		}
	}
	return false;
}

// counts likes on cityPost
class Counter extends React.Component {
	constructor(){
		super();
		this.state = {
			Likes: 0
		};
		this.increment = this.increment.bind(this);
	}
	increment(){
		const dbRef = firebase.database().ref(this.props.SelectedCity + '/likes');
		dbRef.set(this.state.likes + 1);
	}
	componentDidMount(){
		const dbRef = firebase.database().ref(this.props.SelectedCity + '/likes');
		dbRef.on('value', (snapshot) => {
			console.log(snapshot.val());
			if (snapshot.val() === null) {
				dbRef.set(0);
			} else {
				this.setState({
					likes: snapshot.val()
				});
			}
		});			
	}
	render () {
		return (
			<div className="counter">
				<button onClick={this.increment}>🖐 </button>
				 "{this.state.likes}" Hi 5's
			</div>
		)
	}
}
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			form: {
				pic: [],
				city: '',
				cool1: '',
				cool2: '',
				cool3: '',
				cool4: '',
				cool5: '',
				userName: ''
			}
		};
	}

	render() {
		return (
			<Router>
				<main>
					<nav>
						<h1 className="title">Hi 5</h1>
						<Link to="/">City Gallery</Link>
						<div className="nav-arrow">
							
						</div>
					</nav>
					<Route exact path="/" component={CityGallery} />
					<Route path="/citydetails/:id" component={CityDetails} />
				</main>
			</Router>
		)
	}
} 

ReactDOM.render(<App />, document.getElementById('app'));