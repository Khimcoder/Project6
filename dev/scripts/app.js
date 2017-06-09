import React from 'react';
import ReactDOM from 'react-dom';



 
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


const dbRef = firebase.database().ref('/');

//Anyone can see the global App
// User has to sign in to be able to post a cityCard.
// To Log In:
// push LogIn Button

// Create Form with 7 input fields & 1 img Uploader
// Form details:
	// user has to input:
	// * upload an IMG
	// Enter city
	// * 5. Cool thing about that city 
	// Enter Traveler: "Name"

	// Hit POST/submit
	// [Alert user to log in if not]

// Store what user types in into State/root of APP
// Add a 'Add Post' button that sends our todo to firebase
// Grab data from firebase (ID of the Post) and store it in our state
// display the post on global page

// Nice to have: have user change display of posts to newest-oldest or Alphabetical
// User post authentication!

const anyEmpty = obj => {
	for (let key in obj) {
		if (obj[key] === '') {
			// set some error eventually
			alert('Please fill out all fields please!');
			return true;
		}
	}
	return false;
}


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			form: {
				pic: 'img',
				city: 'Toronto',
				cool1: 'Good food',
				cool2: 'Bike Life',
				cool3: 'Street festivals',
				cool4: 'HabourFront Trail',
				cool5: 'Craft Beer',
				userName: 'Tido'
			}
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		if (anyEmpty(this.state.form)) return;

		// this.setState();
		console.log(this.state);
		this.setState({
			posts: [...this.state.posts, this.state.form]
		});

		dbRef.push(this.state)
	}
	handleChange(e) {
		console.log(e);
		this.setState({
			form: Object.assign({}, this.state.form, { [e.target.name]: e.target.value })
			//.name refers to "inputs below  = the value they type in 'string' set states
		});
	}
    render() {
    	console.log(this.state.form);
      	return (
	        <main>
	             <h1>Hi 5</h1>
	             <div className="cityContainer">
	            {/*Maps over the posts array and grabs all the object values and spits it out*/}
	             	{this.state.posts.map((post, i) => {
	             		return (
	             			<div className="cityPost" key={i}>
	             				<h2>
	             					City: {post.city}	
	             				</h2>
	             				<p>
	             				 	#1: {post.cool1}	
	             				</p>
	             				<p>
	             					#2: {post.cool2}
	             				</p>
	             				<p>
	             					#3: {post.cool3}
	             				</p>
	             				<p>
	             					#4: {post.cool4}	
	             				</p>
	             				<p>
	             					#5: {post.cool5}
	             				</p>
	             				<p>
	             					Traveler: {post.userName}	
	             				</p>
	             			</div>
	             		)
	             	})}
	             </div>
		        <form>
		        	<input name="pic" value={this.state.form.pic} onChange={this.handleChange} type type="text" placeholder="Upload a Pic" />
					<input name="city" value={this.state.form.city} onChange={this.handleChange} type type="text" placeholder="Enter the City" />
					<input name="cool1" value={this.state.form.cool1} onChange={this.handleChange} type type="text" placeholder="#1 cool thing" />
					<input name="cool2" value={this.state.form.coo2} onChange={this.handleChange} type type="text" placeholder="#2 cool thing" />
					<input name="cool3" value={this.state.form.cool3} onChange={this.handleChange} type type="text" placeholder="#3 cool thing" />
					<input name="cool4" value={this.state.form.cool4} onChange={this.handleChange} type type="text" placeholder="#4 cool thing" />
					<input name="cool5" value={this.state.form.cool5} onChange={this.handleChange} type type="text" placeholder="#5 cool thing" />
					<input name="userName" value={this.state.form.userName} onChange={this.handleChange} type type="text" placeholder="Enter your name" />
					<button onClick={(e) => this.handleSubmit(e)} type="submit">POST*_*</button>
				</form>
	        </main>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
