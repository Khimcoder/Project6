import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	NavLink as Link,
	Route
} from 'react-router-dom';

 // request.auth != null      ......for storage
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

// //to check if user is logged in
// const auth = firebase.auth();
// var provider = new firebase.auth.GoogleAuthProvider();

//Anyone can see the global App
// User has to sign in to be able to post a cityCard.
// To Log In:
// push LogIn Button
// Form details:
	// Hit POST/submit
	// [Alert user to log in if not]

// Store what user types in into State/root of APP
// Add a 'Add Post' button that sends our todo to firebase
// Grab data from firebase (ID of the Post) and store it in our state
// display the post on global page

// Nice to have: have user change display of posts to newest-oldest or Alphabetical
// User post authentication!

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
				<div className="cityContainer">
					{/*Maps over the posts array and grabs all the object values and spits it out*/}
					<ol >
					{this.state.posts.map((post, i) => {
						console.log(post.key);
						return (
							<li className="userPost" key={i}>
								{/*<h2>City: {post.city}</h2>*/}
								<Link to={`/citydetails/${post.key}`}>
									<img src={post.pic} className="userPost-Image"/>
								</Link>
								{/*
								<p>1. {post.cool1}</p>
								<p>2. {post.cool2}</p>
								<p>3. {post.cool3}</p>
								<p>4. {post.cool4}</p>
								<p>5. {post.cool5}</p>
								<p>Traveler: {post.userName}</p>
								<Counter />
								*/}
							</li>
						)
					})}
					</ol>
				</div>
				<form>
					 <input name="pic" accept="image/*" onChange={this.handleUpload} type type="file" />
					<input name="city" value={this.state.city} onChange={this.handleChange} type type="text" placeholder="Enter the City" />
					<input name="cool1" value={this.state.cool1} onChange={this.handleChange} type type="text" placeholder="#1 cool thing" />
					<input name="cool2" value={this.state.cool2} onChange={this.handleChange} type type="text" placeholder="#2 cool thing" />
					<input name="cool3" value={this.state.cool3} onChange={this.handleChange} type type="text" placeholder="#3 cool thing" />
					<input name="cool4" value={this.state.cool4} onChange={this.handleChange} type type="text" placeholder="#4 cool thing" />
					<input name="cool5" value={this.state.cool5} onChange={this.handleChange} type type="text" placeholder="#5 cool thing" />
					<input name="userName" value={this.state.userName} onChange={this.handleChange} type type="text" placeholder="Enter your name" />
					<button onClick={(e) => this.handleSubmit(e)} type="submit">POST*_*</button>
				</form>
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
			// console.log(postsArray);
			this.setState({
				posts: postsArray
			});
		});
		
	}
		handleSubmit(e) {
			e.preventDefault();
			if (anyEmpty(this.state)) return;
			// this.setState();
			// console.log(this.state);
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
		// console.log(this.props,nextProps)
		console.log(this.props.match.params.id);
		// //Connect to firebase DB with this.props.match.params.id as the ref,
			const dbRef = firebase.database().ref(`/${this.props.match.params.id}`);
			dbRef.on('value', (snapshot) => {
				const dbCity = snapshot.val()
	  	
			    console.log(dbCity)
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
				{this.state.dbCity.city}
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
		this.setState({
			Likes: this.state.Likes + 1
		});
	}
	render () {
		return (
			<div>
				<button onClick={this.increment}>🖐 </button>
				 "{this.state.Likes}"
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
		// console.log(this.state.form);
		return (
			<Router>
				<main>
					<h1 className="title">Hi 5</h1>
					<h1 className="subTitle">Top 5 cool things about a City</h1>
					<div>
						<nav>
							<Link to="/">City Gallery</Link>
							
						</nav>
						<Route exact path="/" component={CityGallery} />
						<Route path="/citydetails/:id" component={CityDetails} />
					</div>
				</main>
			</Router>
		)
	}
} 

ReactDOM.render(<App />, document.getElementById('app'));