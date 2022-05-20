
const { client } = require("../db/database")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const io = require('socket.io')
const {NotAuthorizedError , UserAlreadyExistsError} = require('../helpers/error');


const register = async (first_name , last_name , email ,phone, password) => {
     
     const user =  await client.query('SELECT * FROM "user" WHERE "email" = $1  ' , [email])


     if(user.rows[0]){

       throw new UserAlreadyExistsError('Such a user already exists')
     }

    const hassPassword = await bcrypt.hash(password, 10);
    const newUser = await client.query(`INSERT INTO "user" (first_name  ,last_name ,email , phone , password) values ($1,$2,$3,$4,$5)  RETURNING *` , [first_name , last_name , email ,phone , hassPassword])
    

  return newUser
}

const login = async (email , password) => {
  const user =  await client.query('SELECT * FROM "user" WHERE "email" = $1  ' , [email])
    

  if (!user.rows[0]) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
    }

  if (!await bcrypt.compare(password, user.rows[0].password)) {
    throw new NotAuthorizedError(`Wrong password`);
  }

 const token = jwt.sign({
            _id: user.rows[0].id,
 }, process.env.JWT_SECRET);
    

 const updateUser = await client.query('UPDATE "user" set "token" = $1 where "email" = $2 RETURNING *' , [token , email])
    
  return updateUser.rows[0];

}

const logout = async (userId) => {

  const updateUser = await client.query('UPDATE "user" set "token" = $1 where "id" = $2 RETURNING *' , [ '', userId])
  
   if (!updateUser.rows[0]) {
    throw new NotAuthorizedError(`No user  found`);
    }

}

const current = async (userId) => {

  const user =  await client.query('SELECT * FROM "user" WHERE "id" = $1  ' , [userId])
   if (!user.rows[0]) {
    throw new NotAuthorizedError('No Unauthorized');
    }

  return user.rows[0]
   
}

const updateById = async (userId , first_name , last_name , email , phone , password) =>{
  const hassPassword = await bcrypt.hash(password, 10);

  const updateUser = await client.query('UPDATE "user" set "first_name" = $1 ,"last_name"= $2 ,"email"= $3 , "phone"=$4 ,"password" = $5 where "id" = $6 RETURNING *',
  [first_name , last_name , email ,phone ,hassPassword,userId])

  if (!updateUser.rows[0]) {
    throw new NotAuthorizedError('No User found');
    }

    const socket = io();

    socket.emit('USER_UPDATE' , { updateUser : updateUser.rows[0]})

  return updateUser.rows[0]
}

const getUserById = async (userId) =>{
  const user =  await client.query('SELECT * FROM "user" WHERE "id" = $1  ' , [userId])

  if (!user.rows[0]) {
    throw new NotAuthorizedError('No User found');
    }


    return user.rows[0]

}

module.exports = {
    register,
    login,
    logout,
    current,
    updateById,
    getUserById
}

