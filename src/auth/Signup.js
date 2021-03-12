import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, password)
        fetch('http://localhost:3000/user/create', {
            method: 'POST',
            body: JSON.stringify({user:{username: username, password: password}}),
            headers: new Headers({
                'Content-Type': 'application/json'//this lets our server now what type of info we are sending to it so it can decide if it can handle it and what to do with it
            })
        }).then((response) => {
            if (response.status === 200) {
                console.log("Registration is successful.");
            } else {
                console.log("Registration has failed.");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        
            // checking to see if both input fields are complete before it updates token
            if (props.username && props.password){
            // here we are giving the paramter of updateToken
            props.updateToken(data.sessionToken);
            // if the inputs are complete and correct, it will redirect the user to the verified homepage
            
        } else {
            //if inputs are incomplete or incorrect, it will prompt a modal informing user of error
            console.log("registration info incomplete")
            // this.props.openModal();
        } 
    })
}




    // code below is before security modification        
    //     }).then(
    //         (response) => response.json()
           
    //     ).then((data) => {
    //         props.updateToken(data.sessionToken)
    //     })
      
    // }
    
    return(
        <div>
            <h1>Signup</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" onChange={(e) => setPassword(e.target.value)} name="password" value={password}/>
                </FormGroup>
                <Button type="submit">Signup</Button>
            </Form>
        </div>
    )
    }

export default Signup;