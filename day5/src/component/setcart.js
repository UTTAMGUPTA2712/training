import { useEffect, useState } from "react";

const SetCart=(id,count)=>{
        const localdata=localStorage.getItem("data")
        let itemss
        const data=JSON.parse(localdata);
        let user=JSON.parse(localStorage.getItem("currentUser"))
        console.log(user.cart)
        let usercart=user.cart||[];
        console.log("here","id",id,"j",count);
        console.log("hgu",data);
        let flag=false
        if(usercart.length>0){
        for(let item of usercart){
            if(item.id==id){
                flag=true;
                item.count=count
            }
        }}
        if(!flag){
            for(let item of data){
                if(item.id==id){
                    console.log("b");
                    item.count=count
                    itemss=item
                    console.log("a");
                }
            }
        }
        if(itemss){
        usercart=[...usercart,itemss]}
        console.log(usercart)
        user.cart=usercart
        console.log(user)
        localStorage.setItem("currentUser",JSON.stringify(user))
}
export default SetCart