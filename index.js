
async function getUsers(){
    
    const usersdata=await fetch("https://6120e98a24d11c001762ee33.mockapi.io/users")
                       .then(data=>data.json());

    document.querySelector(".user-list").innerHTML="";
    usersdata.forEach(element =>createUser(element));
    document.querySelector(".total-users").innerHTML=`Total users:  ${usersdata.length}`
    console.log(usersdata);
    document.querySelector(".editUser").setAttribute("style","display:none");
   document.querySelector(".addUser").setAttribute("style","display:block");
   document.querySelector("#firstname").value="";
   document.querySelector("#image").value="";
}
getUsers();
function createUser({createdAt,name,avatar,id}){
    const main=document.createElement("section");
    main.setAttribute("class","message-box");
    main.innerHTML=`<div class="image">
                       <img src=${avatar} alt="" />
                    </div> 
                    <div class="name-time">
                       <p class="name">${name}</p>
                       <p class="time">${new Date(createdAt).toDateString()}</p>
                       <div class="buttons">
                          <span class="delete" onclick="deleteUser(${id})"><strong>&#128465;</strong></span>
                          <span class="edit" onclick="editUser(${id})"><strong>&#128394;</strong></span>
                       </div>
                    </div>
                    <div class="id">
                       <p>${id}</p>
                    </div>
                     `;
   document.querySelector(".user-list").append(main);
}
function getValues(){
   const name=document.querySelector("#firstname").value;
   const url=document.querySelector("#image").value;
   const data={
      name:name,
      avatar:url,
      createdAt:new Date().toDateString()
   }
   return data;
}
async function addUser(){
    const data=getValues();
   console.log("Adding User",data.createdAt);
   const list=await fetch("https://6120e98a24d11c001762ee33.mockapi.io/users" , {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
   })
   getUsers();
}
async function deleteUser(id){
   console.log(`Removing User ${id}`);
   const list=await fetch(`https://6120e98a24d11c001762ee33.mockapi.io/users/${id}`, {
      method:"DELETE"
   })
   getUsers();
}
var editID;
async function editUser(id){
   console.log(`Editing User ${id}`);
   editID=id;
   document.querySelector(".editUser").innerHTML=`EDIT USER ${id}`;
   document.querySelector(".editUser").setAttribute("style","display:block");
   document.querySelector(".addUser").setAttribute("style","display:none");
   const user=await fetch(`https://6120e98a24d11c001762ee33.mockapi.io/users/${id}`).then(data=>data.json());
   document.querySelector("#firstname").value=user.name;
   document.querySelector("#image").value=user.avatar;
}
async function editUserID(){
   console.log(`Updating User with ID ${editID}`);
   const data=getValues();
   const editUser= await fetch(`https://6120e98a24d11c001762ee33.mockapi.io/users/${editID}` , {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
   })
   getUsers();
}