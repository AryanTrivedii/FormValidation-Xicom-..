const mongoose =require('mongoose')

const url=`mongodb+srv://trivediutkarsh1:2ZBamNgCSlJ5jy1n@form.pifhbq8.mongodb.net/?retryWrites=true&w=majority`

const Connection =async()=>{
    try {
     await mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("DataBase Connected✅")
    
    } catch (error) {
     console.log("Failure in Connection ❌",error)   
    }
}


module.exports=Connection