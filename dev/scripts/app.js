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

// Create Form with 8 input fields & 1 img Uploader
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
    render() {
        return (
            <div>
                City Gallery PICTURES
            </div>
        )
    }
}
class CityDetails extends React.Component {
    render() {
        return (
            <div>
                City: Details USERSPOSTs
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
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
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
// dbRef.push(this.state.form) OlD way
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
// form: Object.assign({}, this.state.form, { [e.target.name]: e.target.value })
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
	
    render() {
    	// console.log(this.state.form);
      	return (
	        <main>
	            <h1 className="title">Hi 5</h1>
	            <h1 className="subTitle">Top 5 cool things about a City</h1>
	            <Router>
	            	<div>
	            		<Link to="/citygallery">City Gallery</Link>
                    	<Link to="/citydetails">City Details</Link>
		            	<Route path="/citygallery" component={CityGallery} />
		            	<Route path="/citydetails" component={CityDetails} />
	            	</div>
	            </Router>
	            <div className="cityContainer">
	            	{/*Maps over the posts array and grabs all the object values and spits it out*/}
	             	{this.state.posts.map((post, i) => {
	             		return (
	             			<ol className="userPost" key={i}>
	             				<h2>City: {post.city}</h2>
	             				<img src={post.pic} className="userPost-Image"/>
	             				<li>{post.cool1}</li>
	             				<li>{post.cool2}</li>
	             				<li>{post.cool3}</li>
	             				<li>{post.cool4}</li>
	             				<li>{post.cool5}</li>
	             				<p>Traveler: {post.userName}</p>
	             				<Counter />
	             			</ol>
	             		)
	             	})}
	            </div>
	            <div>
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
	        </main>
      	)
    }
// where react gets its changing data(newestState) to display on the screen
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
			console.log(postsArray);
			this.setState({
				posts: postsArray
			});
		});
		
  		}
} 
	
ReactDOM.render(<App />, document.getElementById('app'));