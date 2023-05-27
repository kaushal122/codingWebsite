const express=require('express');
const app=express();
const jwt = require('jsonwebtoken');
const users=[
  {
  email:'',
password:''
}];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const questions=[{
  title:"Two States",
  description:"Given an array, get maximum element out of this",
  testcases:[{
    input:"[1,2,3,4,5]",
    output:"5"
  }]
}];

// this function is defining the authorization middleware...
const key="Krishna";
function authenticateToken(req,res,next){
  const token=req.header('Authorization');
  const tokenParts = token.split(' ');

  if(tokenParts[0]!='Bearer' || tokenParts.length !=2){
    return res.status(401).send('Unauthorized: Missing Token');
  }
  try{
    // verifying if token is valid or not...
    const decoded=jwt.verify(tokenParts[1],key);
    console.log(decoded);
    console.log(req.user);
    req.user=decoded;
    next();
  }
  catch(error){
    return res.status(403).send('Forbidden: Invalid Token');
  }

}




const submissions=[];
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  // Creating the token here with help of secret key and jsonwebtoken package...
  const token=jwt.sign({email:email},key);
  users.push({email,password});
  res.status(200).send({
  message: 'Sign up successful!',
  users: users,
  token:token
});
});

app.post('/signin',(req,res)=>{
  const {email,password}=req.body;
  let flag=0;
  for (let i = 0; i < users.length; i++) {
   if (users[i].email === email && users[i].password==password) {
     flag=1;
     res.status(200).send("Sign In successful");
   }
 }
 if(!flag)
 res.status(401).send("Either password or Email is not correct..");
});

// this routing can be done only if it gets authenticated by above authenticatetoken middleware function.
app.get("/questions",authenticateToken,function(req,res){
  res.send(questions);
});


app.post("/submissions",authenticateToken,function(req,res){
let code=req.body.code;
submissions.push(code);
const randomNum = Math.floor(Math.random() * 2);
res.send({
  code: code,
  result: randomNum ? "Accepted" : "Rejected"
});
});


app.get("/submissions",function(req,res){
res.send(submissions);
})

app.listen(3000,function(){
  console.log("Server is running on 3000.");
});
