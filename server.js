const express=require('express');
const app=express();

const users=[{email:String,
password:String
}];

app.use(express.urlencoded({ extended: true }));

const questions=[{
  title:"Two States",
  description:"Given an array, get maximum element out of this",
  testcases:[{
    input:"[1,2,3,4,5]",
    output:"5"
  }]
}];

const submissions=[];
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  users.push({email,password});

  res.status(200).send('Sign up successful!');
});

app.post('/signin',(req,res)=>{
  const {email,password}=req.body;
  const flag=0;
  for (let i = 0; i < users.length; i++) {
   if (users[i].email === email && users[i].password==password) {
     flag=1;
     res.status(200).send("Sign In successful");
   }
 }
 if(!flag)
 res.status(401).send("Either password or Email is not correct..");
});

app.get("/questions",function(req,res){
  res.send(questions);
});


app.post("/submissions",function(req,res){
const code=req.body;
submissions.push(code);
const randomNum = Math.floor(Math.random() * 2);
if(randomNum)
res.send("Accepted");
else
res.send("Rejected");
});


app.get("/submissions",function(req,res){
res.send(submissions);
})

app.listen(3000,function(){
  console.log("Server is running on 3000.");
});
