const {
    register,
    login,
    logout,
    current,
    updateById,
    getUserById
 } = require('../services/userService');
 
 
 
 const registrationController = async (req, res) => {
      const {
             first_name,
             last_name,
             email,
             phone,
             password
     } = req.body;
     
    await register(first_name ,last_name, email,phone, password);
 
   res.status(201).json({status: 'success'});
 
 
 }
 
 const loginController = async (req, res) => {
     
      const {
             email,
             password
     } = req.body;
  
   const updateUser = await login(email, password);
 
   res.json({status: 'success', updateUser});
 
 }
 
 const logoutController =  async ( req , res ) => {
   const { _id: userId } = req.user;
 
   await logout(userId)
   
   res.status(200).json({status: 'success', message: 'token deleted'});
 
 }
 
 const currentController = async ( req , res ) => {
   const { _id: userId } = req.user;
 
   const user = await current(userId)
   
   res.status(200).json({user});
 }

 const getUserByIdController = async ( req , res) =>{
     const { id } = req.params ;

     const searchUser = await getUserById(id)

     res.status(200).json({searchUser});

 }

 const updateUserByIdController = async ( req , res) =>{
  const { id } = req.params ;

  const {
      first_name ,
      last_name,
      email,
      phone,
      password
 } = req.body;

  const updateUser = await updateById(id , first_name , last_name ,email , phone , password)

  res.status(200).json({updateUser});
 }
 
 module.exports = {
     registrationController,
     loginController,
     logoutController,
     currentController,
     getUserByIdController,
     updateUserByIdController
 }
 